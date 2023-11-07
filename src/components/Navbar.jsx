import React, { useEffect, useState } from "react";
import logo from "../Assets/images/nav-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./Home/home.css";
import axios from "axios";
import BaseUrl from "./BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import { menuActions } from "../redux/menuSlice";
import { categoryAction } from "../redux/categorySlice";

const Navbar = ( props ) => {
  const dispatch = useDispatch();
  const [ click, setClick ] = React.useState( false );

  const handleClick = () => setClick( !click );
  const Close = () => setClick( false );
  const [ menuData, setmenuData ] = useState( [] );

  useEffect( () => {
    axios
      .get( `${ BaseUrl }api/getmenu` )
      .then( ( res ) => {
        setmenuData( res?.data?.allmenu );
        // console.log( "menu", res?.data?.allmenu )
        dispatch( menuActions.setMenuData( res?.data?.allmenu ) );
      } )
      .catch( ( err ) => { } );
  }, [] );
  // search property
  const [ showSrch, setShowSrch ] = useState( false );

  const [ search, setSearch ] = useState();
  const navigate = useNavigate();
  const searchHandle = ( e ) => {
    e.preventDefault();
    if ( search ) {
      axios
        .post( `${ BaseUrl }api/searchproperty`, { search: search } )
        .then( ( res ) => {
          navigate( "/search", {
            state: { data: res?.data?.data, searchIn: search },
          } );
          Close();
        } )
        .catch( ( error ) => { } );
    } else {
      return false;
    }
  };
  // end search
  return (
    <div className="nav-wrap">
      <nav className="navbar" onClick={ ( e ) => e.stopPropagation() }>
        <div className="nav-container">
          <NavLink to="/" className="nav-logo">
            <img src={ logo } alt="logo" />
          </NavLink>
          <ul className={ click ? "nav-menu active" : "nav-menu" }>
            { menuData &&
              menuData?.map( ( item, i ) => {
                return (
                  <li className="nav-item" key={ i }>
                    { item?.page_title ? (
                      <NavLink
                        onClick={ () => {
                          Close();
                          localStorage.setItem( "navID", item?.id );
                          dispatch( menuActions.setMenuId( item?.id ) );
                        } }
                        to={ item?.Slug }
                        state={ item?.id }
                        activeclassname="active"
                        className="nav-links"
                      >
                        { item?.page_title }
                      </NavLink>
                    ) : (
                      <NavLink
                        onClick={ () => {
                          Close();
                          localStorage.setItem( "navID", item?.id );
                          dispatch( menuActions.setMenuId( item?.id ) );
                          dispatch( categoryAction.setCatID( "" ) );
                        } }
                        to={ item?.Slug }
                        state={ item?.id }
                        activeclassname="active"
                        className="nav-links"
                      >
                        { item?.name }
                      </NavLink>
                    ) }
                  </li>
                );
              } ) }

            <li className="nav-item d-lg-block d-none">
              <div className="nav-links">
                <span className="srch-wrapper">
                  <i
                    onClick={ () => {
                      setShowSrch( !showSrch );
                    } }
                    className="fa-solid fa-magnifying-glass pointer"
                  ></i>

                  { showSrch && (
                    <form
                      className="search-drop d-flex align-items-center"
                      onSubmit={ searchHandle }
                    >
                      <input
                        type="text"
                        className="py-2 ps-2"
                        placeholder="search..."
                        onChange={ ( e ) => setSearch( e.target.value ) }
                      />
                      <button>
                        <i className="fa-solid fa-magnifying-glass me-2"></i>
                      </button>
                    </form>
                  ) }
                </span>
              </div>
            </li>
            <li className="nav-item d-lg-none d-block">
              <div className="nav-links">
                <span className="">
                  <form
                    className="srch-mobile d-flex align-items-center"
                    onSubmit={ searchHandle }
                  >
                    <input
                      type="text"
                      className="py-2 ps-2"
                      placeholder="search..."
                      onChange={ ( e ) => setSearch( e.target.value ) }
                    />
                    <button>
                      <i className="fa-solid fa-magnifying-glass me-2"></i>
                    </button>
                  </form>
                </span>
              </div>
            </li>
          </ul>
          <div
            className={ `nav-icon ${ click ? "facactive" : "deactive" }` }
            onClick={ handleClick }
          >
            <i className={ click ? "fa fa-times" : "fa fa-bars" }></i>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
