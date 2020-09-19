import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from "axios"
import "./styles/Auth.css"

const Login = props => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [user, setUser] = useState(null);
    const onChange = (e) => {
        console.log(formData.email);
        setFormData({...formData, [e.target.name] : e.target.value});
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("api/auth/login", JSON.stringify(formData), {headers: {"Content-Type": "application/json"}})
        const myStorage = window.localStorage;
        myStorage.setItem("user", JSON.stringify(res.data));
        console.log(localStorage.getItem("user"))
        if(res.data != null) setUser(res.data);
        console.log(user);
    }
    return (
        <div>
        {user ? (<Redirect to="/dashboard"/>) : (<div className="loginWrapper" onSubmit = {e => onSubmit(e)}>
        <div className="formsContainer">
            <form action="" className="loginForm">
                <h2 className="heading">Login</h2>
                <div className="loginEmail">
                    <input type="text" className="loginField" onChange={e =>onChange(e)} name="email" value = {formData.email} required/>
                    <label>Email Address</label>
                </div>
                <div className="loginPassword">
                    <input type="password" className="loginField" onChange={e =>onChange(e)} name="password" value={formData.password} required/>
                    <label>Password</label>
                </div>
                <input type="submit" className="loginSubmit" value="Log In"/>
            </form>
        </div>
    </div>)}
    </div>
    )
}

Login.propTypes = {

}

export default Login
