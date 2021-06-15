import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import { BlogField, EducationField } from './AdminFields';
import { BlogPosts, EducationPosts, CollegePrepPosts } from './AdminPosts';
import Editor from './Editor';

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

export const BlogOnePost = ({ state, setState }) => {
    const { data, updateRecord } = useDoc(
        `/content/contents/Blog/${state.post}`
    );
    console.log(data);
    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        <Input
                            basevalue={data.header}
                            setbaseValue={setHeader}
                        ></Input>
                    </div>
                    <Editor value={data.text} setValue={setValue} />
                </>
            )}
            <div className='w100 flex justify-end pa-r-10'>
                <div
                    className='fs-20 b-whitegray w-100 h-30 bradius-10 flex items-center justify-center justify-self-end'
                    onClick={async () => {
                        let chapters = data;
                        if (value) chapters.text = value;
                        if (header) chapters.header = header;
                        console.log(chapters);
                        if (value || header) await updateRecord(chapters);
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export const EducationOnePost = ({ state, setState }) => {
    const { data, updateRecord } = useDoc(
        `content/contents/${state.category}/${state.field}/chapters/${state.post}`
    );
    console.log(data);
    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        <Input
                            basevalue={data.header}
                            setbaseValue={setHeader}
                        ></Input>
                    </div>
                    <Editor value={data.text} setValue={setValue} />
                </>
            )}
            <div className='w100 flex justify-end pa-r-10'>
                <div
                    className='fs-20 b-whitegray w-100 h-30 bradius-10 flex items-center justify-center justify-self-end'
                    onClick={async () => {
                        // const { chapters } = data;
                        if (value) data.text = value;
                        if (header) data.header = header;
                        // console.log(chapters);
                        if (value || header) await updateRecord(data);
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};
