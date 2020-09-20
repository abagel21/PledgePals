import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './styles/Sendreq.css'
import axios from 'axios'

const Sendreq = props => {
    const [nameInput, setNameInput] = React.useState("");
    const [friendsArr, setFriendsArr] = React.useState([]);

    function handleClick(event){
        console.log(event.target.name);
        
        event.preventDefault();
        axios.post('/api/medallion/create/'+event.target.name,{content:nameInput}, {headers: {"Content-Type": "application/json"}})
        .then(function(data){
            console.log(data);
        })
    }

    function handleChange(event){
        let x = event.target.value
        setNameInput((prev) => {
            return x;
        });
    }

    function initReqArray(userReqs){
        console.log(userReqs.data);
        let temp = userReqs.data;
        setFriendsArr([...friendsArr, ...temp])
    }
    useEffect(function(){
        axios.get('/api/friends').then(function(data){
            initReqArray(data);
        })
    }, []);
    return (
        <div className="sendreq-wrapper">
            <div>
            <img src="../images/ship-medal-des.png" alt=""/>
                <ul>{friendsArr.map(function(e){
                    return (
                        <div>
                            <form>
                        <h1><h1 className="h1ele" name={e._id}>{e.name}</h1> 
                    <input className="sendreqinp" onChange={handleChange}></input>
                    <button name={e._id} type="submit" className="btn btn-lg btn-primary" onClick={handleClick}>Send a request</button>
                        </h1></form>
                        </div>
                    )
                })}</ul>
            </div>
        </div>

    )
}

Sendreq.propTypes = {

}

export default Sendreq;
