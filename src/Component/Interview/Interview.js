import React from 'react';
import defaultBgImage from '../../Img/INTERVIEW.png';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import InterviewArticle from './InterviewArticle';
import './Interview.css';
const Interview = ({ bgImg }) => {
    return (
        <div>
            <Navbar />
            <img
                src={bgImg ? bgImg : defaultBgImage}
                className='bg__image w100 h50 bs-contain'
                alt='Generic'
            />
            <div className='search__section'>
                <div className='search__cont'>
                    <div className='search__select'>
                        Country{' '}
                        <svg
                            width='15'
                            height='10'
                            viewBox='0 0 25 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M12.7474 17L1 1H23.3579L12.7474 17Z'
                                stroke='black'
                            />
                        </svg>
                    </div>
                    <div className='search__select'>
                        University{' '}
                        <svg
                            width='15'
                            height='10'
                            viewBox='0 0 25 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M12.7474 17L1 1H23.3579L12.7474 17Z'
                                stroke='black'
                            />
                        </svg>
                    </div>
                    <div className='search__select'>
                        Profession{' '}
                        <svg
                            width='15'
                            height='10'
                            viewBox='0 0 25 18'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                d='M12.7474 17L1 1H23.3579L12.7474 17Z'
                                stroke='black'
                            />
                        </svg>
                    </div>
                </div>
                <button className='search__button'>Search</button>
            </div>
            <feed>
                <InterviewArticle />
                <InterviewArticle />
                <InterviewArticle />
                <InterviewArticle />
                <InterviewArticle />
                <InterviewArticle />
            </feed>
            <Footer />
        </div>
    );
};
export default Interview;
