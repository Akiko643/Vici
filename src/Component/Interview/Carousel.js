import React, { useState } from "react";
import Img from "../../Img/article.png";
import "./Carousel.css";
import rightIcon from "../../Img/RightArrow.svg";
import leftIcon from "../../Img/LeftArrow.svg";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
const Carousel = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
    const history = useHistory();
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
        <div className="big-container ">
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

                {slides.map((slide, index) => {
                    return (
                        <div
                            className={
                                index === current ? "slide active" : "slide"
                            }
                            onClick={() => {
                                history.push(`/interview/${slide.id}`); 
                                window.scroll({
                                    top: 0,
                                    left: 0,
                                    behavior: 'smooth'
                                });
                            }}
                            key={index}
                        >
                            {index === current && (
                                <div className="vignette">
                                    <img
                                        src={slide?.image}
                                        alt={slide?.header}
                                        className="image"
                                    />

                                    {/* <ReactPlayer url="https://youtu.be/y2u_-QomGXU"/> */}
                                </div>
                            )}
                            <h2 className="car-title">{slide?.header}</h2>
                            <h2 className="car-subtitle">{slide?.subheader}</h2>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
