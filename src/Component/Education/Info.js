import React, { useState } from "react";
import "./Info.scss";
import img from "../../Img/oceans 2.png";
import Location from "../../Img/Location.svg";
import Welcome from "../../Img/Welcome.svg";
import MDEditor from "@uiw/react-md-editor";

export const Info = (props) => {
  const { chapters, name } = props;
  const [chapterIndex, setChapterIndex] = useState(0);
  return (
    <div className="flex-col info-container">
      <div className="heading">
        <img
          src={img}
          className="w100 pb-50"
          alt="Hello world idk img here not loaded"
        />
        <h1 className="c-white heading-name">{name}</h1>
      </div>
      <div className="flex">
        <div className="ma-10 flex flex-col">
          <ul className="fs-20 lh-20 list-style-none pa-20">
            <li className="c-dedault pb-10 bb-border-2 w-200 ma-4 bold">
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
        <div className="ma-10 pa-50 b-white right-sec br-border-1">
          {/* <div> */}
          <h1 className="">{chapters[chapterIndex]?.header}</h1>
          <p className="fs-20 ln-25">
            <MDEditor.Markdown source={chapters[chapterIndex]?.text} />
          </p>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
