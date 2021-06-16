import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import {
    BlogField,
    EducationField,
    CollegePrepField,
    InterviewField,
} from './AdminFields';
import {
    BlogOnePost,
    EducationOnePost,
    CollegePrepOnePost,
    InterviewOnePost,
} from './AdminOnePost';
import {
    BlogPosts,
    EducationPosts,
    CollegePrepPosts,
    InterviewPosts,
} from './AdminPosts';
import Editor from './Editor';

export const AdminCategory = ({ state, setState }) => {
    const { data } = useDoc('content/contents');
    console.log(data);
    return (
        <div className='grid grid-cols-2 grid-gap-20 mh-50 mt-20'>
            {data?.list?.map((d) => {
                return (
                    <div
                        className='b-seablue h-200 bradius-20 flex items-center justify-center c-white fs-30'
                        onClick={() => {
                            // console.log(d);
                            setState({ ...state, category: d, level: 1 });
                        }}
                    >
                        {d}
                    </div>
                );
            })}
        </div>
    );
};

export const AdminField = ({ state, setState }) => {
    const { category } = state;
    return (
        <div>
            {category === 'Education' && (
                <EducationField state={state} setState={setState} />
            )}
            {category === 'Blog' && (
                <BlogField state={state} setState={setState} />
            )}
            {category === 'College prep' && (
                <CollegePrepField state={state} setState={setState} />
            )}
            {category === 'Interview' && (
                <InterviewField state={state} setState={setState} />
            )}
        </div>
    );
};

export const AdminPosts = ({ state, setState }) => {
    const { category } = state;
    return (
        <div>
            {category === 'Education' && (
                <EducationPosts state={state} setState={setState} />
            )}
            {category === 'Blog' && (
                <BlogPosts state={state} setState={setState} />
            )}
            {category === 'College prep' && (
                <CollegePrepPosts state={state} setState={setState} />
            )}
            {category === 'Interview' && (
                <InterviewPosts state={state} setState={setState} />
            )}
        </div>
    );
};

export const AdminOnePost = ({ state, setState }) => {
    const { category } = state;
    return (
        <div>
            {category === 'Education' && (
                <EducationOnePost state={state} setState={setState} />
            )}
            {category === 'Blog' && (
                <BlogOnePost state={state} setState={setState} />
            )}
            {category === 'College prep' && (
                <CollegePrepOnePost state={state} setState={setState} />
            )}
            {category === 'Interview' && (
                <InterviewOnePost state={state} setState={setState} />
            )}
        </div>
    );
};
