import React from "react";
import absoluteimg from "../../Assets/images/aboutabsoluteimg.png";
import "./aboutshort.css";
import { useNavigate } from "react-router-dom";
import BaseUrl from "../BaseUrl";

const About = ( { homeData } ) => {
  const navigate = useNavigate();

  return (
    <div className="about-wrapper my-5">
      <div className="content">
        <div className="text">
          <h1 className="innerh1">{ homeData?.heading }</h1>
          <h3>{ homeData?.subheading }</h3>
          <p className="abpara"
            style={ { whiteSpace: "pre-line", textAlign: "left" } }
          >{ homeData?.description } </p>
          <div className="action">
            { (
              <button
                className="button"
                onClick={ () => {
                  navigate( `${ "/about" }` );
                } }
              >
                Read More
              </button>
            ) }
          </div>
        </div>
        <div className="image">
          <div className="imgparent-about">
            <img
              src={ `${ BaseUrl }${ homeData?.image }` }
              alt=""
              className="img"
            />
          </div>
          { homeData?.backgroundImg && <img
            src={ `${ BaseUrl }${ homeData?.backgroundImg }` }
            alt=""
            className="absoluteImg"
          /> }
        </div>
      </div>
    </div>
  );
};

export default About;
