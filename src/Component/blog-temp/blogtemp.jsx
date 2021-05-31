import React from 'react'
import './blog-temp.scss'
export const BlogTemp = (props) => {
    const { data } = props;
    return (
        <div className='blog-container w100 flex-center'>
            <div className='blog-mid-container'>
                <img src={data.image} className='heading-image'/>
                <div className='flex flex-wrap'>
                    <div className='flex-col handalt'>
                        <div className='flex-row'>
                            <img src={data.publisher_profile} alt={data.publisher} className='publisher-profile-img'/>
                            <div className='flex flex-col'>
                                <div className='c-smallheading side-heading'>Puplisher:</div>
                                <p onClick={() => {}} className='publisher-name'>{data.publisher}</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='c-smallheading side-heading'>Хандалт:</div>
                            <p className='side-accessed'>{data.accessed}</p>
                        </div>
                        <div className='flex flex-col'>
                            <div className='c-smallheading side-heading'>Date:</div>
                            <p className='side-date'>{data.date}</p>
                        </div>
                    </div>
                    <div className='blog-content'>
                        {
                            data.body.map((paragraph, index) => {
                                return (
                                    <div key={index} className='content-item'>
                                        <h1 className='content-heading'>{paragraph.heading}</h1>
                                        {
                                            paragraph.text.map((text, index) => {
                                                return (
                                                    <p key={index} className='content-text'>{text}</p>
                                                );
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}