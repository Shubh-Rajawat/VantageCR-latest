import React, { useEffect, useState } from 'react'
import "./aboutus.css"
import WhiteNavbar from '../WhiteNavbar'
import Footer from "../Footer/Footer"
import axios from 'axios'
import BaseUrl from "../BaseUrl";
import { Spinner } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet';
function AboutUs() {
    // const menuId = useSelector((state) => state.menu.menuID);
    const menuId = localStorage.getItem( "navID" )

    const [ aboutData, setAboutData ] = useState();
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
                setAboutData( res?.data?.data[ 0 ] );
                setSeo( {
                    title: res.data?.data[ 0 ]?.seo_title,
                    desc: res.data?.data[ 0 ]?.seo_description
                } )
                // console.log( "about", res?.data );
            } ).catch( ( err ) => { console.log( err ); } )
    }

    const getAllMenu = ( newSlug ) => {
        window.scrollTo( {
            top: 0,
            behavior: "smooth",
        } );
        axios
            .get( `${ BaseUrl }api/getmenu` )
            .then( ( res ) => {
                const newMenuIDData = res?.data?.allmenu.filter( ( data ) => { return data.Slug === `/${ newSlug }` } )
                localStorage.setItem( "navID", newMenuIDData && newMenuIDData[ 0 ]?.id )
                viewPageFeild( newMenuIDData[ 0 ]?.id )
            } )
            .catch( ( err ) => { } );
    }

    useEffect( () => {
        const str = window.location.pathname
        const words = str.split( '/' );
        const FinalWord = words[ words.length - 1 ]
        getAllMenu( FinalWord )
        window.scrollTo( {
            top: 0,
            behavior: "smooth",
        } );
        // viewPageFeild( 1 )
    }, [] )
    return (
        <div className='about-us-wrapper'>
            <Helmet>
                <title>{ seo.title }</title>
                <meta name="description" content={ seo.desc } />
            </Helmet>
            <div className="about-banner"  >
                <WhiteNavbar />
                <div className="banner-content" style={ { backgroundImage: `url(${ BaseUrl }${ aboutData?.banner_img })` } }>
                    <div className="banner-heading">
                        <h1 className='bheading'>{ aboutData?.page_title }</h1>
                    </div>
                </div>
            </div>
            <div className="about-desc">
                { aboutData?.content?.map( ( item, i ) => {
                    if ( i === 0 )
                        return (
                            <div className="welcome">
                                <h1 className='innerh1'>{ item?.page_field_title }</h1>
                                <p style={ { whiteSpace: "pre-line", textAlign: "justify" } } >{ item?.page_field_description }</p>
                            </div>

                        )
                } ) }
                <div className="about-data">
                    { loader ?
                        <div className="loader">
                            <Spinner
                                thickness='4px'
                                speed='0.65s'
                                emptyColor='gray.200'
                                color='purple.700'
                                size='xl'
                            />
                        </div>
                        : aboutData?.content?.map( ( item, i ) => {
                            if ( i % 2 === 0 && i > 0 ) {
                                return (
                                    <div className='a-content  ' key={ i }>
                                        <div className="a-text">
                                            <h1 className='innerh1' >{ item?.page_field_title }</h1>
                                            <p className='abpara'
                                                style={ { whiteSpace: "pre-line", textAlign: "left", letterSpacing: ".7px" } }
                                            >{ item?.page_field_description } </p>
                                        </div>
                                        <div className="a-image">
                                            <div className='a-parent'>
                                                <img src={ `${ BaseUrl }${ item?.image }` } alt="image not found" className='a-img' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                if ( i > 0 )
                                    return (
                                        <div className='v-content' key={ i }>
                                            <div className="v-image">
                                                <div className='v-parent'>
                                                    <img src={ `${ BaseUrl }${ item?.image }` } alt="image not found" className='v-img' />
                                                </div>
                                            </div>
                                            <div className="v-text">
                                                <h1 className='innerh1'>{ item?.page_field_title }</h1>
                                                <p className='abpara'
                                                    style={ { whiteSpace: "pre-line", textAlign: "left", letterSpacing: ".7px" } }
                                                >{ item?.page_field_description }</p>
                                            </div>
                                        </div>
                                    )
                            }
                        } ) }
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default AboutUs


// window.scrollTo({
//     top: 0,
//     behavior: "smooth",
// });