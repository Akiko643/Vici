import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext, AuthStateValue } from '../../Hooks/auth-user-provider';
import lock from '../../Img/lock.svg';
import email from '../../Img/email.svg';
import person from '../../Img/person.svg';
const SignUp = () => {
    const [newuser, setUser] = useState({
        username: '',
        phone: '',
        gender: '',
        email: '',
        password: '',
        graduateyear: '',
    });
    const { signUpWithEmailAndPassword } = AuthStateValue();
    const { errorMessage, setErrorMessage } = useContext(AuthContext);

    return (
        <>
            <div className='label-container flex-row flex'>
                <img src={email} className='input_icon' />
                <input
                    value={newuser.email}
                    onChange={(e) => {
                        setUser({ ...newuser, email: e.target.value });
                        if (errorMessage != '') setErrorMessage('');
                    }}
                    type='text'
                    placeholder='Your email'
                    // className='password'
                    className='input-field'
                />
            </div>
            <div className='label-container flex-row flex'>
                <img src={person} className='input_icon' />
                <input
                    value={newuser.username}
                    onChange={(e) => {
                        setUser({ ...newuser, username: e.target.value });
                    }}
                    onBlur={() => {
                        if (errorMessage != '') setErrorMessage('');
                        setUser({
                            ...newuser,
                            username: newuser.username.trim(),
                        });
                    }}
                    type='text'
                    placeholder='Enter your fullname'
                    className='input-field'
                />
            </div>
            <div className='label-container flex-row flex'>
                <img src={lock} className='input_icon' />
                <input
                    value={newuser.password}
                    onChange={(e) => {
                        if (errorMessage != '') setErrorMessage('');
                        setUser({ ...newuser, password: e.target.value });
                    }}
                    type='password'
                    placeholder='Your password'
                    className='input-field'
                />
            </div>
            <div className='w-343 pv-10  c-secondary fw-500'>{errorMessage}</div>
            {/* <div className="label-container">
                    <input
                        value={newuser.phone}
                        onChange={(e) => {
                            setUser({ ...newuser, phone: e.target.value });
                        }}
                        type='text'
                        placeholder='phone'
                        className="input-field"
                    />
                </div> */}
            {/* <button
                type='submit'
                onClick={(e) => {
                    // e.preventDefault();
                    signInWithGmail();
                }}
                className="signup__button"
            >
                Use gmail
            </button> */}
            <button
                type='submit'
                onClick={(e) => {
                    signUpWithEmailAndPassword(newuser);
                }}
                className='signup__button pointer'
            >
                Sign Up
            </button>
        </>
    );
};

export default SignUp;
