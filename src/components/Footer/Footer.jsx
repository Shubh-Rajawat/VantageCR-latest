import React, { useEffect, useState } from "react";
import footerLogo from "../../Assets/images/footer-logo.png";
import callIcon from "../../Assets/images/call.png";
import addressIcon from "../../Assets/images/addressIcon.png";
import facebook from "../../Assets/images/facebook.png";
import twitter from "../../Assets/images/twitter.png";
import insta from "../../Assets/images/insta.png";
import linkdin from "../../Assets/images/linkdin.png";
import youtube from "../../Assets/images/youtube.png";
import Gplus from "../../Assets/images/Gplus.png";
import star from "../../Assets/images/star.png";
import pinterest from "../../Assets/images/pinterest.png";

import "./footer.css";
import { Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import BaseUrl from "../BaseUrl";
const Footer = () => {
  const [ footerData, setFooterData ] = useState( [] );
  useEffect( () => {
    axios
      .get( `${ BaseUrl }api/getfooter` )
      .then( ( res ) => {
        setFooterData( res?.data?.data[ 0 ] );
        // console.log( res.data.data[ 0 ], "footer" );
      } )
      .catch( ( error ) => {
        console.log( error );
      } );
  }, [] );
  return (
    <>
      { window.location.pathname === "/" ||
        window.location.pathname === "/contact" ? null : (
        <Divider
          style={ {
            margin: "0px",
          } }
        />
      ) }
      <div
        className="foot-wrap   "
        style={ {
          backgroundColor: "#F2EFF7",
        } }
      >
        <footer>
          <div className="footer mb-md-5">
            { footerData?.logo && (
              <div className="footer-logo">
                <img src={ `${ BaseUrl }${ footerData?.logo }` } alt="" />
              </div>
            ) }
            <div className="vantage-info">
              <div
                className="information px-1 d-lg-flex "
                style={ { gap: "10px" } }
              >
                { footerData?.contact && (
                  <div className="mob">
                    <img
                      src={ callIcon }
                      alt=""
                      className="icon circular-border"
                    />
                    <div
                      className="px-2"
                      dangerouslySetInnerHTML={ {
                        __html: footerData?.contact,
                      } }
                    ></div>
                  </div>
                ) }
                { footerData?.location && (
                  <div className="address ">
                    <img
                      src={ addressIcon }
                      alt=""
                      className="icon circular-border"
                    />
                    <div
                      className=" px-2"
                      dangerouslySetInnerHTML={ {
                        __html: footerData?.location,
                      } }
                    ></div>

                    {/* <span className="word-wrap px-2">
                      {footerData?.location}
                    </span> */}
                  </div>
                ) }
              </div>
            </div>

            <div className="social-links">
              { footerData?.links &&
                footerData?.links?.map( ( item, index ) => {
                  return (
                    <a key={ index } href={ item?.linkname } target="_blank">
                      <img
                        src={ `${ BaseUrl }${ item?.link_icon }` }
                        alt=""
                        style={ { height: "40px" } }
                      />
                    </a>
                  );
                } ) }
            </div>
          </div>
          <div className="copyright">
            Copyright: © 2023. All rights reserved
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
