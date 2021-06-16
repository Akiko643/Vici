import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import Carousel from "react-multi-carousel";
import Carousel from "./Carousel";
import { Switch, Route } from 'react-router'
import "react-multi-carousel/lib/styles.css";
import { CarouselData } from "./CarouselData";
import Feed from "./Feed.js";
import "./Interview.css";
import { useRouteMatch } from "react-router-dom";
import { InterviewTest } from "./InterviewBlog/InterviewTest";
// import Feed from "./Feed";

const Interview = () => {
    const match = useRouteMatch();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 2, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 2, // optional, default to 1.
        },
    };
    return (
        <>
            <Switch>
                <Route path={`${match.path}/:interviewId`}>
                    <InterviewTest />
                </Route>
                <Route path={`${match.path}`}>
                    <Navbar />
                    <Carousel slides={CarouselData} />
                    <Feed />
                    <Footer />
                </Route>
            </Switch>
        </>
    );
};
export default Interview;
