import React from 'react';
import defaultImgsrc from '../../Img/47525.jpg';

export const SuggestBlog = ({
    title,
    imgsrc,
    publisher,
    date,
    publisherProfile,
}) => {
    return (
        <div className='flex flex-col w-250 h-330 bradius-10 b-white'>
            <img
                className='w-250 h-180 mr-30 bradius-10'
                src={imgsrc ? imgsrc : defaultImgsrc}
                alt='blog'
            />
            <p className='fs-12 c-seablue mt-10 mb-0'>#Good to know</p>
            <p className='fs-24 mb-0'>{title}</p>
            <div className='flex mt-13'>
                <div className='flex'>
                    {' '}
                    {publisherProfile ? (
                        <div
                            className='h-15 w-15 bradius-7.5 '
                            style={{
                                backgroundImage: `url(${publisherProfile}`,
                                backgroundRepeat: 'no - repeat,repeat',
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    ) : (
                        <div className='h-15 w-15 bradius-8 b-whitegray '></div>
                    )}
                    <p className='c-default fs-13 ml-5'>
                        {publisher ? publisher : 'Publisher name'}
                    </p>
                </div>
                <p className='c-default fs-13 ml-10'>
                    {date ? date : 'MM/DD/YYYY'}
                </p>
            </div>
        </div>
    );
};
