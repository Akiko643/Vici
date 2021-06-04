import React from "react";
import defaultBgImage from "../../Img/INTERVIEW.png";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Carousel from "./Carousel";
// import Feed from "./Feed";

const Interview = () => {
    return (
        <div>
            <Navbar />
            <Carousel />
            {/* <Feed /> */}
            <Footer />
        </div>
    );
};
export default Interview;
