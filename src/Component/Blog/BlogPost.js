import React from 'react';
import defaultImgsrc from '../../Img/47525.jpg';
function BlogPost({
    publisher,
    imgsrc,
    date,
    height,
    width,
    title,
    publisherProfile,
}) {
    return (
        <div
            className={`pr bradius-20 w-${width ? width : 100} h-${
                height ? height : 100
            }`}
            style={{
                backgroundImage: `url(${imgsrc ? imgsrc : defaultImgsrc}`,
                backgroundRepeat: 'no - repeat,repeat',
                backgroundSize: 'cover',
            }}
        >
            <div className='absolute bottom-25 left-25 flex'>
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
                    {title ? <p>{title}</p> : <></>}
                    <p className='c-white'>
                        {publisher ? publisher : 'Publisher name'}
                    </p>
                    <p className='c-white'>{date ? date : 'MM/DD/YYYY'}</p>
                </div>
            </div>
        </div>
    );
}

export default BlogPost;
