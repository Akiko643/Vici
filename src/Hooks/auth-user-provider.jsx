import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { useFirebase, useCol, useDoc } from '../Hooks/firebase';
import { useHistory } from 'react-router-dom';
export const AuthContext = createContext({
    user: null,
    ready: false,
});

export const AuthUserProvider = ({ children }) => {
    let [state, setState] = useState({
        ready: false,
        user: null,
    });
    const history = useHistory();
    let { auth, googleProvider } = useFirebase();
    let { createRecord } = useCol('users');
    let list = ['Education', ]
    useEffect(() => {
        if (!auth) {
            return;
        }
        const subscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                if (authUser.emailVerified === true) {
                    setState({ ready: true });
                }
            }

            authUser
                ? setState({ user: authUser })
                : setState({ user: authUser });
        });
        // updateUserData();
        return () => subscribe();
    }, [auth]);
    const createNewUser = ({
        email,
        uid,
        displayName,
        gender,
        phoneNumber,
        role = 'member',
    }) => {
        createRecord(uid, {
            email,
            displayName,
            gender,
            phoneNumber,
            role,
        });
    };
    const signInWithGmail = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                createNewUser({ ...result.user, gender: '' });
                // history.push('/');
                // console.log('hereee');
            })
            .catch((error) => console.log(error.message));
    };
    const signUpWithEmailAndPassword = ({
        email,
        password,
        username,
        gender,
        phone,
    }) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result.user);
                result.user
                    .updateProfile({
                        displayName: username,
                    })
                    .then(function () {
                        console.log('Successfully updated username');
                    })
                    .catch(function (error) {
                        console.log('gege');
                    });
                createNewUser({
                    ...result.user,
                    displayName: username,
                    gender: gender,
                    phoneNumber: phone,
                });

                // history.push('/');
                // console.log('hellow world');
                // const currentUser = result.user;
                // createRecord();

                // result.user.displayName = user.username;
                // Signed in
                // ...
            })
            .catch((error) => console.log(error.message));
    };
    const singInWithEmailAndPassword = async ({
        email,
        password
    }) => {
        await auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            console.log(error.message)
        });
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                auth,
                signInWithGmail,
                signUpWithEmailAndPassword,
                singInWithEmailAndPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const AuthStateValue = () => useContext(AuthContext);
