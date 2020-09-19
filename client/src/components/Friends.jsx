import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "./styles/Friends.css"
import PropTypes from 'prop-types'

const Friends = props => {
    useEffect(() => {
        async function wrapperFunction() {
            try {
                let res = await axios.get("/api/friends");
                setFriends(res.data);
                res = await axios.get("/api/friends/requests");
                setFriendRequests(res.data);
            } catch(err) {
                console.error(err.message);
            }
        }
        wrapperFunction();
    }, [])
    const [friends, setFriends] = useState(null);
    const [friendRequests, setFriendRequests] = useState(null);
    const [friendQuery, setFriendQuery] = useState("");
    const onChange = (e) => {
        setFriendQuery(e.target.value);
    }
    return (
        <div className="friendsPageWrapper">
            <div className="friendsBanner">
                <input className="friendsSearch" type="text" onChange = {e => onChange(e)} value = {friendQuery} placeholder="Search for a friend"/>
                <img src="../images/friends-bg.png" alt=""/>
            </div>
            <div className="friendsWrapper">
            <button className="addFriendButton" id="addFriendButton"><label className="addLabel" htmlFor="addFriendButton">+</label></button>
                {friends == null ? "No friends yet" : friends.filter(friend => {
                    return friend.name.substring(friendQuery.length) == friendQuery
            }).map(friend => (
                    <div className="friendWrapper">
                        <h4 className="friendName">{friend.name}</h4>
                    </div>
                ))}
            </div>
            <div className="friendRequestsWrapper">
                <h3 className="friendRequestsHeader">Friend Requests</h3>
            {friendRequests == null ? "No friend requests yet" : friendRequests.map(friend => (
                    <div className="friendWrapper">
                        <h4 className="friendName">{friend.name}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

Friends.propTypes = {

}

export default Friends
