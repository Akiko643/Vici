import React from 'react';
import Lesson from './Lesson';
import icon from '../../Img/image 3.png';

function Body() {
    return (
        <div className='pv-66 flex w100 justify-between ph-30'>
            <Lesson
                icon={icon}
                name={'Psychology'}
                elements={[
                    'What is psychology',
                    'What is the history behind the psychology',
                    'What is the biopsychosocial approach?',
                    'What is genetic inheritance',
                    'What is heredity?',
                ]}
            />
            <Lesson
                icon={icon}
                name={'Business'}
                elements={[
                    'What is psychology',
                    'What is the history behind the psychology',
                    'What is the biopsychosocial approach?',
                    'What is genetic inheritance',
                    'What is heredity?',
                ]}
            />
            <Lesson
                icon={icon}
                name={'Start-up'}
                elements={[
                    'What is psychology',
                    'What is the history behind the psychology',
                    'What is the biopsychosocial approach?',
                    'What is genetic inheritance',
                    'What is heredity?',
                ]}
            />
        </div>
    );
}

export default Body;
