import React, { useEffect, useState } from "react";

import "./home.css";

import Navbar from "../Navbar";
import AboutShort from "../AboutShort/AboutShort";
import FeaturedProperties from "../featured/FeaturedProperties";
import VantageServices from "../VantageServices/VantageServices";
import Footer from "../Footer/Footer";
import AskAnAgent from "../ask_an_agent/AskAnAgent";
import axios from "axios";
import BaseUrl from "../BaseUrl";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

const Home = () => {
  // const menuId = useSelector((state) => state.menu.menuID);
  const [ homeData, sethomeData ] = useState();
  const menuId = localStorage.getItem( "navID" );
  const [ seo, setSeo ] = useState( {
    title: "Vantage Commercial Realty",
    desc: "..."
  } );

  const viewPageFeild = ( dataID ) => {
    axios
      .post( `${ BaseUrl }api/homepagedata`, {
        id: dataID,
      } )
      .then( ( res ) => {
        sethomeData( res?.data?.data[ 0 ] );
        setSeo( {
          title: res.data?.data[ 0 ]?.seo_title,
          desc: res.data?.data[ 0 ]?.seo_description
        } )
        // console.log( "home", res?.data?.data );
      } )
      .catch( ( err ) => { } );
  };

  const getAllMenu = ( newSlug ) => {
    axios
      .get( `${ BaseUrl }api/getmenu` )
      .then( ( res ) => {
        const newMenuIDData = res?.data?.allmenu.filter( ( data ) => {
          return data.Slug === `${ newSlug }`;
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
    getAllMenu( "/" );
    // viewPageFeild( 1 );

  }, [] );

  return (
    <div className="home-wrapper">
      <Helmet>
        <title>{ seo.title }</title>
        <meta name="description" content={ seo.desc } />
      </Helmet>
      <div className="banner">
        <video
          id="vid"
          src={ `${ BaseUrl }${ homeData?.banner_video }` }
          loop
          muted
          autoPlay
          playsInline
          className="bgVideo"
        />
        <div className="overlay"></div>
        <Navbar background="transparent" />
        <div className="banner-text">
          {/* <div className="heading home-banner-heading">
                        <h1 className='bheading'>Vantage <br /> Commercial Reality</h1>
                        <p className='bpara' >Lorem Ipsum is simply dummy text of the printing and <br />
                        typesetting industry.</p>
          </div> */}
        </div>
      </div>
      <AboutShort homeData={ homeData && homeData?.content[ 0 ] } />
      <FeaturedProperties />
      <VantageServices homeData={ homeData && homeData?.content[ 1 ] } />
      <AskAnAgent />
      <Footer />
    </div>
  );
};

export default Home;
