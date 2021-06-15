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
        <div className='h100 pa-50'>
            {state.level !== 0 ? (
                <div
                    className='flex items-center'
                    onClick={() => {
                        setState({
                            ...state,
                            level: state.level - 1,
                        });
                    }}
                >
                    <img src='../images/back.svg' className='h-20 w-20 mr-12' />
                    <p className='fs-20'>back</p>
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
