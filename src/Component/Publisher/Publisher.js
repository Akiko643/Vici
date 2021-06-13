import React from 'react';
import { useDoc } from '../../Hooks/firebase';

const Publisher = ({ publisherID }) => {
    const { posts } = useDoc(`users/${publisherID}`).data;
    return (
        <div>
            {posts.map((post) => (
                <div>{post.header}</div>
            ))}
        </div>
    );
};

export default Publisher;
