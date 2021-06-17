import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import { BlogField, EducationField } from './AdminFields';
import { BlogPosts, EducationPosts, CollegePrepPosts } from './AdminPosts';
import Editor from './Editor';

export const Input = ({ basevalue, setbaseValue, placeholder }) => {
    const [value, setValue] = useState(basevalue);
    return (
        <input
            className='mh-20'
            value={value}
            onChange={(e) => {
                const temp = e.target.value;
                setValue(temp);
                setbaseValue(temp);
            }}
            placeholder={placeholder}
        ></input>
    );
};
export const InterviewOnePost = ({ state, setState }) => {
    const { data, updateRecord } = useDoc(
        `/content/contents/${state.category}/${state.post}`
    );
    console.log(data);
    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    const [subheader, setSubheader] = useState();
    const [image, setImage] = useState();
    const [video, setVideo] = useState();
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        {''}
                        <Input
                            basevalue={data.header}
                            setbaseValue={setHeader}
                            placeholder='type content header'
                        />
                        {'   subheader'}
                        <Input
                            basevalue={data.subheader}
                            setbaseValue={setSubheader}
                            placeholder='type content subheader here'
                        />
                        {'   image url:'}
                        <Input
                            basevalue={data.image}
                            setbaseValue={setImage}
                            placeholder='type blog image URL'
                        />
                        {'   video url:'}
                        <Input
                            basevalue={data.video}
                            setbaseValue={setVideo}
                            placeholder='type video URL'
                        />
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
                        if (image) chapters.image = image;
                        if (video) chapters.video = video;
                        if (subheader) chapters.subheader = subheader;
                        if (value || header || image || video || subheader)
                            await updateRecord(chapters);
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};
export const CollegePrepOnePost = ({ state, setState }) => {
    const { data, updateRecord } = useDoc(
        `/content/contents/College-prep/${state.field}/chapters/${state.post}`
    );
    console.log(data);
    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        {''}
                        <Input
                            basevalue={data.header}
                            setbaseValue={setHeader}
                            placeholder='type content header'
                        />
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
                        if (value || header) await updateRecord(chapters);
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export const BlogOnePost = ({ state, setState }) => {
    const { data, updateRecord } = useDoc(
        `/content/contents/Blog/${state.post}`
    );
    console.log(data);
    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    const [image, setImage] = useState();
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        <Input
                            basevalue={data.header}
                            setbaseValue={setHeader}
                            placeholder='type content header'
                        ></Input>
                        <Input
                            basevalue={data.image}
                            setbaseValue={setImage}
                            placeholder='type blog image url'
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
                        if (image) chapters.image = image;
                        if (value || header || image)
                            await updateRecord(chapters);
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
