import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Friends.css";
import FriendModal from "./FriendModal";

const Friends = (props) => {
  const [friendRequests, setFriendRequests] = useState(null);
  useEffect(() => {
    async function wrapperFunction() {
      try {
        let res = await axios.get("/api/friends");
        if (res.data.length) setFriends(res.data);
        console.log(res.data)
        res = await axios.get("/api/friends/requests");
        if (res.data.length) setFriendRequests(res.data);
      } catch (err) {
        console.error(err.message);
      }
    }
    wrapperFunction();
  }, [friendRequests]);
  const [modalVisible, setModalVisible] = useState("false");
  const [friends, setFriends] = useState(null);
  const [friendQuery, setFriendQuery] = useState("");
  const onChange = (e) => {
    setFriendQuery(e.target.value);
  };

  const acceptRequest = async (e) => {
    console.log(e.target.parentNode.getAttribute("name"));
    const res = await axios.put(`/api/friends/${e.target.parentNode.getAttribute("name")}`);
    setFriendRequests(res.data);
};
  const rejectRequest = async (e) => {
    console.log(e.target.parentNode.getAttribute("name"));
    const res = await axios.delete(`/api/friends/${e.target.parentNode.getAttribute("name")}`);
    setFriendRequests(res.data);
  };
  return (
    <div className="friendsPageWrapper" data-status={modalVisible}>
      <FriendModal visible={modalVisible} setVisible={setModalVisible} />
      <div className="friendsBanner">
        <input
          className="friendsSearch"
          type="text"
          onChange={(e) => onChange(e)}
          value={friendQuery}
          placeholder="Search for a friend"
        />
        <img src="../images/friends-bg.png" alt="" />
      </div>
      <div className="friends">
        <div className="friendsWrapper">
          <button
            className="addFriendButton"
            id="addFriendButton"
            onClick={(e) => setModalVisible("true")}
          >
            <label className="addLabel" htmlFor="addFriendButton">
              +
            </label>
          </button>
          {friends == null ? (
            <h2 className="friendsError">You don't have any friends yet.</h2>
          ) : (
            friends
              .filter((friend) => {
                return (
                  friend.name.substring(0, friendQuery.length) == friendQuery
                );
              })
              .map((friend) => (
                <div className="friendWrapper" name={friend._id}>
                  <label className="friendName">{friend.name}</label>
                </div>
              ))
          )}
        </div>
      </div>
      <div className="friendRequestsWrapper">
        <h3 className="friendRequestsHeader">REQUESTS</h3>
        <div className="friendRequests">
          {friendRequests == null || friendRequests.length == 0 ? (
            <h1 className="error">You don't have any friend requests yet.</h1>
          ) : (
            friendRequests.map((friend) => (
              <div className="friendWrapper" name={friend._id}>
                <label className="friendName">{friend.name}</label>
                <label
                  className="friendAccept"
                  onClick={(e) => acceptRequest(e)}
                >
                  Accept
                </label>
                <label
                  className="friendReject"
                  onClick={(e) => rejectRequest(e)}
                >
                  Reject
                </label>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


export default Friends;
