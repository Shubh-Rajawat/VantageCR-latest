import React from "react";
import VantageImage from "../../Assets/images/vantageServicesImg.png";
import absoluteimg from "../../Assets/images/aboutabsoluteimg.png";
import "./vantage.css";
import BaseUrl from "../BaseUrl";
import { Navigate } from "react-router-dom";
const VantageServices = ( { homeData } ) => {
  return (
    <div className="vantage-wrapper">
      <div className="vantage-content">
        <div className="vantage-image">
          <div className="imgparent-about">
            <img
              src={ `${ BaseUrl }${ homeData?.image }` }
              alt=" not found"
              className="img"
            />
          </div>
          { homeData?.backgroundImg && <img
            src={ `${ BaseUrl }${ homeData?.backgroundImg }` }
            alt="not found"
            className="absoluteImg2"
          /> }
        </div>
        <div className="vantage-text">
          <h1 className="innerh1">{ homeData?.heading }</h1>
          <h3>{ homeData?.subheading && homeData?.subheading }</h3>
          <p className="abpara"
            style={ { whiteSpace: "pre-line", textAlign: "left" } }
          >{ homeData?.description } </p>
          {/* <p className='abpara'>We attentively manage maintenance and repair service requests and provide regular insepctions of properties.</p> */ }
          <div className="action">
            { homeData?.service_read_more && (
              <button
                className="button btn-style"
                onClick={ () => {
                  Navigate( `${ homeData?.service_read_more }` );
                } }
              >
                Read More
              </button>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default VantageServices;
