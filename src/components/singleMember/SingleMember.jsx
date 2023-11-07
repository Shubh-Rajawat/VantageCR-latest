import React, { useEffect, useState } from "react";
import WhiteNavbar from "../WhiteNavbar";
import banner from "../../Assets/images/singlemember.png";
import mem from "../../Assets/images/mem1.png";
import fb from "../../Assets/images/fb.svg";
import twitter from "../../Assets/images/twitr.svg";
import skype from "../../Assets/images/skype.svg";
import "./singlemember.css";
import user from "../../Assets/images/default.png";
import AskAnAgent from "../ask_an_agent/AskAnAgent";
import { useLocation, useParams } from "react-router-dom";
import BaseUrl from "../BaseUrl";
import axios from "axios";
import MemberContact from "./MemberContact";
const SingleMember = () => {
  const { Tid } = useParams();

  const [ memData, setMemData ] = useState();
  useEffect( () => {
    window.scrollTo( {
      top: 0,
      behavior: "smooth",
    } );
    axios
      .get( `${ BaseUrl }api/getallourteam` )
      .then( ( res ) => {
        console.log( "res", res );

        const singlmem = res?.data?.data?.filter( ( item ) => {
          return item?.name.replace( ' ', '' ).toLowerCase() == Tid;
        } );
        setMemData( singlmem && singlmem[ 0 ] );
      } )
      .catch( ( error ) => console.log( error ) );
  }, [] );
  return (
    <div className="single-member-banner">
      <WhiteNavbar />
      <div
        className="banner-content"
        // style={{
        //   backgroundImage: `url(${BaseUrl}${
        //     ourTeamData?.banner_img && ourTeamData?.banner_img
        //   })`,
        // }}
        style={ {
          backgroundImage: `url(${ banner })`,
        } }
      >
        <div className="banner-heading">
          <h1 className="bheading">{ memData?.name && memData?.name }</h1>
        </div>
      </div>
      <div className="single-member-wrapper container-fluid">
        <div className="single-member-inner">
          <div className="single-member-main">
            <div
              className="row mx-auto   my-5"
              style={ { maxWidth: "1129px" } }
            >
              <div className="mx-auto col-md-6 ">
                <div className=" mx-auto single-mem-img">
                  { memData?.image ? (
                    <img
                      src={ `${ BaseUrl }${ memData?.image && memData?.image }` }
                      alt=""
                      className="mx-auto rounded-5"
                    />
                  ) : (
                    <img
                      src={ user }
                      alt="not found"
                      className="our-image-profile rounded-5 mx-auto"
                    />
                  ) }
                </div>
              </div>
              <div className="col-md-6 my-4 my-md-1 text-md-start text-center pt-md-5">
                <div className="">
                  <h2 className="mem-name  text-md-start text-center">
                    { memData?.name && memData?.name }
                  </h2>
                  <p className="designation text-md-start text-center mb-md-5 mb-3">
                    { memData?.position && memData?.position }
                  </p>
                  <div className="">
                    <h4 className="contact-info ">Contact Information</h4>
                    <div className="">
                      { memData?.phone && (
                        <p>
                          <span className="info-left  ">Phone :</span>
                          <span className="info-right ms-1 ">
                            { memData?.phone }
                          </span>
                        </p>
                      ) }
                      { memData?.mobile && (
                        <p>
                          <span className="info-left  ">Mobile :</span>
                          <span className="info-right ms-1">
                            { memData?.mobile }
                          </span>
                        </p>
                      ) }
                      { memData?.email && (
                        <p>
                          <span className="info-left  ">Email :</span>

                          <a
                            className=" text-decoration-underline ms-1"
                            href={ `mailto:${ memData?.email }` }
                          >
                            <span className="info-right ">
                              { memData?.email }
                            </span>
                          </a>
                        </p>
                      ) }
                    </div>
                  </div>
                  { memData?.about && (
                    <>
                      <h2 className="mem-desc">Description</h2>
                      <p className="desc-main">{ memData?.about }</p>
                    </>
                  ) }
                  <div className="d-flex justify-content-md-start justify-content-center">
                    { memData?.facebook && (
                      <a href={ memData?.facebook } target="_blank">
                        <img src={ fb } alt="" className="pointer" />
                      </a>
                    ) }
                    { memData?.twitter && (
                      <a href={ memData?.twitter } target="_blank" className="linkedIn">
                        <i className="fa-brands fa-linkedin-in"></i>
                      </a>
                    ) }
                    { memData?.skype && (
                      <a href={ memData?.skype } target="_blank">
                        <img src={ skype } alt="" className="pointer" />
                      </a>
                    ) }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MemberContact agentemail={ memData?.email } />
        </div>
      </div>
    </div>
  );
};

export default SingleMember;
