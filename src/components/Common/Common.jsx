import React, { useEffect, useRef, useState } from "react";
// import reactangle from "../../Assets/images/Rectangle 746.png";
// import featured1 from "../../Assets/images/image 95.png";
import arrowRight from "../../Assets/images/Mask group.png";
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabList, Tab, Spinner, Text } from "@chakra-ui/react";
import noImageFound from "../../Assets/images/no-image-svgrepo-com.svg"
import Footer from "../Footer/Footer";
import WhiteNavbar from "../WhiteNavbar";
import forLeaseimg from "../../Assets/images/forleaseimg.png";
import axios from "axios";
import BaseUrl from "../BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "../PageNotFound";
import { Pagination } from "@material-ui/lab";
import "./common.css";
import { categoryAction } from "../../redux/categorySlice";
import zIndex from "@material-ui/core/styles/zIndex";
import { Helmet } from "react-helmet";
// import { Pagination } from "@material-ui/lab";

const ForLease = () => {
  const menuId = useSelector( ( state ) => state.menu.menuID );
  const [ leaseData, setleaseData ] = useState( [] );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ loader, setLoader ] = useState( true );
  const [ bannerData, setBannerData ] = useState();
  const [ notFound, setNotFound ] = useState( false );
  const [ noCat, setNoCat ] = useState( false );
  const [ pageData, setPageData ] = useState();
  const [ tabsCategory, setTabsCategory ] = useState();
  const [ seo, setSeo ] = useState( {
    title: null,
    desc: null
  } );
  const [ categoriesList, setCategoriesList ] = useState();
  const location = useLocation();
  const targetElementRef = useRef( null );
  const [ category, setcategory ] = useState( {
    id: "",
    type: null,
  } );
  const { catID } = useSelector( ( state ) => state.categoryID );

  const [ activeTabs, setActiveTabs ] = useState( 0 );
  const viewPageFeild = ( dataID, common, zero ) => {
    // console.log( "catID", catID )
    // console.log( "shubh", category )
    // zero && setCurrentPage( 1 );
    setLoader( true );
    axios
      .post( `${ BaseUrl }getcatgoryandtype?page=${ currentPage }`, {
        category_id: catID,
        type: common,
      } )
      .then( ( res ) => {
        if ( res?.data?.statu ) {
          // console.log( "respo", res?.data );
          setleaseData( res?.data );
          setLoader( false );
        } else {
          setleaseData( false );
        }
      } )
      .catch( ( error ) => { } );
  };
  //*************************************************************************** */

  // function to get new page
  const viewNewPage = async ( newSlug ) => {
    setleaseData( false );
    axios
      .get( `${ BaseUrl }api/getallotherpage` )
      .then( ( res ) => {
        const data = res?.data?.data?.filter(
          ( item ) => item?.Slug === `/${ newSlug }`
        );
        if ( data?.length ) {
          setPageData( data[ 0 ] );
          // console.log( "newPagedata", data[ 0 ] )
          setSeo( {
            title: data[ 0 ]?.seo_title,
            desc: data[ 0 ]?.seo_description
          } )
          setLoader( false );
        } else {
          setNotFound( true );
        }
      } )
      .catch( ( err ) => {
        console.log( err );
      } );
  };

  // get Menu
  const getCategory = ( newSlug ) => {
    // console.log( "getCategory running" )
    axios
      .post( `${ BaseUrl }getfiltercategory`, {
        type: "",
      } )
      .then( ( res ) => {
        // setCategoriesList( res?.data?.data );
        const currentCat = res?.data?.data.filter( ( data ) => {
          return data.Slug === `/${ newSlug }`;
        } );
        setBannerData( currentCat && currentCat[ 0 ] );
        // console.log( "reached seo", currentCat[ 0 ] )
        setSeo( {
          title: currentCat[ 0 ]?.seo_title,
          desc: currentCat[ 0 ]?.seo_description
        } )
        const tabscat = res?.data?.data.filter( ( item ) => {
          return item?.comman === currentCat[ 0 ]?.comman;
        } );
        if ( currentCat[ 0 ]?.id ) {
          viewPageFeild( "", currentCat[ 0 ]?.comman );
          if ( currentCat[ 0 ]?.comman === "sale" ) {
            setTabsCategory( tabscat && tabscat.reverse() );
          } else {
            setTabsCategory( tabscat && tabscat );
          }
          setNotFound( false );
        } else {
          viewNewPage( newSlug );
        }
      } )
      .catch( ( err ) => { } );
  };

  let pageCount = 1;
  useEffect( () => {
    const targetElementOffsetTop = targetElementRef.current?.offsetTop;
    if ( currentPage > 1 ) {
      window.scrollTo( {
        top: targetElementOffsetTop,
        behavior: "smooth", // Optional, adds smooth scrolling
      } );
    }
    const str = window.location.pathname;
    const words = str.split( "/" );
    const FinalWord = words[ words.length - 1 ];
    getCategory( FinalWord );
  }, [ catID, location?.state, currentPage ] );

  useEffect( () => {
    return () => {
      // setcategory( {
      //   ...category,
      //   id: ""
      // } )
      // console.log( "render" )
      dispatch( categoryAction.setCatID( "" ) );
      setActiveTabs( 0 );
    };
  }, [ location?.state ] );

  let postPerPage = 9;
  pageCount = Math.ceil( leaseData?.totaldata / postPerPage );
  let indexOfLastPost = currentPage * postPerPage;
  let indexOfFirstPost = indexOfLastPost - postPerPage;
  let currentPageData = leaseData?.data?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const handleChange = ( e, value ) => {
    setCurrentPage( value );
  };
  const dispatch = useDispatch();
  const handleTabClick = ( index, categoryId, comman ) => {
    setCurrentPage( 1 );
    setActiveTabs( index );
    // setcategory( {
    //   ...category,
    //   id: categoryId,
    // } );
  };

  return notFound ? (
    <PageNotFound />
  ) : !leaseData ? (
    <>
      <Helmet>
        <title>{ seo.title ? seo.title : "Vantage Commercial Realty" }</title>
        <meta name="description" content={ seo.desc ? seo.desc : "Vantage Commercial Realty" } />
      </Helmet>
      <div className="about-banner ">
        <WhiteNavbar />
      </div>
      <div className="wrap ">
        <div
          className="forlease-banner-content"
          style={ { backgroundImage: `url(${ BaseUrl }${ pageData?.bannerimage })` } }
        >
          <div className="banner-heading">
            <h1 className="bheading">{ pageData?.page_title }</h1>
          </div>
        </div>
        <div
          className=" newpage-wrapper"
          dangerouslySetInnerHTML={ { __html: pageData?.content } }
        ></div>
      </div>
    </>
  ) : (
    // properties page  partition started
    <>
      <Helmet>
        <title>{ seo.title ? seo.title : "Vantage Commercial Realty" }</title>
        <meta name="description" content={ seo.desc ? seo.desc : "Vantage Commercial Realty" } />
      </Helmet>
      <div className="about-banner">
        <WhiteNavbar />
        <div
          className="forlease-banner-content"
          style={ { backgroundImage: `url(${ BaseUrl }${ bannerData?.img })` } }
        >
          <div className="banner-heading" ref={ targetElementRef }>
            <h1 className="bheading">{ bannerData?.name }</h1>
          </div>
        </div>
      </div>
      <div
        className="featured-wrapper featured-wrapper-image container-fluid "
        ref={ targetElementRef }
      >
        <div className="featured-main">
          <div className="row mb-4 align-items-end">
            <div className="featured-heading col-md-7">
              <h1
                className="innerh1"
                style={ {
                  color: "#868484",
                } }
              >
                { loader
                  ? ""
                  : leaseData?.totaldata
                    ? `${ leaseData?.totaldata } Properties Found`
                    : "" }
              </h1>
            </div>

            <div className="featured-switch col-md-5  d-md-flex justify-content-md-end justify-content-start">
              {
                <Tabs
                  variant="soft-rounded"
                  colorScheme="#5d2f91"
                  index={ activeTabs }
                  onChange={ ( index ) => {
                    setActiveTabs( index );
                  } }
                >
                  <TabList className="smooth-transition">
                    {
                      <Tab
                        style={ { textTransform: "capitalize" } }
                        onClick={ () => {
                          dispatch( categoryAction.setCatID( "" ) );
                          handleTabClick( 0, "", bannerData?.comman );
                        } }
                      // isSelected={ catID === "" }
                      >
                        All
                      </Tab>
                    }
                    { tabsCategory?.map( ( item, index ) => {
                      return (
                        <Tab
                          // isSelected={ catID === item?.id }
                          key={ item?.id }
                          style={ {
                            textTransform: "capitalize",
                            width: "auto",
                          } }
                          onClick={ () => {
                            dispatch( categoryAction.setCatID( item?.id ) );
                            handleTabClick( index + 1, item?.id, item?.comman );
                          } }
                        >
                          { item?.name }
                        </Tab>
                      );
                    } ) }
                  </TabList>
                </Tabs>
              }
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
            ) : leaseData ? (
              leaseData?.data?.map( ( item, index ) => {
                return (
                  <>
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
                            // height: "270px",
                            borderRadius: "20px",
                            // overflow: "hidden",
                            // maxWidth: "340px",
                          } }
                        >
                          { item?.categoryName == "sold" ||
                            item?.categoryName == "Sold" ||
                            item?.categoryName == "leased" ||
                            item?.categoryName == "Leased" ? (
                            <div className="featured-badge">
                              <span style={ { textTransform: "uppercase" } }>
                                { item?.categoryName }
                              </span>
                            </div>
                          ) : null }
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
            { leaseData && leaseData?.totaldata > 9 ? (
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
      <Footer />
    </>
    // properties page or partition ended
  );
};

export default ForLease;

//****code kept for backup****/

// const getAllMenu = ( newSlug ) => {
//     axios
//         .get( `${ BaseUrl }api/getmenu` )
//         .then( ( res ) => {
//             const newMenuIDData = res?.data?.allmenu.filter( ( data ) => {
//                 return data.slug === `/${ newSlug }`;
//             } );
//             setBannerData( newMenuIDData && newMenuIDData[ 0 ] );
//             localStorage.setItem( "navID", newMenuIDData && newMenuIDData[ 0 ]?.id );
//             if ( newMenuIDData[ 0 ]?.id ) {
//                 viewPageFeild( newMenuIDData[ 0 ]?.id );
//                 setNotFound( false );
//             } else {
//                 setNotFound( true );
//             }
//         } )
//         .catch( ( err ) => { } );
// };

///////************************************************ */////
//   const viewPageFeild = (dataID, newSlug) => {
//     setLoader(true);

//     axios
//       .post(`${BaseUrl}api/fetchAllpropertyBycategoryId?page=${currentPage}`, {
//         category_id: dataID,
//       })
//       .then((res) => {
//         if (res?.data?.statu === false) {
//           setleaseData(false);
//           // setLoader( true );
//         } else {
//           setleaseData(res?.data);
//           console.log("respo", res?.data?.data);
//           setLoader(false);
//         }
//       })
//       .catch((error) => {});
//   };

// const getCategory = ( newSlug ) => {
//   axios
//     .get( `${ BaseUrl }api/getallcategory` )
//     .then( ( res ) => {
//       setCategoriesList( res?.data?.data );
//       console.log( "world", res );
//       const currentCat = res?.data?.data.filter( ( data ) => {
//         return data.Slug === `/${ newSlug }`;
//       } );
//       console.log( "currentCat", currentCat );
//       setBannerData( currentCat && currentCat[ 0 ] );
//       if ( currentCat[ 0 ]?.id ) {
//         viewPageFeild( "", newSlug, currentCat[ 0 ]?.comman );
//         const tabscat = res?.data?.data.filter( ( item ) => {
//           return item?.common == currentCat[ 0 ]?.comman;
//         } );
//         console.log( "TabsCat", tabscat );
//         setTabsCategory( tabscat && tabscat );
//         console.log( "code ended" );
//         setNotFound( false );
//       } else {
//         viewNewPage( newSlug );
//         //   console.log("newPage");
//         // setNotFound( true );
//       }
//     } )
//     .catch( ( err ) => { } );
// };
