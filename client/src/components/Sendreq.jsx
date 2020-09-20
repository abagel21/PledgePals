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
        document.querySelector(".sendreqinp").value = "";
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
            <img src="../images/ship-medal-des.png" alt="" className="sendImg"/>
                <ul>{friendsArr.map(function(e){
                    return (
                        <div>
                            <form>
                        <div className="reqWrapper"><h1 className="h1ele" name={e._id}>{e.name}</h1> 
                    <input className="sendreqinp" onChange={handleChange} placeholder="Write a Request"></input>
                    <button name={e._id} type="submit" className="reqButton" onClick={handleClick}>Send</button>
                        </div></form>
                        </div>
                    )
                })}</ul>
        </div>

    )
}

Sendreq.propTypes = {

}

export default Sendreq;
