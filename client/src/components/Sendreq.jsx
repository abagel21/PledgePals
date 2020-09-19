import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles/Sendreq.css'
import axios from 'axios'

const Sendreq = props => {
    const [nameInput, setNameInput] = React.useState("");
    const [currReqs, setCurrReqs] = React.useState([]);
    function sendreq(event){
        event.preventDefault();
        if(nameInput == ""){
            return;
        }
        axios.get('/api/friends').then(function(data){
            let found = false;
            for(let i = 0; i < data.data.friends.length; i++){
                if(data.data.friends[i] == nameInput){
                    found = true;
                }
            }
            if(!found){
                console.log("name not found");
            }
        });
    }

    function handleChange(event){
        let x = event.target.value
        setNameInput((prev) => {
            return x;
        });
    }

    function initReqArray(userReqs){
        console.log(userReqs.data);
        setCurrReqs(function(prev){
            return [userReqs.data];
        })
    }
    useEffect(function(){
        axios.get('/api/medallion/requests').then(function(data){
            initReqArray(data);
        })
    })
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
