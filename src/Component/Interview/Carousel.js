import React, { useState } from "react";
import Img from "../../Img/article.png";
import "./Carousel.css";
import { CarouselData } from "./CarouselData.js";
import rightIcon from "../../Img/RightArrow.svg";
import leftIcon from "../../Img/LeftArrow.svg";
import ReactPlayer from "react-player";
const Carousel = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }
    return (
        <div className="big-container">
            <div className="carousel-container mt-60">
                <img
                    src={leftIcon}
                    className="left-arrow"
                    onClick={prevSlide}
                />
                <img
                    src={rightIcon}
                    className="right-arrow"
                    onClick={nextSlide}
                />

                {CarouselData.map((slide, index) => {
                    return (
                        <div
                            className={
                                index === current ? "slide active" : "slide"
                            }
                            key={index}
                        >
                            {index === current && (
                                <div className="vignette">
                                    <img
                                        src={slide.image}
                                        alt={slide.header}
                                        className="image"
                                    />

                                    {/* <ReactPlayer url="https://youtu.be/y2u_-QomGXU"/> */}
                                </div>
                            )}
                            <h2 className="car-title">{slide.header}</h2>
                            <h2 className="car-subtitle">{slide.subheader}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
