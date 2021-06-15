import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../Img/IntroPageSpace.svg';
import img2 from '../../Img/IntroPageExplore.svg';
import Date from './Date';
import Speakers from './Speakers';
import './Transition.css';

function Body() {
    let speakers = ['John Doe', 'Farmer John', 'Onkar Judge'];
    const [isShown, setIsShown] = useState(true);

    return (
        <div className='ph-190 of-x-h mt-60'>
            <div className='flex items-center justify-between mb-140'>
                <h1 className='fs-45 w-430'>
                    Walk with us, bla bla bla uria loozon
                </h1>
                <div>
                    <img src={img1} className='h-550' alt='img' />
                    {/* <img src="./images/IntroPageSpaceGreen.svg" className="h-550"></img> */}
                </div>
            </div>
            <div className='of-x-h hi-1200 w100'>
                <img
                    className='absolute hi-1200 l-0 z--1'
                    src='./images/Wave.svg'
                    alt='img'
                />
            </div>
            <div className='mb-140 pr'>
                <h2 className='fw-600 fs-30'>International exams</h2>
                <div className='flex justify-between'>
                    <Date exam='SAT Dates'></Date>
                    <Date exam='IELTS Dates'></Date>
                    <Date exam='TOEFL Dates'></Date>
                </div>
            </div>
            <div className='mb-140 h-381 w100 b-footer c-white'>For You</div>
            <div className='h-200 w100 b-footer c-white mb-140'>
                Advertisement
            </div>
            <div className='mb-140'>
                <h2 className='fw-600 fs-30'>Latest Speakers</h2>
                <div className='flex justify-between'>
                    {speakers.map((speaker) => (
                        <Speakers person={speaker}></Speakers>
                    ))}
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <img src={img2} alt='img' />
                <div className='w50 flex items-center justify-center flex-col'>
                    <h1 className='fs-60 w-430 mb-80'>Explore with us</h1>
                    <button className='b-secondary nb bradius-10 w-160 h-40 c-white'>
                        Get started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Body;
