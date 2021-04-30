import React from 'react';
import BlogPost from './BlogPost';
import SideElements from './SideElements';

function Hotnews() {
    return (
        <div>
            <p className='mb-25 c-white'>Онцлох булан</p>
            <div className='flex justify-between'>
                <BlogPost height={470} width={580} />
                <div className='flex-col justify-between'>
                    <SideElements title={'Blog heading bla bla'} />
                    <SideElements title={'Blog heading bla bla'} />
                    <SideElements title={'Blog heading bla bla'} />
                </div>
            </div>
        </div>
    );
}

export default Hotnews;
