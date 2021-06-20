import React, { useState } from "react";

const Astronaut = (props) => {
    const [hover, setHover] = useState(false);
    const handleHover = () => {
        setHover(!hover);
    };
    return (
        <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
            {hover ? (
                <img src={props.i1} className="" alt="pink" />
            ) : (
                <img src={props.i2} className="" alt="green" />
            )}
        </div>
    );
};

export default Astronaut;
