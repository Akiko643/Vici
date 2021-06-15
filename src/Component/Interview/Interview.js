import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// import Carousel from "react-multi-carousel";
import Carousel from "./Carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselData } from "./CarouselData";
import Feed from "./Feed.js";
import "./Interview.css";
// import Feed from "./Feed";

const Interview = () => {
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
        <div>
            <Navbar />
            <Carousel slides={CarouselData} />;
            <Feed />
            <Footer />
        </div>
    );
};
export default Interview;
