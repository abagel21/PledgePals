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
        <div className="navWrapper">
            <img class="logo" src="../../images/logo.png" alt="logo" /> 
            <nav>
                {user ? <ul class="nav_links">
                <li><Link to="/">Home</Link></li>
                    <li><Link to="/sendreq">Make Promises</Link></li>
                    <li><Link to="/requests">Keep Promises</Link></li>
                    <li><Link to="/request_accept">Accept Promises</Link></li>
                    <li><Link to="/friends">Friends</Link></li>
                </ul> : <ul class="nav_links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Sign up</Link></li>
                </ul>}
            </nav>
            <img class="navBanner" src="../../../images/banner-item.png"alt="banner" />
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
