import React from 'react';
import defaultImgsrc from '../../Img/47525.jpg';

export const NewsBlog = ({ title, imgsrc, miniInfo }) => {
    return (
        <div className='flex w-680 h-240 bradius-10 b-white mt-25 blogsection'>
            <img
                className='w-360 h-240 mr-30 bradius-10'
                src={imgsrc ? imgsrc : defaultImgsrc}
                alt='blog'
            />
            <div className='flex-col justify-around'>
                <p className='fs-24'>{title}</p>
                <div className='flex flex-col'>
                    <p className='fs-12 c-seablue'>#Good to know</p>
                        <p className='c-default'>
                            {miniInfo ? miniInfo : 'Lorem ipsum dolor sit amet, consectetur  '}
                        </p>
                </div>
            </div>
        </div>
    );
}

