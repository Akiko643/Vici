// import react from 'react'

// function Speakers({person}) {
//     return(
//         <div className="pr mt-20">
//             <div className="b-white w-270 h-390 bradius-10 z--1"></div>
//             <img className="absolute b-0 l-0 z-0" src={`./images/${person}.png`}></img>
//             <h3 className="absolute b-0 h-40 w-160 b-default z-1 c-white flex items-center justify-center bradius-5">{person}</h3>
//         </div>
//     )
// }

// export default Speakers;

import react from "react";
import Card from "../Interview/Card";
const Speakers = () => {
    const ccard = [
        {
            image: "https://s2.im.ge/2021/06/13/QDbDY.png",
            header: "John Doe",
            subheader: "Director at Famous Company",
        },
        {
            image: "https://s2.im.ge/2021/06/13/QDcED.png",
            header: "John Doe",
            subheader: "Director at Famous Company",
        },
        {
            image: "https://s2.im.ge/2021/06/13/QDgv4.png",
            header: "John Doe",
            subheader: "Director at Famous Company",
        },
    ];
    return (
        <div className="flex justify-between flex-column mt-40">
            {ccard.map((card, index) => {
                return <Card card={card} index={index} />;
            })}
        </div>
    );
};
export default Speakers;
