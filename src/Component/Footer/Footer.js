import React, { useContext } from 'react';
import Col from './Col';
import { useHistory } from 'react-router-dom';

import './footer.scss';
import facebook from '../../Img/Vectorfacebook.svg' 
import instagram from '../../Img/Instagraminstagram.svg'
import { useCol } from '../../Hooks/firebase';
import { Context } from '../../Providers/contentProvider';
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const { language, collegePrep } = useContext(Context)
    const { data } = useCol('content/contents/Education/', language, true);
    const { data:blogCategory } = useCol("content/contents/categories", language);
    const goTo = (path) => {
        history.push(path);
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div className='footer flex flex-col b-footer pt-10'>
            <div className='flex justify-between ph-190 pb-10'>
                <Col>
                    <h1 className="header default">{t('followUs')}</h1>
                    <div>
                        <a href="https://www.facebook.com/Vici-Coaching-Magazine-101731985486129" className='icon ml-0'><img src={facebook} /></a>
                        <a href="https://www.instagram.com/vici.mag/" className='icon'><img src={instagram} /></a>
                    </div>
                </Col>
                <Col>
                    <h1 className="header pointer" onClick={() => goTo('/education')}>{t('education')}</h1>
                    {
                        data.map((dt, index) => {
                            return <div onClick={() => goTo(`/education/${dt?.id}`)} key={index} className="c-white pointer">{dt?.name}</div>
                        })
                    }
                </Col>
                <Col>
                    <h1 className='header default'>{t('collegeprep')}</h1>
                    {
                        collegePrep.map((cp, index) => {
                            return <div onClick={() => goTo(`/${cp?.name}`)} key={index} className='c-white pointer'>{cp?.name}</div>
                        })
                    }
                </Col>
                <Col>
                    <h1 className='header pointer' onClick={() => goTo('/interview')}>{t('interview')}</h1>
                </Col>
                <Col>
                    <h1 className='header pointer' onClick={() => goTo('/blog')}>{t('blog')}</h1>
                    {
                        blogCategory.map((category, index) => {
                            return <div onClick={() => goTo("/blog/" + category?.name)} key={index} className='c-white pointer'>{category?.name}</div>
                        })
                    }
                </Col>
                <Col>
                    <h1 className='header default'>{t('aboutUs')}</h1>
                </Col>
            </div>
            <div className='flex-center c-white allright pv-5'>
                ALL RIGHTS RESERVED ©2021 VICI
            </div>
        </div>
    );
}

export default Footer;
// {FooterElements.map(({ title, path, elements }, index) => {
//     return (
//         <Col>
//             {/* <Link to={path} className='nounderline'> */}
//             <Link to='/' className='nounderline'>
//                 <h1 className='header' key={`${index}`}>
//                     {title}
//                 </h1>
//                 {elements.map((el, indexx) => (
//                     //<Link to={el.path} className='nounderline'>
//                     <Link to='/' className='nounderline'>
//                         <div
//                             className='el'
//                             key={`${index}-${indexx}`}
//                         >
//                             {el.name}
//                         </div>
//                     </Link>
//                 ))}
//             </Link>
//         </Col>
//     );
// })}