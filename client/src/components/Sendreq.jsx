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
        let temp = userReqs.data;
        setFriendsArr([...friendsArr, temp]
            )
    }
    useEffect(function(){
        axios.get('/api/friends').then(function(data){
            initReqArray(data);
        })
    }, []);
    return (
        <div className="sendreq-wrapper">
            <div>
                <ul>{friendsArr.map(function(e){
                    return (
                        <div>
                        {console.log(e.name)}
                        <button type="submit" className="btn btn-primary" >Send a request</button>
                        </div>
                    )
                })}</ul>
                <form>
                    <input onChange={handleChange}></input>
                    <button type="submit" className="btn btn-primary" >Send a request</button>
                </form>
                <h1>Use this page to send requests to another user!</h1>
            </div>
        </div>

    )
}

Sendreq.propTypes = {

}

export default Sendreq;
