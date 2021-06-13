import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import { AuthStateValue } from '../../Hooks/auth-user-provider';
import { useCol, useDoc, useFirebase } from '../../Hooks/firebase';

function Upload({ category, fieldID, post }) {
    const { data, updateRecord } = useDoc(
        `content/contents/${category}/${fieldID}`
    );
    const { firestore } = useFirebase();
    const { user } = AuthStateValue();
    const curUser = useDoc(`/users/${user?.uid}`);
    const id = firestore.collection('temp').doc().id;
    return (
        <button
            className='pa-5'
            onClick={async () => {
                console.log(data);
                let { chapters } = data;
                let newPost = {
                    header: post.header,
                    text: post.value,
                    publisher: curUser.data.displayName,
                    publisherID: user?.uid,
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
