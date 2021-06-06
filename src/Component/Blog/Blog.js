import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Blog.scss';
import { BlogItemComp } from './BlogItemComp';
import leftchevron from './zuun-chevron.svg';
import rightchevron from './baruun-chevron.svg';
export const Blog = () => {
    const [selectedLPT, setSelectedLPT] = useState(0);
    const [suggestedPageNumber, setSuggestedPageNumber] = useState(1);
    const fakeData = {
        tag: "Good to know", 
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", 
        publisherName: "Publisher name", 
        createdAt: {
            seconds: 1622908800,
            nanoseconds: 0,
        }, 
        header: "Header bla bla bla bla bla ", 
        image: "https://i.pinimg.com/originals/22/be/53/22be53bc84f7ad15fa13d9355c9767b8.jpg", 
        publisherId: "1234567",
    }
    const categories  = ["Mental health", "Mental health", "Mental health", "Mental health", "Mental health", "Mental health", "Mental health", "Mental health", "Mental health", "Mental health"];
    return (
        <>
            <Navbar />
            <div className='blog-body-container'>
                <div className='blog-body mb-60'>
                    <div className='flex-row'>
                        <BlogItemComp data={fakeData} size="big" classStr={"w60"}/>
                        <div className='w40 ml-20'>
                            <div className='flex-row justify-between lpt'>
                                <div className={`pointer ${selectedLPT === 0 && "selected-lpt"}`} onClick={() => setSelectedLPT(0)}>LATEST</div>
                                <div className={`pointer ${selectedLPT === 1 && "selected-lpt"}`} onClick={() => setSelectedLPT(1)}>POPULAR</div>
                                <div className={`pointer ${selectedLPT === 2 && "selected-lpt"}`} onClick={() => setSelectedLPT(2)}>TRENDING</div>
                            </div>
                            <BlogItemComp data={fakeData} size="small" classStr={"w100"} />
                            <BlogItemComp data={fakeData} size="small" classStr={"w100"} />
                            <BlogItemComp data={fakeData} size="small" classStr={"w100"} />
                            <BlogItemComp data={fakeData} size="small" classStr={"w100"} />
                        </div>
                    </div>
                    <div className='line'/>
                    <div className='flex-row'>
                        <div className='w60'>
                            <BlogItemComp data={fakeData} size="medium" classStr={"w100"} />
                            <BlogItemComp data={fakeData} size="medium" classStr={"w100"} />
                            <BlogItemComp data={fakeData} size="medium" classStr={"w100"} />
                            <BlogItemComp data={fakeData} size="medium" classStr={"w100"} />
                            <BlogItemComp data={fakeData} size="medium" classStr={"w100"} />
                        </div>
                        <div className='w40'>
                            <div className='categories-text'>Categories</div>
                            {
                                categories.map(category => {
                                    return (
                                        <div className='category-item'>#{category}</div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='line'/>
                    <div className='flex-col'>
                        <div className='flex justify-between mb-25'>
                            <div className='foryou'>For you</div>
                            <div className='sug-p-number justify-between'><img className='pointer' src={leftchevron} onClick={() => setSuggestedPageNumber(suggestedPageNumber === 1 ? 1 : suggestedPageNumber-1)}/>{"Page " + suggestedPageNumber}<img className='pointer' src={rightchevron}  onClick={() => setSuggestedPageNumber(suggestedPageNumber+1)}/></div>
                        </div>
                        <div className='flex-row justify-between'>
                            <BlogItemComp data={fakeData} size="smallcol" classStr={"w23"} />
                            <BlogItemComp data={fakeData} size="smallcol" classStr={"w23"} />
                            <BlogItemComp data={fakeData} size="smallcol" classStr={"w23"} />
                            <BlogItemComp data={fakeData} size="smallcol" classStr={"w23"} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}