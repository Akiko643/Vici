import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Blog.css';
import Hotnews from './Hotnews';
import Recent from './Recent';
function Blog() {
    return (
        <div>
            <Navbar />
            <div className='pr ph-190'>
                <div className='z--1 t-0 l-0 ab-background h-vh-100 w100 absolute' />
                <Recent />
                <Hotnews />
            </div>
            <Footer />
        </div>
    );
}

export default Blog;
