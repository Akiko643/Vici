import React, { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Card.css';
const Card = ({ card, index }) => {
    const [show, setShow] = useState(false);
    const history = useHistory()
    const handleHover = () => {
        setShow(!show);
    };
    return (
        <div
            onClick={() => {
                history.push(`/interview/${card.id}`); 
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }}
            key={index}
            className='card'
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <img src={card.image} alt={card.header} className='w100'/>
            <Fade bottom collapse when={show}>
                <h2 className='feed-subtitle'>{card.subheader}</h2>
            </Fade>

            <Fade bottom collapse when={show}>
                <h2 className={show ? 'feed-title active' : 'feed-title'}>
                    {card.header}
                </h2>
            </Fade>
        </div>
    );
};

export default Card;
