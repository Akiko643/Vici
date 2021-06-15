import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import "./Card.css";
const Card = ({ card, index }) => {
    const [show, setShow] = useState(false);
    const handleHover = () => {
        setShow(!show);
    };
    return (
        <div>
            <div key={index} className="card">
                <img src={card.image} alt={card.header} />
                <Fade bottom collapse when={show}>
                    <h2 className="feed-subtitle">{card.subheader}</h2>
                </Fade>
                <h2
                    className="feed-title"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHover}
                >
                    {card.header}
                </h2>
            </div>
        </div>
    );
};

export default Card;
