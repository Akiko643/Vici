import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Lesson from "./Lesson";
import img from "../../Img/oceans2.png";
import "./education.scss";
import { Info } from "./Info";
import { Switch, Route } from "react-router-dom";
import { useCol } from "../../Hooks/firebase";

export const Education = () => {
    const { data } = useCol("content/contents/Education");
    return (
        <>
            <Navbar />
            <Switch>
                <Route exact path="/education">
                    <div
                        className="h-150 w100 c-white pl-190 pr"
                        style={{ backgroundImage: `url(${img})` }}
                    >
                        <div className="bottom-10 fs-48 absolute">
                            {" "}
                            Education
                        </div>
                    </div>
                    <div className="pv-66 flex w100 justify-around ph-30 educations flex-wrap">
                        {data &&
                            data.map((dt, index) => {
                                return (
                                    <Lesson
                                        icon={dt.image}
                                        name={dt.name}
                                        elements={dt.questions}
                                        id={dt.id}
                                        key={index}
                                    />
                                );
                            })}
                    </div>
                </Route>
                {data &&
                    data.map((dt, index) => {
                        return (
                            <Route exact path={"/education/" + dt.id}>
                                <Info
                                    chapters={dt.chapters}
                                    key={index}
                                    name={dt.name}
                                />
                            </Route>
                        );
                    })}
            </Switch>
            <Footer />
        </>
    );
};
