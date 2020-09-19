import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import "./styles/Navbar.css"
import {Link} from 'react-router-dom'
import axios from 'axios'

const Navbar = props => {
    useEffect(() => {
        async function getUser() {
            console.log("refreshing")
            const res = await axios.get("api/auth");
            console.log("YO")
            console.log(JSON.stringify(res))
            if(res.data != null) setUser(res.data);
        }
        getUser();
    }, [])
    const [user, setUser] = useState(null)
    return (
        <div className="nav_container">
            <Link to="/" className="heading title">Pledge Pals</Link>
            {user ? (<div className="authLinks">
                <Link className="navButton requestbutton" to = "/requests">Requests</Link>
            </div>) : (<div className="authLinks">
                <Link className="navButton loginButton" to = "/login">Login</Link>
                <Link className="navButton registerButton" to = "/register">Sign Up</Link>
            </div>)}
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
