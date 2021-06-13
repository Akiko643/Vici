import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc } from '../../Hooks/firebase';

function Upload({ path, header, text }) {
    const { data, updateRecord } = useDoc(path);
    const { user } = AuthStateValue();
    const curUser = useDoc(`/users/${user?.uid}`);
    return (
        <button
            className='pa-5'
            onClick={async () => {
                console.log(data);
                let { chapters } = data;
                let newPost = {
                    header,
                    text,
                    publisher: curUser.data.displayName,
                    publisherID: user.uid,
                };
                let { posts } = curUser.data;
                chapters.push(newPost);
                posts.push(newPost);
                await updateRecord({ chapters: chapters, ...data });
                await curUser.updateRecord({ ...curUser.data, posts });
            }}
        >
            Upload
        </button>
    );
}

export default Upload;
