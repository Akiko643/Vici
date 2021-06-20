import React, { useState, useEffect, useContext } from "react";
import FeedData from "./FeedData.js";
import Card from "./Card";
import "./Feed.css";
import { useFirebase } from "../../Hooks/firebase.js";
import { Context } from "../../Providers/contentProvider.jsx";
const Feed = () => {
    const { language } = useContext(Context);
    const [feedData, setFeedData] = useState([]);
    const { firebase } = useFirebase();
    useEffect(async () => {
        const query = await firebase.firestore().collection(`/content/contents/Interview`).where('language', '==', language).orderBy('createdAt', 'desc').limit(6);
        const snapshot = await query.get();
        const docs = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        // console.log(docs)
        setFeedData(docs);
    }, [language])
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
