import React, { useState } from 'react';
import lock from '../../Img/lock.svg'
import email from '../../Img/email.svg'
import { AuthStateValue } from '../../Hooks/auth-user-provider';
const Login = () => {
    const [newuser, setUser] = useState({
        email: '',
        password: '',
    });
    const {
        singInWithEmailAndPassword
    } = AuthStateValue();

    return (
        <>
                <div className="label-container flex-row flex">
                    <img src={email} className="input_icon"/>
                    <input
                        value={newuser.email}
                        onChange={(e) => {
                            setUser({ ...newuser, email: e.target.value });
                        }}
                        type='text'
                        placeholder='Your email'
                        // className='password'
                        className="input-field"
                    />
                </div>
                <div className="label-container mb-32 flex-row flex">
                <img src={lock} className="input_icon"/>
                    <input
                        value={newuser.password}
                        onChange={(e) => {
                            setUser({ ...newuser, password: e.target.value });
                        }}
                        type='password'
                        placeholder='Your password'
                        className="input-field"
                    />
                </div>
                <div className="flex flex-row justify-between mb-32 w-343">
                    <div className="flex flex-row items-center">
                        <input type="checkbox"/>
                        <p className="forgot pl-5">Remember me</p>
                    </div>
                    <div>
                        <p className="forgot c-secondary pointer">Forgot your password</p>
                    </div>
                </div>
            <button
                type='submit'
                onClick={() => {
                    singInWithEmailAndPassword(newuser)
                }}
                className="signup__button"
            >
                Log in
            </button>
        </>
    );
};

export default Login;