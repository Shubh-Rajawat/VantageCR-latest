import React, { useEffect, useState } from "react";
import arrowRight from "../../Assets/images/Mask group.png";
import recentsimg from "../../Assets/images/recentsimg.png";
import { Link } from "react-router-dom";
// import {Tabs,TabList,TabPanels,Tab,TabPanel,TabIndicator,} from "@chakra-ui/react";
import Footer from "../Footer/Footer";
import WhiteNavbar from "../WhiteNavbar";
import axios from "axios";
import BaseUrl from "../BaseUrl";
import { Spinner } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import noImageFound from "../../Assets/images/no-image-svgrepo-com.svg"
import { Helmet } from "react-helmet";
const Recents = () => {
  const [ recents, setRecents ] = useState( [] );
  const [ loader, setLoader ] = useState( false );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ recentPageData, setRecentPageData ] = useState()
  const [ seo, setSeo ] = useState( {
    title: "Vantage Commercial Realty",
    desc: "Recent properties "
  } );

  let pageCount = 1;
  // api to fetch recent page data
  const viewPageFeild = ( slug ) => {
    axios
      .post( `${ BaseUrl }api/getallpage` )
      .then( ( res ) => {
        const newMenuIDData = res?.data?.data.filter( ( data ) => {
          return data.Slug === `/${ slug }`;
        } );

        console.log( "recents", res?.data?.data, newMenuIDData )
        setRecentPageData( newMenuIDData[ 0 ] );
        localStorage.setItem( "navID", newMenuIDData && newMenuIDData[ 0 ]?.id );
        setSeo( {
          title: newMenuIDData[ 0 ]?.seo_title,
          desc: newMenuIDData[ 0 ]?.seo_description
        } );
      } )
      .catch( ( err ) => { } );
  };
  useEffect( () => {
    const str = window.location.pathname;
    const words = str.split( "/" );
    const FinalWord = words[ words.length - 1 ];
    viewPageFeild( FinalWord );

    window.scrollTo( {
      top: 0,
      behavior: "smooth",
    } );


    // api for properties
    setLoader( true );
    axios
      .get(
        `${ BaseUrl }api/recentproperty?page=${ pageCount === 0 ? 1 : pageCount }`
      )
      .then( ( res ) => {
        if ( res?.data?.status === false ) {
          setRecents( false );
          setLoader( false );
        } else {
          setRecents( res?.data?.data );
          setLoader( false );
        }
      } )
      .then( ( error ) => { } );
  }, [] );

  let postPerPage = 9;
  pageCount = Math.ceil( recents?.length / postPerPage );
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPageData = recents?.slice( indexOfFirstPost, indexOfLastPost );

  const handleChange = ( e, value ) => {
    setCurrentPage( value );
  };
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
          style={ { backgroundImage: `url(${ BaseUrl }${ recentPageData?.banner_img })` } }
        >
          <div className="banner-heading">
            <h1 className="bheading">{ recentPageData?.page_title }</h1>
          </div>
        </div>
      </div>
      <div className="featured-wrapper container-fluid ">
        {/* <img src={reactangle} alt="featured" /> */ }
        <div className="featured-main">
          <div className="row mb-4">
            <div className="featured-heading ">
              <h1 className="text-center featurehead">
                { recents ? `${ recents?.length } Properties Found` : "" }
              </h1>
            </div>
          </div>
          <div className="row gap-18">
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
            ) : recents ? (
              recents?.map( ( item, index ) => {
                return (
                  <div
                    className="col-xl-4  col-lg-4 col-md-6 col-sm-12 "
                    key={ index }
                  >
                    <div className="box px-lg-3 px-xl-0"
                      style={ item?.categoryName == "sold" || item?.categoryName == "Sold" || item?.categoryName == "leased" || item?.categoryName == "Leased" ?
                        {
                          backgroundColor: "lightpink",
                          overflow: "hidden",
                        } :
                        {
                          overflow: "hidden",
                        }
                      }
                    >
                      <div
                        className="box-inner px-xl-3"
                        style={ {
                          borderRadius: "20px",
                          // height: "270px",
                          // overflow: "hidden",
                          // maxWidth: "340px",
                        } }
                      >  { item?.categoryName == "sold" || item?.categoryName == "Sold" || item?.categoryName == "leased" || item?.categoryName == "Leased" ? <div className="featured-badge">
                        <span style={ { textTransform: "uppercase" } }>
                          { item?.categoryName }
                        </span>
                      </div> : null }
                        <Link to={ `/property/${ item?.id }` }>
                          { item?.featureImg ? <img
                            // style={{ height: "100%", width: "100%" }}
                            src={ `${ BaseUrl }${ item?.featureImg }` }
                            alt
                            className="box-image img-fluid "
                          /> : <img
                            style={ { width: "170px" } }
                            src={ noImageFound }
                            alt
                            width={ `100px` }
                            className="box-image  "
                          /> }
                        </Link>
                      </div>
                      <div className="" style={ { width: "100%" } }>
                        <div className="featured-address">
                          <Link to={ `/property/${ item?.id }` }>
                            <h4 className="landmark">{ item?.name }</h4>
                          </Link>
                          <Text noOfLines={ 1 } className="address">
                            { item?.address }
                          </Text>
                          <p>
                            <Link
                              to={ `/property/${ item?.id }` }
                              className="link-red"
                            >
                              View Property
                              <span className="ms-2">
                                <img src={ arrowRight } alt="not found" />
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } )
            ) : (
              <div
                className="my-4"
                style={ {
                  display: "grid",
                  placeItems: "center",
                  fontWeight: "500",
                } }
              >
                <h2>No Properties Found</h2>
              </div>
            ) }
          </div>
          <div className="row"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Recents;
