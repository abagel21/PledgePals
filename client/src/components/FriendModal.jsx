import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery';
import axios from 'axios';

const FriendModal = ({visible, setVisible}) => {
    useEffect(() => {
        async function middleFunc() {
            const res = await axios.get("/api/auth/users");
            console.log(res.data);
            setUsers(res.data);
        }
        middleFunc();
    }, [visible])
    $(".friendModalCover").on('click', (e) => {
        if(e.target.dataset.status) setVisible("false");
    })
    const [users, setUsers] = useState(null);
    const [userQuery, setUserQuery] = useState("")
    const onChange = async (e) => {
        setUserQuery(e.target.value);

    }
    const addFriend = async (e) => {
        // send friend request
        setVisible("false");
        const res = await axios.post(`/api/friends/${e.target.name}`)
    }
    return (
        <div className="friendModalCover" data-status={visible}>
            <div className="friendModal">
            <input className="userSearch" type="text" onChange = {e => onChange(e)} value = {userQuery} placeholder="Search for a user"/>
            <div className="userResults">
                {users != null ? users.filter(user => user.name.substring(0, userQuery.length) == userQuery).map(user => (
                    <button name={user._id} onClick = {(e) => {
                        console.log("CLICKED")
                        addFriend(e)}}>{user.name}</button>
                    )) : "Loading..."}
            </div>
            </div>
        </div>
    )
}

FriendModal.propTypes = {

}

export default FriendModal
