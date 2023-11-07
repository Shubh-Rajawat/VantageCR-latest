import React, { useEffect, useState } from "react";
import "./searchResults.css";
import arrowRight from "../../Assets/images/Mask group.png";
import recentsimg from "../../Assets/images/recentsimg.png";
import { Link, useLocation } from "react-router-dom";
// import {Tabs,TabList,TabPanels,Tab,TabPanel,TabIndicator,} from "@chakra-ui/react";
import Footer from "../Footer/Footer";
import WhiteNavbar from "../WhiteNavbar";
import noImageFound from "../../Assets/images/no-image-svgrepo-com.svg"
import { useSelector } from "react-redux";
import BaseUrl from "../BaseUrl";
import { Text } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

const SearchResults = () => {
  const location = useLocation();
  const [ seatchData, setSearchData ] = useState( [] );
  // console.log( "result", seatchData );
  // const { searchData } = useSelector((state) => state.search);
  useEffect( () => {
    setSearchData( location?.state?.data );
  }, [ location?.state?.data ] );
  return (
    <>
      <Helmet>
        <title>Results For:- { location?.state?.searchIn }</title>
      </Helmet>
      <div className="srch-results-wrapper">
        <WhiteNavbar />

        <div className="featured-wrapper container-fluid ">
          {/* <img src={reactangle} alt="featured" /> */ }
          <div className="featured-main mt-5">
            <div className="row mb-4 mt50">
              <div className="featured-heading ">
                <h2 className="srch-head ">
                  Search Results For: { location?.state?.searchIn }
                </h2>
              </div>
            </div>
            <div className="row gap-18">
              { seatchData?.length ? (
                seatchData?.map( ( item, index ) => {
                  // console.log("itm", item);
                  return (
                    <div
                      className="col-xl-4  col-lg-4 col-md-6 col-sm-12 "
                      key={ index }
                    >
                      <div
                        className="box px-lg-3 px-xl-0"
                        style={
                          item?.categoryName == "sold" ||
                            item?.categoryName == "Sold" ||
                            item?.categoryName == "leased" ||
                            item?.categoryName == "Leased"
                            ? {
                              backgroundColor: "lightpink",
                              overflow: "hidden",
                            }
                            : {
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
                        >
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
                <>
                  <div className="col-xl-4  col-lg-4 col-md-6 col-sm-12 ">
                    <h3>No Properties Found</h3>
                  </div>
                </>
              ) }
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;
