import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles/Sendreq.css'
import axios from 'axios'

const Sendreq = props => {
    const [nameInput, setNameInput] = React.useState("");
    const [friendsArr, setFriendsArr] = React.useState([]);


    function handleChange(event){
        let x = event.target.value
        setNameInput((prev) => {
            return x;
        });
    }

    function initReqArray(userReqs){
        console.log(userReqs.data);
        setFriendsArr(function(prev){
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
                <ul>{friendsArr.map(function(e){
                    return (
                        <h1></h1>
                    )
                })}</ul>
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
