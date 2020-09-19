import React, {useState} from 'react'
import axios from "axios"
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import "./styles/Auth.css"

const Register = props => {
    const onClick = (e) => {
        e.preventDefault();
    }
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
        console.log(JSON.stringify(formData));
    }
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("api/auth/register", JSON.stringify(formData), {headers: {"Content-Type": "application/json"}})
    }
    return (
        <div className="registerWrapper">
            <div className="formsContainer">
                <form action="" className="registerForm" onSubmit={e =>onSubmit(e)}>
                    <h2 className="heading">Sign Up</h2>
                    <div className="registerName">
                        <input type="text" className="registerField name" onChange = {e=>onChange(e)} name="name" value={formData.name} required/>
                        <label>Name</label>
                    </div>
                    <div className="registerEmail">
                        <input type="text" className="registerField username" onChange = {e=>onChange(e)} name="email" value={formData.email} required/>
                        <label>Email Address</label>
                    </div>
                    <div className="registerPassword">
                        <input type="password" className="registerField password" onChange = {e=>onChange(e)} name="password" value={formData.password} required/>
                        <label>Password</label>
                    </div>
                    <div className="registerConfirm">
                        <input type="password" className="registerField password" required/>
                        <label>Confirm Password</label>
                    </div>
                    <input type="submit" className="registerSubmit" value="Sign Up"/>
                </form>
            </div>
        </div>
    )
}

Register.propTypes = {

}

export default Register
