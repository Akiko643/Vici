import React, { useContext, useState, useEffect } from "react";
import Lesson from "./Lesson";
import img from "../../Img/oceans2.png";
import "./education.scss";
import { Info } from "./Info";
import { Switch, Route } from "react-router-dom";
import { useCol, useDoc } from "../../Hooks/firebase";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import { Context } from "../../Providers/contentProvider";
export const Education = () => {
  const { t } = useTranslation();
  const { language } = useContext(Context);
  const { data } = useCol("content/contents/Education/", language, true);
  const [mobile, setMobile] = useState(false);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1200, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  window.addEventListener("resize", () => {
    if (900 < window.innerWidth) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  });
  useEffect(() => {
    if (900 < window.innerWidth) {
      setMobile(false);
    } else {
      setMobile(true);
    }
  }, []);
  return (
    <>
      <Switch>
        <Route exact path="/education">
          <div
            className="h-150 w100 c-white pr"
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="bottom-10 fs-48 absolute uppercase edutxt">
              {t("education")}
            </div>
          </div>
          <div className="w100 ph-30 pv-70 educations">
            {mobile ? (
              data &&
              data?.map((dt, index) => {
                return (
                  <Lesson
                    icon={dt?.image}
                    name={dt?.name}
                    elements={dt?.questions}
                    id={dt?.id}
                    key={index}
                  />
                );
              })
            ) : (
              <Carousel
                swipeable={true}
                arrows={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                keyBoardControl={true}
                containerClass="carousel-container h-475 justify-normal"
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {data &&
                  data?.map((dt, index) => {
                    return (
                      <Lesson
                        icon={dt?.image}
                        name={dt?.name}
                        elements={dt?.questions}
                        id={dt?.id}
                        key={index}
                      />
                    );
                  })}
              </Carousel>
            )}
          </div>
        </Route>
        {data &&
          data?.map((dt, index) => {
            return (
              <Route exact path={"/education/" + dt?.id}>
                <Info
                  id={dt?.id}
                  // chapters={dt?.chapters}
                  key={index}
                  name={dt?.name}
                />
              </Route>
            );
          })}
      </Switch>
    </>
  );
};
