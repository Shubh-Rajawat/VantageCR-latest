import React, { useEffect, useState } from "react";
import WhiteNavbar from "../WhiteNavbar";
import Footer from "../Footer/Footer";
import "./singleproperty.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import fb from "../../Assets/images/fb.svg";
import twitter from "../../Assets/images/twitr.svg";
import gplus from "../../Assets/images/goglep.svg";
import linkedin from "../../Assets/images/linkedin.svg";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

import BaseUrl from "../BaseUrl";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  TabIndicator,
  Divider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { Modal, Button } from "react-bootstrap";
const SingleProperty = () => {
  const { id } = useParams();
  const [ snglPropertyData, setSnglPropertyData ] = useState( [] );
  useEffect( () => {
    window.scrollTo( {
      top: 0,
      behavior: "smooth",
    } );
    axios.get( `${ BaseUrl }api/singleproperty/${ id }` ).then( ( res ) => {
      setSnglPropertyData( res?.data?.data );
      // console.log( "hello", res?.data?.data );
    } ).catch( ( err ) => { console.log( err ) } )
      ;
  }, [] );

  const gallary = snglPropertyData && snglPropertyData?.gallery?.split( "," );

  // const [ show, setShow ] = useState( false );

  // const handleClose = () => setShow( false );
  // const handleShow = () => setShow( true );
  // console.log("360", snglPropertyData?.image_360);
  // const createMarkup = () => {
  //   return { __html: snglPropertyData?.map };
  // };
  return (
    <>
      <WhiteNavbar />
      <div className="single-wrapper container-fluid mx-auto ">
        <div className="single-info row m-0 p-0">
          <div className="image  col-md-7 col-lg-6 p-0">
            <Tabs isFitted colorScheme="#EFEAF4" variant="soft-rounded">
              <TabList style={ { backgroundColor: "#EFEAF4" } }>
                { snglPropertyData?.featureImg && (
                  <Tab _selected={ { color: "white", bg: "#5D2F91" } }>MAIN</Tab>
                ) }
                { snglPropertyData?.gallery && (
                  <Tab _selected={ { color: "white", bg: "#5D2F91" } }>
                    PHOTOS
                  </Tab>
                ) }
                { snglPropertyData?.map && (
                  <Tab _selected={ { color: "white", bg: "#5D2F91" } }>MAP</Tab>
                ) }
                { snglPropertyData?.image_360 && (
                  <Tab _selected={ { color: "white", bg: "#5D2F91" } }>
                    360&deg;
                  </Tab>
                ) }
              </TabList>
              {/* <TabIndicator mt="-1.5px" height="2.5px" borderRadius="80px" /> */ }
              <TabPanels className="mt-2">
                { snglPropertyData?.featureImg && (
                  <TabPanel>
                    <img
                      src={ `${ BaseUrl }${ snglPropertyData?.featureImg }` }
                      alt=""
                      style={ { width: "100%" } }
                    />
                  </TabPanel>
                ) }
                { snglPropertyData?.gallery && (
                  <TabPanel>
                    { snglPropertyData?.gallery?.length ? (
                      <Carousel autoPlay interval={ 1000 } infiniteLoop>
                        { snglPropertyData &&
                          gallary?.map( ( item, i ) => {
                            return (
                              <div key={ i }>
                                <img src={ `${ BaseUrl }${ item }` } alt="" />
                              </div>
                            );
                          } ) }
                      </Carousel>
                    ) : (
                      <div>
                        <h4 className="text-center">No Photos Found</h4>
                      </div>
                    ) }
                  </TabPanel>
                ) }
                { snglPropertyData?.map && (
                  <TabPanel>
                    { snglPropertyData?.map ? (
                      <div
                        dangerouslySetInnerHTML={ {
                          __html: snglPropertyData?.map,
                        } }
                        className="property-map"
                      ></div>
                    ) : (
                      <div
                        className="my-4"
                        style={ {
                          display: "grid",
                          placeItems: "center",
                          fontWeight: "500",
                        } }
                      >
                        <h2>No Map Found</h2>
                      </div>
                    ) }
                  </TabPanel>
                ) }
                { snglPropertyData?.image_360 && (
                  <TabPanel id="mapIframe" >
                    <iframe
                      id="iframe"
                      src={ `${ snglPropertyData?.image_360 }` }
                      frameborder="0"
                      style={ {
                        height: "450px",
                      } }
                    ></iframe>
                  </TabPanel>
                ) }
              </TabPanels>
            </Tabs>
          </div>
          <div className="about-property  col-md-5 col-lg-6 d-flex align-items-start mt-md-5 pt-md-3 mt-md-0">
            <div className="lh-lg ms-xl-5 ms-md-2 ms-0 ">
              <div className="my-2 mb-2">
                <h2 className="_32px500 _414142">{ snglPropertyData?.name }</h2>
                <Text noOfLines={ 1 } className="_5C727D">
                  { snglPropertyData?.address }
                </Text>
              </div>
              <div className="">
                <span
                  className="fw-bold"
                  style={ { color: "#5D2F91", fontSize: "22px" } }
                >
                  Price :&nbsp;
                </span>
                <span
                  className="fw-bold"
                  style={ { color: "#5D2F91", fontSize: "22px" } }
                >
                  { snglPropertyData?.price }
                </span>
              </div>

              { snglPropertyData?.download_flyer ||
                snglPropertyData?.property_video ||
                snglPropertyData?.video_link ? (
                <Divider />
              ) : (
                ""
              ) }
              <div className="download-flyer my-3">
                { snglPropertyData?.download_flyer && (
                  <a
                    href={ `${ BaseUrl }${ snglPropertyData?.download_flyer }` }
                    download
                    target="_blank"
                    className="me-3 btn border"
                  >
                    Download Flyer
                  </a>
                ) }
                { snglPropertyData?.property_video && (
                  <a
                    href={ `${ BaseUrl }${ snglPropertyData?.property_video }` }
                    target="_blank"
                    className="me-3 btn border"
                  >
                    Video
                  </a>
                ) }
                { snglPropertyData?.video_link && (
                  <a
                    href={ `${ snglPropertyData?.video_link }` }
                    target="_blank"
                    className="me-3 btn border"
                  >
                    <i className="fa-solid fa-play pointer text-white mx-1"></i>
                  </a>
                ) }
              </div>
              { snglPropertyData?.download_flyer ||
                snglPropertyData?.property_video ||
                snglPropertyData?.video_link ? (
                <Divider />
              ) : (
                ""
              ) }
              <h3 className="_30px500 _414142 my-2">Property Details</h3>

              <span className="key 18px600 414142">Property Type: </span>
              <span className="value _18px400 ">
                { " " }
                { snglPropertyData?.propertytypeName }
              </span>
              <br />

              <span className="key 18px600 414142">Agent: </span>
              <span className="value _18px400 ">
                { " " }
                { snglPropertyData?.ourteamName }
              </span>
              <br />

              <span className="key 18px600 414142">Email: </span>
              <a
                className="value _18px400 text-decoration-underline "
                href={ `mailto:${ snglPropertyData?.ourteamEmail }` }
              >
                { snglPropertyData?.ourteamEmail }
              </a>
              <br />

              <span className="key 18px600 414142">Phone: </span>
              <span className="value _18px400 ">
                { snglPropertyData?.ourteamphone }
              </span>
              <br />

              <span className="key 18px600 414142">Mobile: </span>
              <span className="value _18px400 ">
                { snglPropertyData?.ourteamMobile }
              </span>
              <br />
              <div className=" d-flex align-items-center flex-wrap">
                <div className="buttons d-flex my-3 mt-4 ">
                  <div className=" me-2">
                    <button
                      className="button-property px-5 py-1"
                      onClick={ () => {
                        window.print();
                      } }
                    >
                      Print
                    </button>
                  </div>
                  <div className=" me-2">
                    {/* <button
                      className="button-property px-5 py-1"
                      onClick={ handleShow }
                    >
                      Share
                    </button> */}
                    <EmailShareButton subject={ `In context of ${ snglPropertyData?.name }` } className="button-property px-5 py-1">
                      Share
                    </EmailShareButton>
                  </div>
                </div>
                <div className="share d-flex gap-2  mt-2">
                  {/* { snglPropertyData?.facebook && (
                    <a href={ snglPropertyData?.facebook } target="_blank">
                      
                      <img src={ fb } alt="" />
                    </a>
                  ) }

                  { snglPropertyData?.tiwiter && (
                    <a href={ snglPropertyData?.tiwiter } target="_blank">
                      
                      <img src={ twitter } alt="" />
                    </a>
                  ) }
                  { snglPropertyData?.googlePlus && (
                    <a href={ snglPropertyData?.googlePlus } target="_blank">
                      
                      <img src={ gplus } alt="" />
                    </a>
                  ) } */}

                  { snglPropertyData?.linkedin && (
                    <a href={ snglPropertyData?.linkedin } target="_blank" className="pointer">
                      <img src={ linkedin } alt="" style={ { height: "36px" } } />
                    </a>
                  ) }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row border rounded-3 bg-light py-md-4 py-3 px-2 px-md-4 mt-3">
          <div className="">
            { snglPropertyData?.description && (
              <h4 className=" fw-bold">Property Description:</h4>
            ) }
            <div
              dangerouslySetInnerHTML={ {
                __html: snglPropertyData?.description,
              } }
            ></div>
          </div>
        </div>
      </div>
      {/* <Modal show={ show } onHide={ handleClose } centered>
        <Modal.Header closeButton>
          <Modal.Title>Share Links</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-end">
            <FacebookShareButton url={ window.location.href }>
              <i className="fa-brands fa-square-facebook fa-2xl purple-icon"></i>
            </FacebookShareButton>
            <TwitterShareButton url={ window.location.href } className="mx-4">
              <i className="fa-brands fa-square-twitter fa-2xl  purple-icon"></i>
            </TwitterShareButton>
            <WhatsappShareButton url={ window.location.href }>
              <i className="fa-brands fa-square-whatsapp fa-2xl purple-icon"></i>
            </WhatsappShareButton>
            <EmailShareButton subject={ `In context of ${ snglPropertyData?.name }` } className="mx-4"
            >
              <i className="fa-solid fa-envelope text-white "
                style={ {
                  border: "2px solid #5d2f91",
                  padding: "5px 5px 3px 5px",
                  borderRadius: "4px",
                  backgroundColor: "#5d2f91"
                } }
              ></i>
            </EmailShareButton>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal> */}
      <div className="">
        <Footer />
      </div>
    </>
  );
};

export default SingleProperty;


{/* <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com."
  title="Share by Email">
  <img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png">
</a> */}