import React, { useState, useEffect } from "react";
import FeedData from "./FeedData.js";
import Card from "./Card";
import "./Feed.css";
import { useFirebase } from "../../Hooks/firebase.js";
const Feed = () => {
    const [feedData, setFeedData] = useState([]);
    const { firebase } = useFirebase();
    useEffect(async () => {
        const query = await firebase.firestore().collection(`/content/contents/Interview`).orderBy('createdAt', 'desc').limit(6);
        const snapshot = await query.get();
        const docs = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        // console.log(docs)
        setFeedData(docs);
    }, [])
    return (
        <div className="flex-container">
            <div className="card-container">
                {feedData.map((card, index) => {
                    return <Card card={card} index={index} />;
                })}
            </div>
        </div>
    );
};

export default Feed;
