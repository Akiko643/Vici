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

const LangToggle = ({ language, changeLanguage }) => {
    const [lang, setLang] = useState(language);
    return (
        <div
            className={`w-48 h-24 b-white c-default bradius-12 br-default-2 pointer pr`}
            onClick={() => {
                // changeLanguage(lang === 'en' ? 'mn' : 'en');
                // setLang(lang === 'en' ? 'mn' : 'en');
            }}
        >
            <div
                className={`flex-center fs-16 h-24 w-30 b-default c-white bradius-12 ph-5  languageBtn ${
                    lang == 'mn' ? 'mnLanguageBtn' : 'enLanguageBtn'
                }`}
            >
                {lang}
            </div>
        </div>
    );
};

export const InterviewOnePost = ({ state, setState }) => {
    const { data, updateRecord } = useDoc(
        `/content/contents/${state.category}/${state.post}`
    );
    const [language, changeLanguage] = useState();
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
                        {'language: '}
                        <LangToggle
                            language={data.language}
                            changeLanguage={changeLanguage}
                        />
                        {' header:'}
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
                        if (language) chapters.language = language;
                        if (
                            value ||
                            header ||
                            image ||
                            video ||
                            subheader ||
                            language
                        )
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
    const chapters = useCol(
        `/content/contents/College-prep/${state.field}/chapters`
    );
    const { data, updateRecord } = useDoc(
        `/content/contents/College-prep/${state.field}/chapters/${state.post}`
    );
    // console.log(data);
    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    const [option, setOption] = useState('');
    const [language, changeLanguage] = useState();
    const getParent = (array, parentid) => {
        console.log(array);
        return array?.find((cur) => {
            if (cur.id === parentid) {
                return true;
            }
        });
    };
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        {'language: '}
                        <LangToggle
                            language={data.language}
                            changeLanguage={changeLanguage}
                        />

                        {''}
                        <Input
                            basevalue={data.header}
                            setbaseValue={setHeader}
                            placeholder='type content header'
                        />
                        <select
                            className='pa-5'
                            onChange={(e) => {
                                setOption(e.target.value);
                            }}
                            // value={option}
                        >
                            {data.parent === '' && (
                                <option disabled selected value>
                                    {' '}
                                    -- select an option --{' '}
                                </option>
                            )}
                            {chapters?.data.map((d) => {
                                console.log(d);
                                console.log(data);
                                return (
                                    <option
                                        value={d.id}
                                        selected={d.id === data.parent}
                                    >
                                        {d.header}
                                    </option>
                                );
                            })}
                        </select>
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
                        if (option) chapters.parent = option;
                        if (language) chapters.language = language;
                        if (value || header || option || language)
                            await updateRecord(chapters);
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
    const [language, changeLanguage] = useState();
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        {'language: '}
                        <LangToggle
                            language={data.language}
                            changeLanguage={changeLanguage}
                        />

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
                        if (language) chapters.language = language;
                        if (value || header || image || language)
                            await updateRecord(chapters);
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};

export const EducationOnePost = ({ state, setStatem }) => {
    const { data, updateRecord } = useDoc(
        `content/contents/${state.category}/${state.field}/chapters/${state.post}`
    );
    console.log(data);
    const [value, setValue] = useState();
    const [header, setHeader] = useState();
    const [language, changeLanguage] = useState();
    return (
        <div>
            {data && (
                <>
                    <div className='w100 flex justify-center items-center fs-20'>
                        {'language: '}
                        <LangToggle
                            language={data.language}
                            changeLanguage={changeLanguage}
                        />

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
                        if (value) data.text = value;
                        if (header) data.header = header;
                        if (language) data.language = language;
                        if (value || header || language)
                            await updateRecord(data);
                    }}
                >
                    Save
                </div>
            </div>
        </div>
    );
};
