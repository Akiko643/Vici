import React, { useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import Login from './Login';
import SignUp from './SignUp';
import './SignUp.scss';
import logo from '../../Img/logo.svg';
import close from '../../Img/close.svg';
import { Link } from 'react-router-dom';
const SignUpPage = () => {
    const [login, setLogin] = useState(true);
    const [newuser, setUser] = useState({
        username: '',
        phone: '',
        gender: '',
        email: '',
        password: '',
        graduateyear: '',
    });
    const { user } = AuthStateValue();
    return user ? (
        <Redirect to='/' />
    ) : (
        <div className='signup-body'>
            <Link to='/'>
                <img src={close} id='close' />
            </Link>
            <div className='form-container'>
                <div className='w100 flex flex-row fs-24 of-y-h lh-30'>
                    <div
                        className={`w50 pointer flex-center h-70 ${
                            login ? 'deactive-sign-up' : 'active-sign-up o-x-v'
                        }`}
                        onClick={() => setLogin(false)}
                    >
                        Sign up
                    </div>
                    <div
                        className={`w50 pointer flex-center h-70 ${
                            login ? 'active-log-in o-x-v' : 'deactive-log-in'
                        }`}
                        onClick={() => setLogin(true)}
                    >
                        Log in
                    </div>
                </div>
                <img src={logo} className='logo_vici' />
                {login ? <Login /> : <SignUp />}
            </div>
        </div>
    );
};

export default SignUpPage;
