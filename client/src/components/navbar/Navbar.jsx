import React from 'react'
import PropTypes from 'prop-types'
import "./styles/Navbar.css"

const Navbar = props => {
    return (
        <div className="nav_container">
            <h2 className="heading title">Pledge Pals</h2>
            <div className="authLinks">
                <button className="navButton loginButton">Login</button>
                <button className="navButton registerButton">Sign Up</button>
            </div>
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
