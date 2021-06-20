import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Component/Navbar/Navbar";
import SignUpPage from "./Component/Login/SignUpPage";
import { Infos } from "./Component/infos";
import { useCol, useDoc, useFirebase } from "./Hooks/firebase";
import { AuthStateValue, AuthUserProvider } from "./Hooks/auth-user-provider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Context } from "./Providers/contentProvider";
import Intro from "./Component/Intro page/Intro";
import Admin from "./Component/Admin/Admin";
import TopColleges from "./Component/Top Colleges/TopColleges";
import { Education, Test, Blog } from "./Component";
import Interview from "./Component/Interview/Interview";
import AdminTest from "./Component/Admin/AdminTest";
import { InterviewTest } from "./Component/Interview/InterviewBlog/InterviewTest";
import IdealPlan from "./Component/CollegePrep/IdealPlan";

import "./Style/App.css";
import "./Style/main.scss";

import './i18';

const App = () => {
    const { user } = AuthStateValue();
    const { auth } = useFirebase();
    const curUser = useDoc(`/users/${user?.uid}`).data;
    const { data } = useCol("/users");
    const { collegePrep } = useContext(Context);
    useEffect(() => {
        if (user) {
            console.log(user.email);
        }
    }, []);
    return (
        <Router> 
            <Switch>
                <Route exact path="/">
                    <Intro />
                </Route>
                <Route path="/infos">
                    <Infos />
                </Route>
                <Route path="/user-login">
                    <SignUpPage />
                </Route>
                <Route path="/admin">
                    {curUser?.role === "admin" && <AdminTest />}
                </Route>
                {collegePrep?.map((dt) => {
                    return (
                        <Route path={`/${dt?.name}`}>
                            {dt?.name == "Top Colleges" ? (
                                <TopColleges />
                            ) : (
                                <Infos />
                            )}
                        </Route>
                    );
                })}
                <Route path="/education">
                    <Education />
                </Route>
                <Route path="/business">
                    <Infos />
                </Route>
                <Route path="/psychology">
                    <Infos />
                </Route>
                <Route path="/world-history">
                    <Infos />
                </Route>
                <Route path="/philosophy">
                    <Infos />
                </Route>
                <Route path="/economics">
                    <Infos />
                </Route>
                <Route path="/statistics">
                    <Infos />
                </Route>
                <Route path="/interview">
                    <Interview />
                </Route>
                <Route path="/interviewtest">
                    <InterviewTest />
                </Route>
                <Route path="/test">
                    <Test />
                </Route>
                <Route path="/blog">
                    <Blog />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
