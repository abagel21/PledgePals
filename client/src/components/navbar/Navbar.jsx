import React from 'react'
import PropTypes from 'prop-types'
import "./styles/Navbar.css"
import {Link} from 'react-router-dom'

const Navbar = props => {
    return (
        <div className="nav_container">
            <h2 className="heading title">Pledge Pals</h2>
            <div className="authLinks">
                <Link className="navButton loginButton" to = "/login">Login</Link>
                <Link className="navButton registerButton" to = "/register">Sign Up</Link>
            </div>
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
