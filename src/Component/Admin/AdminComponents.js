import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import { BlogField, EducationField } from './AdminFields';
import { BlogOnePost, EducationOnePost } from './AdminOnePost';
import { BlogPosts, EducationPosts, CollegePrepPosts } from './AdminPosts';
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
            {category === 'College-prep' && (
                <CollegePrepPosts state={state} setState={setState} />
            )}
        </div>
    );
};

export const Input = ({ basevalue, setbaseValue }) => {
    const [value, setValue] = useState(basevalue);
    return (
        <input
            value={value}
            onChange={(e) => {
                const temp = e.target.value;
                setValue(temp);
                setbaseValue(temp);
            }}
            placeholder='type content header'
        ></input>
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
        </div>
    );
};
