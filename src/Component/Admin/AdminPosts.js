import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';
import Editor from './Editor';
import ReactPaginate from 'react-paginate';
import { Switch, useRouteMatch, Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import { BlogTemp } from '../blog-temp/blogtemp';
import { BlogItemComp } from '../Blog/BlogItemComp';
import { SuggestPagination } from '../Blog/SuggestPagination';

export const BlogPosts = ({ state, setState }) => {
    const { user } = AuthStateValue();
    const { data, updateRecord } = useDoc(`users/${user?.uid}`);
    // const
    // console.log(data);
    return (
        <div>
            {data?.posts.map((post) => (
                <div>{post.header}</div>
            ))}
        </div>
    );
};

export const EducationPosts = ({ state, setState }) => {
    const { data, deleteRecord, updateRecord } = useDoc(
        `content/contents/${state.category}/${state.field}`
    );
    const { user } = AuthStateValue();
    // console.log(user);
    const { firestore } = useFirebase();
    const [header, setHeader] = useState('');
    // console.log(data);
    return (
        <div className='h100'>
            {data ? (
                <>
                    <div className='fs-20'>Chapters</div>
                    <div className='of-y p-15 h60 br-default-2 bradius-5 mb-100'>
                        {data.chapters?.map((dt, index) => {
                            console.log(dt.header);
                            return (
                                <div className='br-default-2 flex justify-between bradius-5 mv-20 mh-10 ph-20 pv-10 mb-10'>
                                    <div className='fs-20'>{dt.header}</div>
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
                </>
            ) : (
                <div className='fs-20'>No post in this chapter</div>
            )}
        </div>
    );
};
