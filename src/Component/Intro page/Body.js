import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dates from "./Dates";
import Speakers from "./Speakers";
import "./Transition.css";
import { SuggestPagination } from "../Blog/SuggestPagination";
import { useTranslation } from "react-i18next";
import { useTransition, animated, config } from "react-spring";
import Astronaut from "./Astronaut";
import img1 from "../../Img/Grouppink.svg";
import img2 from "../../Img/Groupgreen.svg";
import img3 from "../../Img/IntroPageExplore.svg";
function Body() {
    const { t } = useTranslation();
    return (
        <div className="ph-190 of-x-h mt-60 intro-body">
            <div className="flex items-center justify-between mb-165 mt-165 flex-wrap">
                <h1 className="fs-45 w-500">
                    {t("welcome")}
                    <p className="fs-30">{t("welcome2")}</p>
                </h1>
                <Astronaut i1={img1} i2={img2} />
            </div>
            <img
                className="absolute w100 l-0 z--1"
                src="./images/Wave.svg"
                alt="wave"
            />
            <div className="mb-140 pr mt-300">
                <h2 className="fw-600 fs-30 mb-20">
                    {t("internationalExams")}
                </h2>
                <div className="flex justify-between">
                    <Dates exam={`SAT ${t("examdates")}`}></Dates>
                    <Dates exam={`IELTS ${t("examdates")}`}></Dates>
                    <Dates exam={`TOEFL ${t("examdates")}`}></Dates>
                </div>
            </div>
            <SuggestPagination />
            <div className="mb-140">
                <h2 className="fw-600 fs-30 mt-60">{t("latestSpeakers")}</h2>
                <Speakers />
            </div>
            {/* <div className="flex items-center justify-between">
                <img src={img2} alt="img" />
                <div className="w50 flex items-center justify-center flex-col">
                    <h1 className="fs-60 mb-80 text-center w100">
                        Explore with us
                    </h1>
                    <button className="b-secondary nb bradius-10 w-160 h-40 c-white">
                        Get started
                    </button>
                </div>
            </div> */}
        </div>
    );
}

export default Body;
