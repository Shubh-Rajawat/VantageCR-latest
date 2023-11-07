import React, { useEffect, useRef, useState } from "react";
import WhiteNavbar from "../WhiteNavbar";
import contactimg from "../../Assets/images/contact1.jpg";
import Footer from "../Footer/Footer";
import "./contact.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useToast } from "@chakra-ui/react";
import BaseUrl from "../BaseUrl";
import { ReCaptchaKey, devRecaptcha } from "../ReCaptchaKey";
import { Helmet } from "react-helmet";

const Contact = () => {
  // ask get api
  const [ getContact, setgetContact ] = useState( [] );
  const [ seo, setSeo ] = useState( {
    title: "Vantage Commercial Realty",
    desc: "..."
  } );

  useEffect( () => {
    axios
      .get( `${ BaseUrl }viewcontactagentmessage` )
      .then( ( res ) => {
        setgetContact( res?.data?.data[ 0 ] );
      } )
      .catch( ( error ) => console.log( error ) );
  }, [] );
  // ask end
  const [ contactData, setContactData ] = useState();
  const [ captaErr, setCaptaErr ] = useState( "" );
  const [ user, setUser ] = useState( {
    name: "",
    email: "",
    message: "",
  } );
  const recaptchaRef = useRef( null );
  const toast = useToast();
  const handleSubmit = ( event ) => {
    event.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    if ( recaptchaValue ) {
      axios
        .post( `${ BaseUrl }api/agentmessage`, user )
        .then( ( res ) => {
          if ( res.data.status === true ) {
            toast( {
              description: "Your message has been sent.",
              status: "success",
              duration: 4000,
              isClosable: true,
              position: "top-right",
            } );
            setUser( {
              name: "",
              email: "",
              message: "",
            } );
          } else {
            toast( {
              description: "Please try again.",
              status: "erron",
              duration: 4000,
              isClosable: true,
              position: "top-right",
            } );
          }
        } )
        .catch( ( err ) => { } );
    } else {
      setCaptaErr( "Please verify the captcha" );
    }
  };

  const viewPageFeild = ( dataID ) => {
    axios
      .post( `${ BaseUrl }api/viewpagesfields`, {
        id: dataID,
      } )
      .then( ( res ) => {
        setContactData( res?.data?.data[ 0 ] );
        setSeo( {
          title: res.data?.data[ 0 ]?.seo_title,
          desc: res.data?.data[ 0 ]?.seo_description
        } )
        // console.log( "contact ", res?.data?.data[ 0 ] );
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
    // viewPageFeild(4);
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
          className="contact-banner-content"
          style={ {
            backgroundImage: `url(${ BaseUrl }${ contactData?.banner_img })`,
          } }
        >
          <div className="banner-heading">
            <h1 className="bheading">
              { contactData?.page_title && contactData?.page_title }
            </h1>
          </div>
        </div>
      </div>
      {/* {contactData?.content &&
        contactData?.content?.map((item, i) => {
          return (
            <div className="contact-us">
              <div className="content " style={{ gap: "50px" }}>
                <div className="image">
                  <div className="imgparent-about ">
                    {item?.image && (
                      <img
                        src={`${BaseUrl}${item?.image}`}
                        alt=" not found"
                        className="img reach-vantage"
                      />
                    )}
                  </div>
                </div>
                <div className="text">
                  <h1 className="featurehead">
                    {item?.page_field_title && item?.page_field_title}
                  </h1>
                  <p className="_18px400" style={{ whiteSpace: "pre-line" }}>
                    {item?.page_field_description &&
                      item?.page_field_description}
                  </p>
                </div>
              </div>
            </div>
          );
        })} */}
      <div className="ask-wrapper container-fluid  ">
        <div className="row ask-wrapper-row py-lg-5  ">
          <div className="col-lg-6 p-0 px-md-5 px-3 mb-lg-5 mb-3">
            <div className=" mx-auto" style={ { maxWidth: "500px" } }>
              <div className="mt-lg-5">
                { contactData?.content[ 0 ].page_field_title && (
                  <h3 className="to-reach-us-head">
                    { contactData?.content[ 0 ].page_field_title }
                  </h3>
                ) }
              </div>
              { contactData?.content[ 0 ].page_field_description && (
                <div
                  className=""
                  dangerouslySetInnerHTML={ {
                    __html: contactData?.content[ 0 ].page_field_description,
                  } }
                ></div>
              ) }
            </div>
            {/* <div
              id="contact-map"  
              className="property-location"
              dangerouslySetInnerHTML={{ __html: getContact?.location }}
            ></div> */}
          </div>
          <div className="col-lg-6 p-0 ask-content py-5 py-lg-0 ">
            <div
              className="ask-content-inner d-flex justify-content-center flex-column py-3"
              style={ { height: "100%" } }
            >
              <div className="ask-heading mb-3 text-lg-start text-center">
                <h4
                  style={ { color: "#5C727D", fontWeight: "700" } }
                  className="ask-form-head"
                >
                  { " " }
                  { getContact?.heading }
                </h4>
              </div>
              <div>
                <form className="ask-form" onSubmit={ handleSubmit }>
                  <div className="row ">
                    <div className="col-lg-6  p-0">
                      <input
                        required
                        type="text"
                        placeholder="Your Name"
                        className="ask-input contact-field "
                        value={ user.name }
                        onChange={ ( e ) => {
                          setUser( { ...user, name: e.target.value } );
                        } }
                      />
                    </div>
                    <div className="col-lg-6 p-0 mt-3 mt-lg-0">
                      <input
                        value={ user.email }
                        required
                        type="email"
                        placeholder="Your Email"
                        className="ask-input contact-field"
                        onChange={ ( e ) => {
                          setUser( { ...user, email: e.target.value } );
                        } }
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12  p-0">
                      <textarea
                        value={ user.message }
                        required
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Your Messsage"
                        className="ask-message  mt-3 contact-field"
                        onChange={ ( e ) => {
                          setUser( { ...user, message: e.target.value } );
                        } }
                      ></textarea>
                    </div>
                    <div style={ { overflow: "hidden" } }>
                      <ReCAPTCHA
                        sitekey={ devRecaptcha }
                        ref={ recaptchaRef }
                        onChange={ () => {
                          setCaptaErr( "" );
                        } }
                      // style={
                      //   window.innerWidth < 300
                      //     ? {
                      //       maxWidth: "",
                      //     }
                      //     : {}
                      // }
                      />
                      <span className="text-danger">{ captaErr }</span>
                    </div>
                  </div>
                  <button className="ask-button">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0 p-0 mt-1" style={ { height: "600px" } }>
          <div className="col p-0 border border-black">
            <div
              id="contact-map"
              className="property-location my-0"
              dangerouslySetInnerHTML={ { __html: getContact?.location } }
            ></div>
            {/* <div
              id="contact-map"
              className="property-location my-0"
            >
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d776.2392973286886!2d-77.0398897175542!3d38.90209429276096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7b950b57ce5%3A0xb71564093a87693e!2s910%2017th%20St%20NW%20%231100%2C%20Washington%2C%20DC%2020006%2C%20USA!5e0!3m2!1sen!2sin!4v1693982669750!5m2!1sen!2sin" width="600" height="450" style={ { border: 0 } } allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

//developers APIKEY 6LdmUd0mAAAAAE8RagdNdfmh2Ta_i9lKCRIG2TP8
