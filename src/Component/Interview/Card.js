import React, { useState } from "react";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Card.css";
const Card = ({ card, index }) => {
    const [show, setShow] = useState(false);
    const handleHover = () => {
        setShow(!show);
    };
    return (
        <Link to="/interviewtest">
            <div
                key={index}
                className="card"
                onMouseEnter={handleHover}
                onMouseLeave={handleHover}
            >
                <img src={card.image} alt={card.header} />
                <Fade bottom collapse when={show}>
                    <h2 className="feed-subtitle">{card.subheader}</h2>
                </Fade>

                <Fade bottom collapse when={show}>
                    <h2 className={show ? "feed-title active" : "feed-title"}>
                        {card.header}
                    </h2>
                </Fade>
            </div>
        </Link>
    );
};

export default Card;
