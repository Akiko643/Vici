import { create } from 'domain';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';

export const CollegePrepPosts = ({ state, setState }) => {
    return <div>College prep</div>;
};

export const BlogPosts = ({ state, setState }) => {
    const { user } = AuthStateValue();
    let { data, updateRecord } = useDoc(`users/${user?.uid}`);

    data = data?.posts.filter((post) => post.category.id === state.field);
    // const blogCategory
    const { firestore } = useFirebase();
    const [header, setHeader] = useState('');
    const category = useDoc(`/content/contents/categories/${state.field}`);

    const createPost = async () => {
        const id = firestore.collection('/content/contents/Blog').doc().id;
        const categoryName = category.data.name;
        const newPost = { category: { id: state.field, name: categoryName } };

        setState({
            ...state,
            level: 3,
            post: data.length - 1,
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
                                        className='b-secondary bradius-5 w40 h-40 flex justify-center items-center'
                                        onClick={async () => {
                                            // const { chapters } = data;
                                            // console.log(chapters, index);
                                            // for (
                                            //     let i = index;
                                            //     i + 1 < chapters.length;
                                            //     i++
                                            // ) {
                                            //     chapters[i] =
                                            //         chapters[i + 1];
                                            // }
                                            // chapters.pop();
                                            // await updateRecord({
                                            //     chapters,
                                            // });
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
