import React, { useState, useContext } from 'react'
import { Context } from '../../Providers/contentProvider'
import './sidebar.scss'
import sideclose from '../../Img/sideclose.svg'
import vici from '../../Img/vici.svg'
import { useTranslation } from 'react-i18next'
import { AuthStateValue } from '../../Hooks/auth-user-provider'
import { useFirebase } from '../../Hooks/firebase'
import { Link } from 'react-router-dom'
import dropdownchevron from "../../Img/dropdownchevron.svg";
import { GoogleAuth } from 'google-auth-library'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
export const Sidebar = () => {
    const history = useHistory();
    const { t } = useTranslation()
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const { user } = AuthStateValue();
    const { auth } = useFirebase();
    const { collegePrep, language, changeLanguage, setSidebarOpen, sidebarOpen } = useContext(Context);
    const dropdownHover = () => {
        console.log(!dropdown)
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
    const goTo = (path) => {
        setDropdown(false);
        setSidebarOpen(false);
        history.push(path);
        scrollToTop();
    }
    return (
        <div className={`sidebar flex flex-col items-center justify-around ${sidebarOpen && 'active-sidebar'}`}>
            <img src={sideclose} onClick={() => setSidebarOpen(false)} className='sidecloseBtn pointer'/>
            <div className='w-p-70 flex flex-col items-center'>
                <img src={vici} className='mb-50 pointer' onClick={() => goTo('/')}/>
                <div className='mv-7 w100 pointer' onClick={() => goTo('/education')}>{t('education')}</div>
                <div className='mv-7 w100 flex justify-between pointer' onClick={dropdownHover}>{t('collegeprep')}<img src={dropdownchevron} className={`dropdownchevron ${dropdown && 'activedropdownchevron'}`}/></div>
                {
                    dropdown && (
                        <>
                            <hr className='w100 br-secondary-1'/>
                            <ul
                                className='w100 pl-20'
                                onClick={() => setClick(!click)}
                            >
                                {collegePrep?.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                className='side-list-item'
                                                to={`/${item?.name}`}
                                                onClick={() => {
                                                    setClick(false);
                                                    setSidebarOpen(false);
                                                    setDropdown(false);
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                            <hr className='br-botline-1'/>
                                        </li>
                                    );
                                })}
                            </ul>
                        </>
                    )
                }
                <div className='mv-7 w100 pointer' onClick={() => goTo('/interview')}>{t('interview')}</div>
                <div className='mv-7 w100 pointer' onClick={() => goTo('/blog')}>{t('blog')}</div>
            </div>
            <div className='w100 flex-center'>
                {user ? (
                    <>
                        <div className='pr username-container flex items-center'>
                            <div className='username-nav pl-0'>
                                {user.displayName}
                            </div>
                        </div>
                        <div
                            className='bradius-10 b-secondary c-white pv-10 ph-20'
                            onClick={logout}
                        >
                            {t('logout')}
                        </div>
                    </>
                ) : (
                    <Link to='/user-login'>
                        <button className='join-button'>{t('signin')}</button>
                    </Link>
                )}
                <div className={`w-48 h-24 b-white c-default bradius-12 br-default-2 pointer pr mt-20`} onClick={changeLanguage}>
                    <div className={`flex-center fs-16 h-24 w-30 b-default c-white bradius-12 ph-5  languageBtn ${language == 'mn' ? "mnLanguageBtn" : "enLanguageBtn"}`}>
                        {language}
                    </div>
                </div>
            </div>
        </div>
    )
}