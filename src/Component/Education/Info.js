import React, { useState } from "react";
import "./Info.scss";
import img from "../../Img/oceans 2.png";
import Location from "../../Img/Location.svg";
import Welcome from "../../Img/Welcome.svg";
// import Fade from "react-reveal";
import ReactMarkdown from "react-markdown";
import { useCol, useDoc } from "../../Hooks/firebase";

export const Info = (props) => {
  const { id, name } = props;
  const chapters = useCol(
    `/content/contents/Education/${id}/chapters`,
    null,
    true
  ).data;
  const [chapterIndex, setChapterIndex] = useState(0);
  return (
    <div className="b-background">
      <div className="heading">
        <img src={img} className="w100 pb-50" alt="No image was loaded." />
        <h1 className="c-white heading-name">{name}</h1>
      </div>
      <div className="flex info-container">
        <div className="ma-10 flex flex-col w-200 info-side">
          <ul className="fs-20 lh-20 list-style-none pv-20">
            <li className="c-default pb-10 bb-border-2 w-200 ma-4 bold">
              Course Summary
            </li>
            {chapters?.map((chapter, index) => {
              return (
                <li
                  className={`c-default pb-10 bb-border-1 w-200 ma-4 pt-10 ${
                    chapterIndex === index && "active-chapter"
                  } pointer`}
                  onClick={() => setChapterIndex(index)}
                >
                  {chapter?.header}
                </li>
              );
            })}
          </ul>
          <img src={Welcome} className="svg_images" alt="img" />
          <img src={Location} className="svg_images" alt="img" />
        </div>
        <div className="pa-50 b-white right-sec br-border-1">
          <p className="fs-20 ln-25">
            {chapters && (
              <ReactMarkdown>{chapters[chapterIndex]?.text}</ReactMarkdown>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
