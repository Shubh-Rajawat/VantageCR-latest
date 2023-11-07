import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div
            style={ {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100vh'

            } }
        >
            <h1
                className='main404'
            >404</h1>
            <h3
                className='notfound'
            >The page you are looking for cannot be found</h3>
            <h4>Go to <Link to={ `/` } className='link404'>Home</Link></h4>
        </div>
    )
}

export default PageNotFound