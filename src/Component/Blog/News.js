import React from 'react';
import {NewsBlog} from './NewsBlog'

export const News = () => {
    return (
        <div>
            <hr className='w100 mt-23'></hr>
            <div className='flex-col'>
                <NewsBlog title={'Blog heading bla bla'}/>
                <NewsBlog title={'Blog heading bla bla'}/>
                <NewsBlog title={'Blog heading bla bla'}/>
            </div>
        </div>
    );
}

