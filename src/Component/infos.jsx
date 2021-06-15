import React, { cloneElement, useContext, useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Context } from "../Providers/contentProvider";
import imgrc from "../Img/Rectangle 14.png";
import Navbar from "./Navbar/Navbar";
import { useDoc, useCol, useFirebase } from "../Hooks/firebase";
import { AuthStateValue } from "../Hooks/auth-user-provider";
import "./infos.scss";
import img from "../Img/oceans 2.png";
import Location from "../Img/Location.svg";
import Welcome from "../Img/Welcome.svg";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Infos = () => {
  const { informations, collegePrep } = useContext(Context);
  const [cpData, setCpData] = useState({});
  const location = useLocation();
  const { data:firstData } = useCol(
    `/content/contents/College-prep/${cpData.id}/chapters`
  );
  const [chapterId, setChapterId] = useState("");
  const [idkChapter, setIdkChapter] = useState([]);
  const implement = (dt) => {
    let tf = [...dt];
    for (let i = 0; i < tf.length; i++) {
      if (tf[i].parent != "") {
        for (let j = 0; j < tf.length; j++) {
          if (i != j && tf[j]?.id == tf[i]?.parent) {
            if (tf[j]?.items) {
              tf[j]?.items?.push(tf[i]);
            } else {
              tf[j].items = [tf[i]];
            }
            tf.splice(i, 1);
            i--;
          }
        }
      }
    }
    setChapterId(tf[0]?.id);
    return tf;
  };
  useEffect(() => {
    let ds = implement(firstData);
    setIdkChapter(ds);
  }, [firstData]);

  useEffect(() => {
    setCpData(
      collegePrep.find((cp) => {
        if (cp.name == location.pathname.substring(1, location.pathname.length))
          return true;
      })
    );
  }, [collegePrep]);

  return (
    <div className="ws100 hs100 font-ubuntu infos b-background">
      <Navbar />
      <div className="heading">
        <img
          src={imgrc}
          className="w100 pb-50"
          alt="Hello world idk img here not loaded"
        />
      </div>
      <div className="container-idk">
        <p className="college">College</p>
        <h1 className="headeridk">
          {location.pathname.substring(1, location.pathname.length)}
        </h1>
      </div>
      <div className="flex container-idk">
        <div className="mv-10 mr-10 flex flex-col">
          <ul className="fs-20 lh-20 list-style-none pv-20 pa-r-20 pl-0">
            <li className="c-dedault pb-10 bb-border-2 w-200 ma-4 bold">
              Course Summary
            </li>
            {idkChapter.map((chapter, index) => {
              return (
                <SideDp index={index} chapterId={chapterId} chapter={chapter} setChapterId={setChapterId} />
              );
            })}
          </ul>
          <img src={Welcome} className="svg_images" alt="img" />
          <img src={Location} className="svg_images" alt="img" />
        </div>
        <div className="ma-10 pa-50 b-white right-sec br-border-1">
          <ReactMarkdown className="fs-20 ln-25">
            {
              firstData?.find((chp) => {
                if (chp.id == chapterId) {
                  return true;
                }
              })?.text
            }
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
const SideDp = ({ index, chapterId, chapter, setChapterId }) => {
    const [open, setOpen] = useState(false);
    return (
        <li
            className={`c-default w-200 ma-4 pt-10 pointer`}
            key={index}
        >
            <p
            className={`c-default pb-10 bb-border-1 w-200 ma-4 pt-10 ${
                chapterId === chapter?.id && "active-chapter"
            } pointer`}
            onClick={() => {
                setChapterId(chapter?.id);
                setOpen(!open)
            }}
            >
            {chapter?.header}
            </p>
            {
                open && (
                    chapter?.items?.map((item, index) => {
                        return (
                            <div
                            onClick={() => setChapterId(item?.id)}
                            key={index}
                            className={`c-default pb-10 bb-border-1 w-180 fs-16 ma-4 pt-10 ml-24 ${
                                chapterId === item?.id && "active-chapter"
                            } pointer`}
                            >
                            {item?.header}
                            </div>
                        );
                    })
                )
            }
        </li>
    );
}
export { Infos };
