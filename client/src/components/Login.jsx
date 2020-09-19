import React from 'react'
import PropTypes from 'prop-types'
import "./styles/Auth.css"

const Login = props => {
    return (
        <div className="loginWrapper">
            <div className="formsContainer">
                <form action="" className="loginForm">
                    <h2 className="heading">Login</h2>
                    <input type="text" className="loginField username" />
                    <input type="password" className="loginField password"/>
                    <input type="submit" className="loginSubmit"/>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {

}

export default Login
