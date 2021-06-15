import { directive } from "@babel/types";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Lesson.scss";
const Lesson = ({ icon, name, path, elements, id }) => {
  const history = useHistory();
  const location = useLocation();
  return (
    <div
      className=" bradius-20 ma-20 flex-center pa-40"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <p className="h-50 fs-36 flex">
        <img className="h-50 w-50 mr-10" src={icon} alt=""></img>
        <div> {name} </div>
      </p>
      <div className="h-210 w100 flex-col justify-between mt-10">
        {elements?.map((el, index) => {
          console.log(el);
          return (
            <div className="flex flex-row items-center" key={index}>
              <div className="too">
                <p>{index + 1}</p>
              </div>
              {el}
            </div>
          );
        })}
      </div>
      <div className="w100 flex-center mt-20 mb-20">
        <div
          className="w-130 h-45 text-center bradius-10 b-secondary flex-center c-white pointer"
          onClick={() => history.push(location.pathname + "/" + id)}
        >
          Start learn
        </div>
      </div>
    </div>
  );
};

export default Lesson;