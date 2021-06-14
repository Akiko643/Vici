import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Body from './Body';

function Intro() {
    return (
        <div className='relative'>
            <Navbar />
            <Body />
            <Footer />
        </div>
    );
}

export default Intro;
