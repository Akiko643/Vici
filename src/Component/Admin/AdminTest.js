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
        <div className=''>
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
