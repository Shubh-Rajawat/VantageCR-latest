import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./featured.css";
import arrowRight from "../../Assets/images/Mask group.png";
import { Link } from "react-router-dom";
import { Pagination } from "@material-ui/lab";
import { Tabs, TabList, Tab, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import BaseUrl from "../BaseUrl";
import noImageFound from "../../Assets/images/no-image-svgrepo-com.svg"

const FeaturedProperties = () => {
  const [ featured, setFeatured ] = useState( [] );
  const [ loader, setLoader ] = useState( false );
  const [ category, setcategory ] = useState( {
    id: "",
    name: "All",
  } );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ categoriesList, setCategoriesList ] = useState();

  useEffect( () => {
    axios
      .get( `${ BaseUrl }api/getallcategory` )
      .then( ( res ) => {
        setCategoriesList( res?.data?.data );
      } )
      .catch( ( err ) => { } );
  }, [] );

  // useEffect for properties //
  let pageCount = 1;
  useEffect( () => {
    // console.log( category?.name )
    setLoader( true );
    axios
      .post( `${ BaseUrl }api/fetchAllpropertyBycategoryId?page=${ currentPage }`, {
        category_id: category?.id,
      } )
      .then( ( res ) => {
        // if ( res?.data?.success === false ) {
        //   setFeatured( false )
        //   setLoader( false );
        // } else {
        // console.log("deb", res);
        setFeatured( res?.data );
        setLoader( false );
        // }
      } )
      .catch( ( error ) => {
        console.log( error );
      } );
  }, [ category, currentPage ] );
  let postPerPage = 9;
  pageCount = Math.ceil( featured?.totaldata / postPerPage );
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPageData = featured?.data?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const targetElementRef = useRef( null );

  const handleChange = ( e, value ) => {
    const targetElementOffsetTop = targetElementRef.current.offsetTop;
    setCurrentPage( value );
    window.scrollTo( {
      top: targetElementOffsetTop,
      behavior: "smooth", // Optional, adds smooth scrolling
    } );
  };

  const handleTabClick = ( page, id, name ) => {
    setCurrentPage( page );
    setcategory( {
      ...category,
      id: id,
      name: name,
    } )
  }
  return (
    <>
      <div className="featured-wrapper featured-wrapper-image container-fluid ">
        <div className="featured-main">
          <div className="row mb-4">
            <div className="featured-heading col-md-7">
              <h1 className="innerh1" ref={ targetElementRef }>
                Featured Properties
              </h1>
            </div>

            <div className="featured-switch col-md-5  d-md-flex justify-content-md-end justify-content-start">
              { categoriesList && (
                <Tabs
                  variant="soft-rounded"
                  colorScheme="#5d2f91"
                // onChange={ () => {
                //   setCurrentPage( 1 );
                // } }
                >
                  <TabList className="smooth-transition">
                    <Tab
                      style={ { textTransform: "capitalize" } }
                      onClick={ () => {
                        // setcategory( {
                        //   ...category,
                        //   id: "",
                        //   name: "All",
                        // } );
                        handleTabClick( 1, "", "All" )
                      } }
                    >
                      All
                    </Tab>
                    { categoriesList &&
                      categoriesList?.map( ( item ) => {
                        return (
                          <Tab
                            key={ item?.id }
                            style={ {
                              textTransform: "capitalize",
                              width: "auto",
                            } }
                            onClick={ () => {
                              // setcategory( {
                              //   ...category,
                              //   id: item?.id,
                              //   name: item?.name,
                              // } );
                              handleTabClick( 1, item?.id, item?.name )
                            } }
                          >
                            { item?.name }
                          </Tab>
                        );
                      } ) }
                  </TabList>
                </Tabs>
              ) }
            </div>
          </div>
          <div className="row gap-18 mx-auto">
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
            ) : typeof featured?.data != "string" ? (
              featured?.data?.map( ( item, index ) => {
                return (
                  <>
                    <div
                      className="col-xl-4  col-lg-4 col-md-6 col-sm-12 "
                      key={ index }
                    >
                      <div
                        className="box px-lg-3 px-xl-0"
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
                            // height: "270px",
                            borderRadius: "20px",
                            // overflow: "hidden",
                            // maxWidth: "340px",
                          } }
                        >
                          <div className="featured-badge">
                            <span style={ { textTransform: "uppercase" } }>
                              { item?.categoryName }
                            </span>
                          </div>
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
                              { " " }
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
                  </>
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

          <div className="row mt-4">
            { typeof featured?.data != "string" && featured?.totaldata > 9 ? (
              <Pagination
                count={ pageCount }
                page={ currentPage }
                color="primary"
                onChange={ handleChange }
              />
            ) : (
              ""
            ) }
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProperties;
