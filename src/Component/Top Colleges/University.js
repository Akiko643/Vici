import React from 'react';

function University({data}) {
    console.log(data);
    return(
        <div className="w100 flex-row h-75 items-center bb-border-1">
            <p className="w10 flex justify-center bright-border-1 h-40 items-center">{data.rank}</p>
            <div className="pl-20 w75 flex">
                <svg width="92" height="50" viewBox="0 0 92 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50V0H8V50H0Z" fill="#A12137"/>
                    <path d="M66 10V0H91.5V10H66Z" fill="#A12137"/>
                    <path d="M49 10V0H59.5V10H49Z" fill="#A12137"/>
                    <path d="M66 50V16H77V50H66Z" fill="#A12137"/>
                    <path d="M49 50V16H59.5V50H49Z" fill="#8A8B8C"/>
                    <path d="M14.5 34V0H25V34H14.5Z" fill="#A12137"/>
                    <path d="M31.75 50V0H42.25V50H31.75Z" fill="#A12137"/>
                </svg>

                <p className="pl-10 h-40 flex items-center">{data.name}</p>
            </div>
            <p className="w15 pl-10 bl-border-1 h-40 flex items-center">{data.location}</p>
        </div>
    )
}

export default University;
