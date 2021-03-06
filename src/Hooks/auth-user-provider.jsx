import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { useFirebase, useCol, useDoc } from "../Hooks/firebase";
import { useHistory } from "react-router-dom";
import { Context } from "../Providers/contentProvider";
export const AuthContext = createContext({
    user: null,
    ready: false,
    errorMessage: "",
    setErrorMessage: () => {},
});

export const AuthUserProvider = ({ children }) => {
    const { language } = useContext(Context);
    const [errorMessage, setErrorMessage] = useState("");
    let [state, setState] = useState({
        ready: false,
        user: null,
    });
    let { auth, googleProvider } = useFirebase();
    let { createRecord } = useCol("");
    let list = ["Education"];

    let { dataEducation } = useCol("Education", language);
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
        role = "member",
    }) => {
        createRecord(uid, {
            email,
            displayName,
            gender,
            phoneNumber,
            role,
            checklist: [
                {
                    text: "Conduct necessary research and choose your top colleges (we recommend choosing six)",
                    completed: false,
                },
                {
                    text: "Keep note of key deadlines and application fees",
                    completed: false,
                },
                {
                    text: "Check whether your university requires exams like SAT, IELTS, TOEFL, HSK, TOPIK, AP tests or others",
                    completed: false,
                },
                {
                    text: "Check whether you have to give an entrance exam",
                    completed: false,
                },
                {
                    text: "Organize and prepare your personal documents",
                    completed: false,
                },
                {
                    text: "Decide if you want to apply for early or regular admission ",
                    completed: false,
                },
                {
                    text: "Apply for financial aid",
                    completed: false,
                },
                {
                    text: "Make sure your recommendation letters are ready (most schools require two or three)",
                    completed: false,
                },
                {
                    text: "Start writing your essays/personal statement early and get them proofread",
                    completed: false,
                },
                {
                    text: "Make sure your recommendation letters are ready (most schools require two or three)",
                    completed: false,
                },
                {
                    text: "Prepare your high school transcript",
                    completed: false,
                },
                {
                    text: "Include information on extracurricular activities, programs, volunteer work or jobs you had",
                    completed: false,
                },
            ],
        });
    };
    const signInWithGmail = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                createNewUser({ ...result.user, gender: "" });
                // history.push('/');
                // console.log('hereee');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            });
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
                        console.log("Successfully updated username");
                    })
                    .then(() => {
                        createNewUser({
                            ...result.user,
                            displayName: username,
                            gender: gender,
                            phoneNumber: phone,
                        });
                    })
                    .catch(function (error) {
                        console.log("gege");
                    });

                // history.push('/');
                // console.log('hellow world');
                // const currentUser = result.user;
                // createRecord();

                // result.user.displayName = user.username;
                // Signed in
                // ...
            })
            .catch((error) => {
                console.log(error.message, "108");
                setErrorMessage(error.message);
            });
    };
    const singInWithEmailAndPassword = async ({ email, password }) => {
        await auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                setErrorMessage(error.message);
                console.log(error.message, "117");
            });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                auth,
                signInWithGmail,
                signUpWithEmailAndPassword,
                singInWithEmailAndPassword,
                dataEducation,
                errorMessage,
                setErrorMessage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const AuthStateValue = () => useContext(AuthContext);
