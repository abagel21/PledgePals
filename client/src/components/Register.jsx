import React from 'react'
import PropTypes from 'prop-types'
import "./styles/Auth.css"

const Register = props => {
    const onClick = (e) => {
        e.preventDefault();
    }
    return (
        <div className="registerWrapper">
            <div className="formsContainer">
                <form action="" className="registerForm">
                    <h2 className="heading">Sign Up</h2>
                    <div className="registerEmail">
                        <input type="text" className="registerField username" required/>
                        <label>Email Address</label>
                    </div>
                    <div className="registerPassword">
                        <input type="password" className="registerField password" required/>
                        <label>Password</label>
                    </div>
                    <div className="registerConfirm">
                        <input type="password" className="registerField password" required/>
                        <label>Confirm Password</label>
                    </div>
                    <input type="submit" className="registerSubmit" onClick = {e => onClick(e)}/>
                </form>
            </div>
        </div>
    )
}

Register.propTypes = {

}

export default Register
