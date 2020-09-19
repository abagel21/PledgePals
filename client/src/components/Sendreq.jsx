import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles/Sendreq.css'
import axios from 'axios'

const Sendreq = props => {
    const [nameInput, setNameInput] = React.useState("");
    function sendreq(event){
        event.preventDefault();
        if(nameInput == ""){
            return;
        })
        axios.post('/create/' + nameInput,{content:"sdf"},{headers: {"Content-Type":"application/json"}});
    }

    function handleChange(event){
        let x = event.target.value
        setNameInput((prev) => {
            return x;
        });
    }
    useEffect(() =>{
        axios.get("/api/auth").then(function(data){
            console.log(data.data);
        })
    });
    return (
        <div className="sendreq-wrapper">
            <div>
                <form>
                    <input onChange={handleChange}></input>
                    <button type="submit" className="btn btn-primary" onClick={sendreq}>Send a request</button>
                </form>
                <h1>Use this page to send requests to another user!</h1>

            </div>
        </div>

    )
}

Sendreq.propTypes = {

}

export default Sendreq;
