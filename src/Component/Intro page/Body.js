import React, { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../Img/IntroPageSpace.svg";
import img2 from "../../Img/IntroPageExplore.svg";
import Dates from "./Dates";
import Speakers from "./Speakers";
import "./Transition.css";
import { SuggestPagination } from "../Blog/SuggestPagination";

function Body() {
    let speakers = ["John Doe", "Farmer John", "Onkar Judge"];
    const [isShown, setIsShown] = useState(true);

    return (
        <div className="ph-190 of-x-h mt-60">
            <div className="flex items-center justify-between mb-0">
                <h1 className="fs-45 w-430">
                    Walk with us, bla bla bla uria loozon
                </h1>
                <div>
                    <img src={img1} className="h-550" alt="img" />
                    {/* <img src="./images/IntroPageSpaceGreen.svg" className="h-550"></img> */}
                </div>
            </div>
            <img
                className="absolute w100 l-0 z--1"
                src="./images/Wave.svg"
                alt="wave"
            />
            <div className="mb-140 pr mt-300">
                <h2 className="fw-600 fs-30 mb-20">International exams</h2>
                <div className="flex justify-between">
                    <Dates exam="SAT Dates"></Dates>
                    <Dates exam="IELTS Dates"></Dates>
                    <Dates exam="TOEFL Dates"></Dates>
                </div>
            </div>
            <SuggestPagination />
            <div className="mb-140">
                <h2 className="fw-600 fs-30 mt-60">Latest Speakers</h2>
                {/* <div className="flex justify-between">
                    {speakers.map((speaker) => (
                        <Speakers person={speaker}></Speakers>
                    ))}
                </div> */}
                <Speakers />
            </div>
            <div className="flex items-center justify-between">
                <img src={img2} alt="img" />
                <div className="w50 flex items-center justify-center flex-col">
                    <h1 className="fs-60 mb-80 text-center w100">
                        Explore with us
                    </h1>
                    <button className="b-secondary nb bradius-10 w-160 h-40 c-white">
                        Get started
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Body;
