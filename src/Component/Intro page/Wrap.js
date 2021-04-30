import React from 'react';
import { Link } from 'react-router-dom';
import './Wrap.css';
function Wrap({ category, title, description, link, photo, left }) {
    return (
        <div className={`w100 h-vh-100 ${left ? 'flex' : 'flex-row-reverse'}`}>
            <div className='w50 flex-center'>
                <div className='wrapper'>
                    <h1>{title}</h1>
                    <div>{description}</div>
                    <Link to={link}>learn more</Link>
                </div>
            </div>
            <div className='w50 flex-center'>
                <img src={photo} alt='' />
            </div>
        </div>
    );
}

export default Wrap;
