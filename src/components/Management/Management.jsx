import React, { useEffect, useState } from "react";
import "./management.css";
import Footer from "../Footer/Footer";
import WhiteNavbar from "../WhiteNavbar";
import axios from "axios";
import BaseUrl from "../BaseUrl";
import { Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Management = () => {
  // const menuId = useSelector((state) => state.menu.menuID);
  const menuId = localStorage.getItem( "navID" );
  const [ manageData, setManageData ] = useState( null );
  const [ seo, setSeo ] = useState( {
    title: "Vantage Commercial Realty",
    desc: "..."
  } );
  const [ loader, setloader ] = useState( false );
  const viewPageFeild = ( dataID ) => {
    axios
      .post( `${ BaseUrl }api/viewpagesfields`, {
        id: dataID,
      } )
      .then( ( res ) => {
        setManageData( res?.data?.data[ 0 ] );
        // console.log( "management", res?.data?.data );
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

    window.scrollTo( {
      top: 0,
      behavior: "smooth",
    } );
    // viewPageFeild( 2 );


  }, [] );
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
            backgroundImage: `url(${ BaseUrl }${ manageData?.banner_img })`,
          } }
        >
          <div className="banner-heading">
            <h1 className="bheading">
              { manageData?.page_title }
            </h1>
          </div>
        </div>
      </div>
      <div className="management-wrapper">
        { loader ? (
          <div className="loader">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="purple.700"
              size="xl"
            />
          </div>
        ) : (
          manageData?.content?.map( ( item, index ) => {
            return (
              <div className="management-wrapper-inner" key={ index }>
                <div className="management-heading row mx-auto">
                  <h1 className="text-center featurehead">
                    { item?.page_field_title }
                  </h1>
                  <p
                    className=" mt-0 mt-md-3"
                    style={ { color: "#5C727D", letterSpacing: ".7px" } }
                  >
                    { item?.page_field_description }
                  </p>
                </div>
                <div className="management-image">
                  <img
                    src={ `${ BaseUrl }${ item?.image }` }
                    alt="not found"
                    className="img-fluid"
                    style={ { width: "100%" } }
                  />
                </div>
              </div>
            );
          } )
        ) }
      </div >
      <Footer />
    </>
  );
};

export default Management;
