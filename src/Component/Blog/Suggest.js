import React from 'react';
import {SuggestBlog} from './SuggestBlog';

export const Suggest =() => {
    return (
        <div>
            <hr className='m-23'></hr>
            <p className='mb-25 c-default bold fs-24'>For you</p>
            <div className='flex justify-between'>
                <SuggestBlog title={'Blog heading bla bla'} />
                <SuggestBlog title={'Blog heading bla bla'} />
                <SuggestBlog title={'Blog heading bla bla'} />
            </div>
        </div>
    );
}

