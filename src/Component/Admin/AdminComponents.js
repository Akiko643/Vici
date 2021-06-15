import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import { BlogField, EducationField } from './AdminFields';
import { BlogPosts, EducationPosts } from './AdminPosts';
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
    const { data, updateRecord } = useDoc(
        `content/contents/${state.category}/${state.field}`
    );

    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    // const [chapters, setChapters] = useState();
    // useEffect(() => {
    //     if (state && data) {
    //         setChapters(data.chapters);
    //         setValue(data.chapters[state.post].text);
    //     }
    // }, [state, data]);
    // if (data) setValue(data.chapters[state.post].text);
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        <Input
                            basevalue={data.chapters[state.post].header}
                            setbaseValue={setHeader}
                        ></Input>
                    </div>
                    <Editor
                        value={data.chapters[state.post].text}
                        setValue={setValue}
                    />
                </>
            )}
            <div className='w100 flex justify-end pa-r-10'>
                <div
                    className='fs-20 b-whitegray w-100 h-30 bradius-10 flex items-center justify-center justify-self-end'
                    onClick={async () => {
                        const { chapters } = data;
                        if (value) chapters[state.post].text = value;
                        if (header) chapters[state.post].header = header;
                        console.log(chapters);
                        if (value || header) await updateRecord({ chapters });
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};
