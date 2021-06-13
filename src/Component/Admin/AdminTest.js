import React, { useState } from 'react';
import {
    AdminCategory,
    AdminField,
    AdminOnePost,
    AdminPosts,
} from './AdminComponents';

const AdminTest = () => {
    const [state, setState] = useState({
        level: 0,
        category: null,
        field: null,
        post: null,
    });
    return (
        <div className='h-screen p-20'>
            {state.level !== 0 ? (
                <div
                    className='flex'
                    onClick={() => {
                        setState({
                            ...state,
                            level: state.level - 1,
                        });
                    }}
                >
                    <img
                        src='../images/back.svg'
                        className='h-10 w-10 mb-5 mr-5'
                    />
                    <p className='text-3xl'>back</p>
                </div>
            ) : (
                <></>
            )}
            {state.level === 0 ? (
                <AdminCategory state={state} setState={setState} />
            ) : state.level === 1 ? (
                <AdminField state={state} setState={setState} />
            ) : state.level === 2 ? (
                <AdminPosts state={state} setState={setState} />
            ) : (
                <AdminOnePost state={state} setState={setState} />
            )}
        </div>
    );
};

export default AdminTest;
