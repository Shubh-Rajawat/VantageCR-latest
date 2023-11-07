import React, { useEffect, useRef, useState } from "react";
import "./askAgent.css";
import askAgent from "../../Assets/images/ask_agent.png";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

import { useToast } from "@chakra-ui/react";
import BaseUrl from "../BaseUrl";
import { ReCaptchaKey, devRecaptcha } from "../ReCaptchaKey";
const AskAnAgent = () => {
  // ask get api
  const [ getAgent, setGetAgent ] = useState( [] );

  useEffect( () => {
    axios
      .get( `${ BaseUrl }viewagentmessage` )
      .then( ( res ) => {
        setGetAgent( res?.data?.data[ 0 ] );
      } )
      .catch( ( error ) => console.log( error ) );
  }, [] );
  // ask end
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
              status: "error",
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
  return (
    <div className="ask-wrapper container-fluid">
      <div className="row ask-wrapper-row">
        <div className="col-lg-6 p-0">
          <div className="ask-wrapper-image">
            <img src={ `${ BaseUrl }${ getAgent?.img }` } alt="ask agent" />
          </div>
        </div>
        <div className="col-lg-6 p-0 ask-content py-5 py-lg-0">
          <div
            className="ask-content-inner d-flex justify-content-center flex-column py-3"
            style={ { height: "100%" } }
          >
            <div className="ask-heading">
              <h2 className="_50px450" style={ { color: "#868484" } }>{ getAgent?.heading }</h2>
              <p className=""
                style={ {
                  fontSize: "15px",
                  fontWeight: 300,
                  color: "#5c727d",
                } }
              >{ getAgent?.title }</p>
            </div>
            <div>
              <form className="ask-form" onSubmit={ handleSubmit }>
                <div className="row ">
                  <div className="col-lg-6  p-0">
                    <input
                      required
                      value={ user.name }
                      type="text"
                      placeholder="Your Name"
                      className="ask-input   contact-field"
                      onChange={ ( e ) => {
                        setUser( { ...user, name: e.target.value } );
                      } }
                    />
                  </div>
                  <div className="col-lg-6 p-0  mt-3 mt-lg-0">
                    <input
                      required
                      value={ user.email }
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
                      required
                      value={ user.message }
                      name=""
                      id=""
                      cols="30"
                      rows="3"
                      placeholder="Your Messsage"
                      className="ask-message  mt-3 contact-field"
                      onChange={ ( e ) => {
                        setUser( { ...user, message: e.target.value } );
                      } }
                    ></textarea>
                  </div>
                </div>
                <div style={ { overflow: "hidden" } } >
                  <ReCAPTCHA
                    sitekey={ devRecaptcha }
                    ref={ recaptchaRef }
                    onChange={ () => {
                      setCaptaErr( "" );
                    } }
                  />
                  <span className="text-danger">{ captaErr }</span>
                </div>
                <button className="ask-button ">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAnAgent;
