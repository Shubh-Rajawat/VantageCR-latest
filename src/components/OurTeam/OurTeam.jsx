import React, { useEffect, useState } from "react";
import "./ourTeam.css";
// import banner from "../../Assets/images/ourTeamBanner.png";
import facebook from "../../Assets/images/facebook1.png";
import twitter from "../../Assets/images/twitter1.png";
import linkedin from "../../Assets/images/linkedin.svg";
import skype from "../../Assets/images/skype1.png";
import user from "../../Assets/images/default.png";

import Footer from "../Footer/Footer";
import WhiteNavbar from "../WhiteNavbar";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import axios from "axios";
import BaseUrl from "../BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const OurTeam = () => {
  const [ ourTeamData, setOurTeamData ] = useState();
  const navigate = useNavigate();
  const [ ourTeamMemberData, setourTeamMemberData ] = useState( [] );
  const [ seo, setSeo ] = useState( {
    title: "Vantage Commercial Realty",
    desc: "..."
  } );
  const viewPageFeild = ( dataID ) => {
    axios
      .post( `${ BaseUrl }api/viewpagesfields`, {
        id: dataID,
      } )
      .then( ( res ) => {
        setOurTeamData( res?.data?.data[ 0 ] );
        // console.log( "outtesma", res?.data?.data[ 0 ] );
        setSeo( {
          title: res.data?.data[ 0 ]?.seo_title,
          desc: res.data?.data[ 0 ]?.seo_description
        } );
      } )
      .catch( ( err ) => { } );
  };

  const getAllMenu = ( newSlug ) => {
    axios
      .get( `${ BaseUrl }api/getmenu` )
      .then( ( res ) => {
        const newMenuIDData = res?.data?.allmenu.filter( ( data ) => {
          return data.Slug === `/${ newSlug }`;
        } );
        localStorage.setItem( "navID", newMenuIDData && newMenuIDData[ 0 ]?.id );
        viewPageFeild( newMenuIDData[ 0 ]?.id );
      } )
      .catch( ( err ) => { } );
  };

  useEffect( () => {
    const str = window.location.pathname;
    const words = str.split( "/" );
    const FinalWord = words[ words.length - 1 ];
    getAllMenu( FinalWord );
    // // our team data
    axios
      .get( `${ BaseUrl }api/getallourteam` )
      .then( ( res ) => {
        setourTeamMemberData( res?.data?.data );
      } )
      .catch( ( error ) => console.log( error ) );
    // viewPageFeild( 5 );
  }, [] );

  // out team modal
  const [ description, setDescription ] = useState( { name: "", desc: "" } );
  const [ show, setShow ] = useState( false );

  const handleClose = () => setShow( false );
  const handleShow = () => setShow( true );
  // console.log( description, "descksjdf" );
  return (
    <>
      <Helmet>
        <title>{ seo.title }</title>
        <meta name="description" content={ seo.desc } />
      </Helmet>
      <div className="about-banner">
        <WhiteNavbar />
        <div
          className="banner-content"
          style={ {
            backgroundImage: `url(${ BaseUrl }${ ourTeamData?.banner_img && ourTeamData?.banner_img
              })`,
          } }
        >
          <div className="banner-heading">
            <h1 className="bheading">
              { ourTeamData?.page_title && ourTeamData?.page_title }
            </h1>
          </div>
        </div>
      </div>
      <div className="our-team-wrapper container-fluid ">
        <div className="our-team-inner">
          <div className="our-main">
            { ourTeamData?.content &&
              ourTeamData?.content?.map( ( item, i ) => {
                return (
                  <div className="row my-5 py-5">
                    <div className="col-md-7 mp-0 px-2">
                      <div className="our-team-heading pe-md-4 pe-0">
                        <h1
                          style={ { color: "#868484" } }
                          className="featurehead"
                        >
                          { item?.page_field_title && item?.page_field_title }
                        </h1>
                        <p
                          style={ { color: "#5C727D", whiteSpace: "pre-line" } }
                          className="my-2 my-md-0 _18px400"
                        >
                          { item?.page_field_description &&
                            item?.page_field_description }
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5 mp-0 mt-3 mt-md-0">
                      { item?.image && (
                        <img
                          src={ `${ BaseUrl }${ item?.image }` }
                          alt="img"
                          className="mx-auto rounded"
                        />
                      ) }
                    </div>
                  </div>
                );
              } ) }
            <div className="row  outTeam-row d-flex justify-content-start">
              { ourTeamMemberData &&
                ourTeamMemberData.map( ( res, index ) => {
                  return (
                    <div
                      className="col-xl-3  col-md-4 col-sm-6 mp-0"
                      key={ index }
                    >
                      <div className="our-member">
                        <div className="our-image forOurImage">
                          { res?.image ? (
                            <Link to={ `/ourteam/${ res?.name.replace( ' ', '' ).toLowerCase() }` }>
                              <img
                                src={ `${ BaseUrl }${ res?.image }` }
                                alt="not found"
                                className="our-image-profile pointer rounded-4"
                              // onClick={ () => {
                              //   navigate( `/ourteam/${ res?.id }`, {
                              //     state: {
                              //       data: res
                              //     }
                              //   } );
                              // } }
                              />
                            </Link>
                          ) : (
                            <Link to={ `/ourteam/${ res?.name.replace( ' ', '' ).toLowerCase() }` }>
                              <img
                                src={ user }
                                alt="not found"
                                className="our-image-profile"
                              />
                            </Link>
                          ) }
                          <div className="our-links mb-2">
                            <div
                              style={ {
                                display: "flex",
                                justifyContent: "center",
                              } }
                            >
                              { res?.skype && (
                                <a href={ res?.skype } target="_blank">
                                  <img
                                    src={ skype }
                                    alt="skype"
                                    className=" pointer"
                                  />
                                </a>
                              ) }
                              { res?.facebook && (
                                <a href={ res?.facebook } target="_blank">
                                  <img
                                    src={ facebook }
                                    alt="facebook"
                                    className="mx-2 pointer"
                                  />
                                </a>
                              ) }
                              { res?.twitter && (
                                <a href={ res?.twitter } target="_blank" className="text-decoration-none">
                                  <i className="fa-brands fa-linkedin-in bg-white p-1 rounded-1 fs-5"></i>
                                </a>
                              ) }
                            </div>
                          </div>
                        </div>
                        <h4
                          className="member-name text-center mt-2 pointer"
                        // onClick={ () => {
                        //   navigate( `/ourteam/${ res?.id }`, {
                        //     state: {
                        //       data: res
                        //     }
                        //   } );
                        // } }
                        >
                          { res.name }
                        </h4>
                        <p className="designation text-center">
                          { res.position }
                        </p>
                      </div>
                    </div>
                  );
                } ) }
            </div>
            {/* <Modal show={ show } onHide={ handleClose } centered>
              <Modal.Header closeButton>
                <Modal.Title> { description?.name } </Modal.Title>
              </Modal.Header>
              <Modal.Body>{ description?.desc && description?.desc }</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={ handleClose }>
                  Close
                </Button>
              </Modal.Footer>
            </Modal> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OurTeam;
