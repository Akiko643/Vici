import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router";
import { useCol, useDoc, useFirebase } from "../../../Hooks/firebase";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";
import "./InterviewTest.css";
import ReactPlayer from "react-player";
import PlayerData from "./PlayerData.js";
import Back from "../../../Img/vector__back.svg";
import Card from "../Card";

export const InterviewTest = () => {
    const { t } = useTranslation();
    const match = useRouteMatch();
    const history = useHistory();
    const { data: doc } = useDoc(
        `/content/contents/Interview/${match.params.interviewId}`
    );
    const { data } = useDoc(`users/${doc?.publisherId}`);
    const toTime = (timestamp) => {
        var date = new Date(timestamp?.seconds * 1000);
        return (
            date.getMonth() +
            1 +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear()
        );
    };
    const [cardData, setCardData] = useState([]);
    const { firebase } = useFirebase();
    useEffect(async () => {
        const query = await firebase
            .firestore()
            .collection(`/content/contents/Interview`)
            .orderBy("createdAt", "desc")
            .limit(3);
        const snapshot = await query.get();
        const docs = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        setCardData(docs);
    }, []);
    return (
        <div>
            <div className="interview__container pa-vw-10 pr">
                <img
                    src={Back}
                    className="arrow pointer"
                    onClick={() => history.push("/interview")}
                />
                <div className="player-wrapper">
                    <ReactPlayer
                        className="react-player"
                        url={doc?.video}
                        controls={true}
                    />
                </div>
                <div className="upper__text mt-80">
                    <h1 className="int__title">{doc?.header}</h1>
                    <h2 className="int__subtitle">{doc?.subheader}</h2>
                    <div className="little__text mt-40">
                        <p className="publisher__name ">
                            <img
                                src={data?.profilePicUrl}
                                alt={data?.displayName}
                                className="publisher-profile-img w-15 h-15 mr-5"
                            />
                            {data?.displayName}
                        </p>
                        <p className="date__created">
                            {toTime(doc?.createdAt)}
                        </p>
                    </div>
                    <hr className="mt-30" />
                </div>
                <div className="big-text w-vw-66 mt-30">
                    <ReactMarkdown>{doc?.text}</ReactMarkdown>
                </div>
                <hr className="mt-45 w-vw-66" />
                <h1 className="latest__speakers  mt-40">{t('latestSpeakers')}</h1>
                <div className="w-vw-66 mt-40 lower__container">
                    {cardData.map((card, index) => {
                        return <Card card={card} index={index} />;
                    })}
                </div>
            </div>
        </div>
    );
};
