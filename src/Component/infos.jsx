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
import dropdownchevron from "../Img/dropdownchevron.svg";
import { useTranslation } from "react-i18next";
const Infos = () => {
    const { t } = useTranslation();
    const { collegePrep } = useContext(Context);
    const [cpData, setCpData] = useState({});
    const location = useLocation();
    const { data: firstData } = useCol(
        `/content/contents/College-prep/${cpData.id}/chapters`
    );
    const { user } = AuthStateValue();
    const { data, updateRecord } = useDoc(`/users/${user?.uid}`);
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
    }, [firstData, cpData]);

    useEffect(() => {
        setCpData(
            collegePrep.find((cp) => {
                if (
                    cp.name ==
                    location.pathname.substring(1, location.pathname.length)
                )
                    return true;
            })
        );
    }, [collegePrep, location.pathname]);

    return (
        <div className="ws100 hs100 font-ubuntu infos b-background">
            <Navbar />
            <div className="heading">
                <img
                    src={
                        "https://firebasestorage.googleapis.com/v0/b/vici-news.appspot.com/o/oceans%202oceans.png?alt=media&token=876045c7-430b-4397-bf26-795b249ac9ba"
                    }
                    className="w100 pb-50"
                    alt="Hello world idk img here not loaded"
                />
            </div>
            <div className="container-idk">
                <p className="college">{t('college')}</p>
                <h1 className="headeridk">
                    {location.pathname.substring(1, location.pathname.length)}
                </h1>
            </div>
            <div className="flex container-idk">
                <div className="mv-10 mr-10 flex flex-col">
                    <ul className="fs-20 lh-20 list-style-none pv-20 pa-r-20 pl-0">
                        <li className="c-dedault pb-10 bb-border-2 w-200 ma-4 bold">
                            {t('courseSummary')}
                        </li>
                        {idkChapter.map((chapter, index) => {
                            return (
                                <SideDp
                                    index={index}
                                    chapterId={chapterId}
                                    chapter={chapter}
                                    setChapterId={setChapterId}
                                />
                            );
                        })}
                    </ul>
                    <img src={Welcome} className="svg_images" alt="img" />
                    <img src={Location} className="svg_images" alt="img" />
                </div>
                <div className="ma-10 pa-50 b-white right-sec br-border-1">
                    <ReactMarkdown className="fs-20 ln-25">
                        {firstData?.find((chp) => {
                            if (chp.id == chapterId) {
                                return true;
                            }
                        })?.header !== "College checklist" &&
                            firstData?.find((chp) => {
                                if (chp.id == chapterId) {
                                    return true;
                                }
                            })?.text}
                    </ReactMarkdown>
                    {user &&
                        firstData?.find((chp) => {
                            if (chp.id == chapterId) {
                                return true;
                            }
                        })?.header === "College checklist" &&
                        data && (
                            <ChecklistContainer
                                checklist={data.checklist}
                                userID={user.uid}
                                chapterID={chapterId}
                                updateRecord={updateRecord}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

const ChecklistContainer = ({ checklist, userID, chapterID, updateRecord }) => {
    //unfinished save button
    // console.log("checklist loaded");
    const [fullList, setList] = useState(checklist);
    const [updated, setUpdated] = useState(true);
    return (
        <div>
            {checklist.map((list, index) => {
                return (
                    <Checklist
                        fullList={fullList}
                        index={index}
                        userID={userID}
                        setList={setList}
                        updated={updated}
                        setUpdated={setUpdated}
                    />
                );
            })}
            <button
                className={`fw-500 pa-5 ph-10 mt-10 bradius-10 rb pointer ${updated && `b-green c-white`}`}
                onClick={async () => {
                    if (updated == false) await updateRecord({ checklist: fullList });
                    setUpdated(true);
                }}
            >
                Save
            </button>
        </div>
    );
};

const Checklist = ({ fullList, index, userID, setList, updated, setUpdated }) => {
    const [checked, setChecked] = useState(fullList[index].completed);
    return (
        <div className='fw-600'>
            <input
                onChange={(e) => {
                    let temp = fullList;
                    temp[index].completed = e.target.checked;
                    setList(temp);
                    setChecked(e.target.checked);
                    if (updated == true) setUpdated(false);
                }}
                checked={checked}
                type="checkbox"
                className='mr-5'
            />
            {fullList[index].text};
        </div>
    );
};

const SideDp = ({ index, chapterId, chapter, setChapterId }) => {
    const [open, setOpen] = useState(false);
    return (
        <li className={`c-default w-200 ma-4 pt-10 pointer`} key={index}>
            <p
                className={`c-default pb-10 bb-border-1 w-200 ma-4 pt-10 flex justify-between pa-r-10 ${
                    chapterId === chapter?.id && "active-chapter"
                } pointer`}
                onClick={() => {
                    setChapterId(chapter?.id);
                    setOpen(!open);
                }}
            >
                {chapter?.header}
                {chapter?.items && (
                    <img
                        src={dropdownchevron}
                        className={`${open && `active-dp-button`} dp-button`}
                    />
                )}
            </p>
            {open &&
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
                })}
        </li>
    );
};
export { Infos };
