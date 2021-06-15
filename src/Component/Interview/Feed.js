import React from "react";
import FeedData from "./FeedData.js";
import Card from "./Card";
import "./Feed.css";
const Feed = () => {
    return (
        <div className="card-container">
            {FeedData.map((card, index) => {
                return <Card card={card} index={index} />;
            })}
        </div>
    );
};

export default Feed;
