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
                <ul class="nav_links">
                    <li><a href="#">Requests</a></li>
                    <li><a href="#">Users</a></li>
                    <li><a href="#">Friends</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Sign up</a></li>
                </ul>
            </nav>
            <img class="navBanner" src="../../../images/banner-item.png"alt="banner" />
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar
