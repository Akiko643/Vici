import React, { useState, useEffect } from 'react';
// import Logo from './Logo'
import './Navbar.scss';
// import { CollegePrepItems } from './CollegePrepItems';
// import { EducationItems } from './EducationItems';
import menu from '../../Img/menu.svg'
import Dropdown from './Dropdown';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useFirebase } from '../../Hooks/firebase';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import vici from '../../Img/vici.svg'
import { Interview } from '../Interview/Interview.js';
import { useContext } from 'react';
import { Context } from '../../Providers/contentProvider';
import { useTranslation } from 'react-i18next';
const Navbar = () => {
    const { t } = useTranslation()
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const { user } = AuthStateValue();
    const { auth } = useFirebase();
    const { collegePrep, language, changeLanguage, setSidebarOpen, sidebarOpen } = useContext(Context);
    const handleClick = () => setClick(!click);
    const dropdownHover = () => {
        setDropdown(!dropdown);
    };
    const logout = () => {
        auth.signOut()
            .then(() => {
                console.log('logged out');
            })
            .catch((error) => console.log(error.message));
    };
    const scrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <navbar>
            <Link className='nav-logo' to='/' onClick={() => {
                    scrollToTop();
                    setSidebarOpen(false);
                }}>
                <img src={vici} />
            </Link>
            <ul className='nav-menu'>
                <li className='nav-item'>
                    <Link to='/education' className='nav-links' onClick={() => scrollToTop()}>
                        {t("education")}{' '}
                    </Link>
                </li>
                <li className='nav-item' onClick={dropdownHover}>
                    <Link className='nav-links' onClick={() => scrollToTop()}>
                        {t("collegeprep")}{' '}
                        <svg
                            width='11'
                            height='6'
                            viewBox='0 0 11 6'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M1 0.944702L5.75564 5.0552L10.079 0.944702'
                                stroke='black'
                            />
                        </svg>
                    </Link>
                    {dropdown && <Dropdown listName={collegePrep} />}
                </li>
                <li className='nav-item'>
                    <Link to='/interview' className='nav-links' onClick={() => scrollToTop()}>
                        
                        {t('interview')}
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/blog' className='nav-links' onClick={() => scrollToTop()}>
                        {t('blog')}
                    </Link>
                </li>
            </ul>
            <div className='flex w-160 justify-between items-center language-and-logout'>
                <div className={`w-48 h-24 b-white c-default bradius-12 br-default-2 pointer pr`} onClick={changeLanguage}>
                    <div className={`flex-center fs-16 h-24 w-30 b-default c-white bradius-12 ph-5  languageBtn ${language == 'mn' ? "mnLanguageBtn" : "enLanguageBtn"}`}>
                        {language}
                    </div>
                </div>
                {user ? (
                    <div className='pr username-container flex items-center'>
                        <div className='username-nav' onClick={handleClick}>
                            {user.displayName}
                        </div>
                        {click && (
                            <div
                                className='logout-container'
                                onClick={logout}
                            >
                                {t('logout')}
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to='/user-login'>
                        <button className='join-button'>{t('signin')}</button>
                    </Link>
                )}
            </div>
            <div className='menu'>
                <img src={menu} onClick={() => setSidebarOpen((previous) => !previous)}/>
            </div>
        </navbar>
    );
};

export default Navbar;
