import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import "./styles/Auth.css"

const Login = props => {
    const onClick = (e) => {
        e.preventDefault();
    }
    return (
        <div className="loginWrapper">
            <div className="formsContainer">
                <form action="" className="loginForm">
                    <h2 className="heading">Login</h2>
                    <div className="loginEmail">
                        <input type="text" className="loginField username" required/>
                        <label>Email Address</label>
                    </div>
                    <div className="loginPassword">
                        <input type="password" className="loginField password" required/>
                        <label>Password</label>
                    </div>
                    <Link to='/dashboard' className="loginSubmit">Log In</Link>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {

}

export default Login
