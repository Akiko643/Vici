import { create } from 'domain';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';

export const InterviewPosts = ({ state, setState }) => {
    const { user } = AuthStateValue();
    const [header, setHeader] = useState('');
    const { firestore } = useFirebase();
    let { data, createRecord, deleteRecord } = useCol(
        `/content/contents/${state.category}`
    );
    data = data?.filter((post) => post.publisherId === user?.uid);

    const createPost = async () => {
        const id = firestore
            .collection(`/content/contents/${state.category}`)
            .doc().id;

        const newPost = {
            header,
            image: '',
            video: '',
            likes: 0,
            visits: 0,
            publisherId: user?.uid,
        };

        createRecord(id, newPost);

        setState({
            ...state,
            level: 3,
            post: id,
        });
    };

    return (
        <div className='h100'>
            {data ? (
                <>
                    <div className='fs-20'>Chapters</div>
                    <div className='of-y p-15 h60 br-default-2 bradius-5 mb-100'>
                        {data.map((post, index) => (
                            <div className='br-default-2 flex justify-between bradius-5 mv-20 mh-10 ph-20 pv-10 mb-10'>
                                <div className='fs-20'>{post.header}</div>
                                <div className='flex w33 justify-around'>
                                    <div
                                        className='b-green bradius-5 w40 h-40 flex justify-center items-center'
                                        onClick={() => {
                                            console.log(post.id);
                                            setState({
                                                ...state,
                                                post: post.id,
                                                level: 3,
                                            });
                                        }}
                                    >
                                        Edit
                                    </div>
                                    <div
                                        className='b-secondary bradius-5 w40 h-40 flex justify-center items-center'
                                        onClick={async () => {
                                            await deleteRecord(post.id);
                                        }}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='fs-20'>No post in this chapter</div>
            )}
            <div className='fs-20'>Create</div>
            <div className='br-default-2 flex justify-between bradius-5 mv-20 ph-20 pv-10 mb-10'>
                <input
                    placeholder='Add new chapter'
                    value={header}
                    onChange={(e) => {
                        setHeader(e.target.value);
                    }}
                    className='fs-20 bradius-5'
                ></input>
                <div
                    className='b-green bradius-5 w12 h-40 flex justify-center items-center'
                    onClick={createPost}
                >
                    Create
                </div>
            </div>
        </div>
    );
};

export const CollegePrepPosts = ({ state, setState }) => {
    return <div>College prep</div>;
};

export const BlogPosts = ({ state, setState }) => {
    const { user } = AuthStateValue();
    const [header, setHeader] = useState('');
    const { firestore } = useFirebase();
    let { data, createRecord, deleteRecord } = useCol(
        `/content/contents/${state.category}`
    );
    const category = useDoc(`/content/contents/categories/${state.field}`);
    data = data?.filter(
        (post) =>
            post.category.id === state.field && post.publisherId === user?.uid
    );

    const createPost = async () => {
        const id = firestore
            .collection(`/content/contents/${state.category}`)
            .doc().id;

        console.log(id);
        const categoryName = category.data.name;
        const newPost = {
            category: { id: state.field, name: categoryName },
            header,
            image: '',
            likes: 0,
            visits: 0,
            publisherId: user?.uid,
        };

        createRecord(id, newPost);

        setState({
            ...state,
            level: 3,
            post: id,
        });
    };

    return (
        <div className='h100'>
            {data ? (
                <>
                    <div className='fs-20'>Chapters</div>
                    <div className='of-y p-15 h60 br-default-2 bradius-5 mb-100'>
                        {data.map((post, index) => (
                            <div className='br-default-2 flex justify-between bradius-5 mv-20 mh-10 ph-20 pv-10 mb-10'>
                                <div className='fs-20'>{post.header}</div>
                                <div className='flex w33 justify-around'>
                                    <div
                                        className='b-green bradius-5 w40 h-40 flex justify-center items-center'
                                        onClick={() => {
                                            console.log(post.id);
                                            setState({
                                                ...state,
                                                post: post.id,
                                                level: 3,
                                            });
                                        }}
                                    >
                                        Edit
                                    </div>
                                    <div
                                        className='b-secondary bradius-5 w40 h-40 flex justify-center items-center'
                                        onClick={async () => {
                                            deleteRecord(post.id);
                                        }}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className='fs-20'>No post in this chapter</div>
            )}
            <div className='fs-20'>Create</div>
            <div className='br-default-2 flex justify-between bradius-5 mv-20 ph-20 pv-10 mb-10'>
                <input
                    placeholder='Add new chapter'
                    value={header}
                    onChange={(e) => {
                        setHeader(e.target.value);
                    }}
                    className='fs-20 bradius-5'
                ></input>
                <div
                    className='b-green bradius-5 w12 h-40 flex justify-center items-center'
                    onClick={createPost}
                >
                    Create
                </div>
            </div>
        </div>
    );
};

export const EducationPosts = ({ state, setState }) => {
    const { data, deleteRecord, updateRecord, createRecord } = useCol(
        `content/contents/${state.category}/${state.field}/chapters`
    );
    const { firestore } = useFirebase();
    const [header, setHeader] = useState('');
    const createPost = async () => {
        const id = firestore
            .collection(
                `content/contents/${state.category}/${state.field}/chapters`
            )
            .doc().id;

        createRecord(id, { header, text: '' });

        setState({
            ...state,
            level: 3,
            post: id,
        });
    };

    return (
        <div className='h100'>
            {data ? (
                <>
                    <div className='fs-20'>Chapters</div>
                    <div className='of-y p-15 h60 br-default-2 bradius-5 mb-100'>
                        {data?.map((dt, index) => {
                            console.log(dt.id);
                            return (
                                <div className='br-default-2 flex justify-between bradius-5 mv-20 mh-10 ph-20 pv-10 mb-10'>
                                    <div className='fs-20'>{dt.header}</div>
                                    <div className='flex w33 justify-around'>
                                        <div
                                            className='b-green bradius-5 w40 h-40 flex justify-center items-center'
                                            onClick={() => {
                                                setState({
                                                    ...state,
                                                    post: dt.id,
                                                    level: 3,
                                                });
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            className='b-secondary bradius-5 w40 h-40 flex justify-center items-center'
                                            onClick={() => {
                                                deleteRecord(dt.id);
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className='fs-20'>Create</div>
                    <div className='br-default-2 flex justify-between bradius-5 mv-20 ph-20 pv-10 mb-10'>
                        <input
                            placeholder='Add new chapter'
                            value={header}
                            onChange={(e) => {
                                setHeader(e.target.value);
                            }}
                            className='fs-20 bradius-5'
                        ></input>
                        <div
                            className='b-green bradius-5 w12 h-40 flex justify-center items-center'
                            onClick={createPost}
                        >
                            Create
                        </div>
                    </div>
                </>
            ) : (
                <div className='fs-20'>No post in this chapter</div>
            )}
        </div>
    );
};
