import React, {useState} from 'react'
import PropTypes from 'prop-types'
import axios from "axios"
import "./styles/Auth.css"

const Login = props => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const onChange = (e) => {
        console.log(formData.email);
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios.get("/api/auth/login")
    }
    return (
        <div className="loginWrapper" onSubmit = {e => onSubmit(e)}>
            <div className="formsContainer">
                <form action="" className="loginForm">
                    <h2 className="heading">Login</h2>
                    <div className="loginEmail">
                        <input type="text" className="loginField username" onChange = {e =>onChange(e)} value = {formData.email} name="email" required/>
                        <label>Email Address</label>
                    </div>
                    <div className="loginPassword">
                        <input type="password" className="loginField password" onChange = {e =>onChange(e)} value = {formData.password} name="password"  required/>
                        <label>Password</label>
                    </div>
                    <input type="submit" className="loginSubmit">Log In</input>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {

}

export default Login
