import React, {useEffect, useState} from 'react'
import axios from 'axios'
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
    })
    const [friends, setFriends] = useState(null);
    const [friendRequests, setFriendRequests] = useState(null);
    return (
        <div className="friendsPageWrapper">
            <div className="friendsWrapper">
                {friends == null ? "No friends yet" : friends.map(friend => (
                    <div className="friendWrapper">

                    </div>
                ))}
            </div>
            <div className="friendRequestsWrapper">
                Friend requests listed here
            </div>
        </div>
    )
}

Friends.propTypes = {

}

export default Friends
