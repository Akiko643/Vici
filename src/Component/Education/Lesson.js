import { directive } from '@babel/types';
import React from 'react';
import { Link } from 'react-router-dom';
import './Lesson.css';
function Lesson({ icon, name, path, elements }) {
    return (
        <div
            className='h-430 w-430 bradius-20 pa-40'
            style={{ backgroundColor: '#F5F5F5' }}
        >
            <p className='h-50 fs-36 flex'>
                <img className='h-50 w-50 mr-10' src={icon} alt='hellow'></img>
                <div> {name} </div>
            </p>
            <div className='mr-30 h-210 w-310 flex-col justify-between'>
                {elements.map((el) => (
                    <div>{el}</div>
                ))}
            </div>
        </div>
    );
}

export default Lesson;
