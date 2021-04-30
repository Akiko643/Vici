import react from 'react'

function Speakers({person}) {
    console.log(`../../Img/${person}.png`);
    return(
        <div className="pr mt-20">
            <div className="b-white w-270 h-390 bradius-10 z--1"></div>
            <img className="absolute b-0 l-0 z-0" src={`./images/${person}.png`}></img>
            <h3 className="absolute b-0 h-40 w-160 b-default z-1 c-white flex items-center justify-center bradius-5">{person}</h3>   
        </div>
    )
}

export default Speakers;