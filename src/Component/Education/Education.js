import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { EducationItems } from '../Navbar/EducationItems';
import Lesson from './Lesson';
import img from '../../Img/oceans2.png';
import Body from './Body';
function Education() {
    return (
        <div>
            <Navbar />
            <div
                className='h-150 w100 c-white pl-190 pr'
                style={{ backgroundImage: `url(${img})` }}
            >
                <div className='bottom-10 fs-48 absolute'> Education</div>
            </div>
            <Body></Body>
            <Footer />
        </div>
    );
}

export default Education;
