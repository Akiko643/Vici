import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import Editor from './Editor';

export const AdminCategory = ({ state, setState }) => {
    const { data } = useDoc('content/contents');
    console.log(data);
    return (
        <div className='grid grid-cols-2 gap-20 mx-20 mt-20'>
            {data?.list?.map((d) => {
                return (
                    <div
                        className='bg-blue-500 h-200 rounded-3xl flex items-center justify-center text-white text-6xl'
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
    const { data } = useCol(`content/contents/${state.category}`);
    console.log(data);
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <Carousel
            swipeable={true}
            arrows={false}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={false}
            keyBoardControl={true}
            containerClass='carousel-container'
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass='custom-dot-list-style'
            itemClass='carousel-item-padding-40-px'
        >
            {data &&
                data.map((dt) => {
                    return (
                        <div
                            className=' rounded-lg ma-20 flex-center pa-40'
                            style={{ backgroundColor: '#F5F5F5' }}
                        >
                            <p className='h-50 fs-36 flex'>
                                <img
                                    className='h-50 w-50 mr-10'
                                    src={dt.image}
                                    alt=''
                                ></img>
                                <div> {dt.name} </div>
                            </p>
                            <div className='h-210 w100 flex-col justify-between mt-10'>
                                {dt.questions.map((el, index) => {
                                    console.log(el);
                                    return (
                                        <div
                                            className='flex flex-row items-center'
                                            key={index}
                                        >
                                            <div className='too'>
                                                <p>{index + 1}</p>
                                            </div>
                                            {el}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='w100 flex-center mt-20 mb-20'>
                                <div
                                    className='w-130 h-45 text-center bradius-10 b-secondary flex-center c-white pointer'
                                    onClick={() => {
                                        setState({
                                            ...state,
                                            field: dt.id,
                                            level: 2,
                                        });
                                    }}
                                >
                                    Select
                                </div>
                            </div>
                        </div>
                    );
                })}
        </Carousel>
    );
};

export const AdminPosts = ({ state, setState }) => {
    const { data, deleteRecord, updateRecord } = useDoc(
        `content/contents/${state.category}/${state.field}`
    );
    const { user } = AuthStateValue();
    // console.log(user);
    const { firestore } = useFirebase();
    const [header, setHeader] = useState('');
    // console.log(data);
    return (
        <div className='h-full'>
            {data ? (
                <>
                    <div className='text-4xl'>Chapters</div>
                    <div className='overflow-y-scroll p-5 h-3/5 border-2 border-black rounded-2xl mb-30'>
                        {data.chapters?.map((dt, index) => {
                            console.log(dt.header);
                            return (
                                <div className='flex justify-between rounded-lg mx-20 px-10 py-5 bg-gray-200 mb-10'>
                                    <div className='text-3xl'>{dt.header}</div>
                                    <div className='flex w-1/3 justify-around'>
                                        <div
                                            className='bg-green-400 rounded-md w-2/5 h-10 flex justify-center items-center'
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    post: index,
                                                    level: 3,
                                                });
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className='bg-red-400 rounded-md w-2/5 h-10 flex justify-center items-center'
                                            onClick={async () => {
                                                const { chapters } = data;
                                                console.log(chapters, index);
                                                for (
                                                    let i = index;
                                                    i + 1 < chapters.length;
                                                    i++
                                                ) {
                                                    chapters[i] =
                                                        chapters[i + 1];
                                                }
                                                chapters.pop();
                                                await updateRecord({
                                                    chapters,
                                                });
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='text-4xl'>Create</div>
                    <div className='border-2 border-black rounded-2xl p-5'>
                        <div className='flex justify-between rounded-lg mx-20 px-10 py-5 bg-gray-200'>
                            <input
                                placeholder='Add new chapter'
                                value={header}
                                onChange={(e) => {
                                    setHeader(e.target.value);
                                }}
                                className='text-2xl rounded-md'
                            ></input>
                            <div
                                className='bg-green-400 rounded-md w-1/6 h-10 flex justify-center items-center'
                                onClick={async () => {
                                    const id = firestore
                                        .collection('temp')
                                        .doc().id;
                                    let { chapters } = data;
                                    chapters.push({
                                        header,
                                        publisher: user.displayName,
                                        publisherID: user.uid,
                                        text: '',
                                    });
                                    await updateRecord({
                                        chapters,
                                    });

                                    setState({
                                        ...state,
                                        level: 3,
                                        post: chapters.length - 1,
                                    });
                                }}
                            >
                                Create
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className='text-4xl'>No post in this chapter</div>
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
                    <div className='w-full flex justify-center items-center text-3xl'>
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
            <div className='w-full flex justify-end pr-10'>
                <div
                    className='text-3xl bg-gray-200 w-40 h-25 rounded-lg flex items-center justify-center justify-self-end'
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
