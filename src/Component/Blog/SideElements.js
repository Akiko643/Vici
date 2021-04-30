import React from 'react';
import defaultImgsrc from '../../Img/47525.jpg';

function SideElements({ title, imgsrc, publisher, date, publisherProfile }) {
    return (
        <div
            className='flex w-430 h-130 bradius-20'
            style={{ backgroundColor: '#F0F0F0' }}
        >
            <img
                className='w-130 h100 mr-30'
                src={imgsrc ? imgsrc : defaultImgsrc}
                alt='blog'
                style={{ borderRadius: '20px 0 0 20px' }}
            />
            <div className='flex-col justify-around'>
                <p>{title}</p>
                <div className='flex'>
                    {publisherProfile ? (
                        <div
                            className='h-50 w-50 bradius-25  mr-15'
                            style={{
                                backgroundImage: `url(${publisherProfile}`,
                                backgroundRepeat: 'no - repeat,repeat',
                                backgroundSize: 'cover',
                            }}
                        ></div>
                    ) : (
                        <div className='h-50 w-50 bradius-25 b-white mr-15'></div>
                    )}
                    <div>
                        <p className='c-white'>
                            {publisher ? publisher : 'Publisher name'}
                        </p>
                        <p className='c-white'>{date ? date : 'MM/DD/YYYY'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideElements;
