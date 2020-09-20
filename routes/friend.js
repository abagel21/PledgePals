const express = require("express")
const router = express.Router();

const User = require("../models/User")

/**
 * Returns the user's friends
 */
router.get("/", async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const friends = await Promise.all(user.friends.map(async(friend_id) => {
            const friendUser = await User.findById(friend_id);
            return { name: friendUser.name, _id: friendUser._id };
        }))
        res.json(friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

/**
 * Returns the user's friend requests
 */
router.get("/requests", async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const friendRequests = await Promise.all(user.friendRequests.map(async(friend_id) => {
            const friendUser = await User.findById(friend_id);
            return friendUser;
        }))
        res.json(friendRequests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

/**
 * Make a friend request
 */
router.post("/:user_id", async(req, res, next) => {
    if (!req.user) return res.status(401).send();
    try {
        const user = await User.findById(req.user._id);
        if (user.sentFriendRequests.includes(req.params.user_id.toString()) || user.friends.includes(req.params.user_id.toString())) res.status(400).send();
        const friend = await User.findById(req.params.user_id);
        friend.friendRequests.push(user._id);
        user.sentFriendRequests.push(friend._id);
        await user.save();
        await friend.save();
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})

/**
 * Accept a friend request
 */
router.put("/:user_id", async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.friendRequests.includes(req.params.user_id.toString())) res.status(400).send();
        const friend = await User.findById(req.params.user_id);
        user.friendRequests = await user.friendRequests.filter(friend_id => friend_id.toString() != req.params.user_id.toString())
        friend.sentFriendRequests = await friend.sentFriendRequests.filter(friend_id => friend_id.toString() != req.user._id.toString())
        await friend.friends.push(user._id);
        await user.friends.push(friend._id);
        await user.save();
        await friend.save();
        res.status(200).json(await Promise.all(user.friendRequests.map(async(friend_id) => {
            const friendUser = await User.findById(friend_id);
            return friendUser;
        })));
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})

/**
 * Reject a friend request
 */
router.delete("/:user_id", async(req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user.friendRequests.includes(req.params.user_id.toString())) res.status(400).send();
        const friend = await User.findById(req.params.user_id);
        user.friendRequests = await user.friendRequests.filter(friend_id => friend_id.toString() != req.params.user_id.toString())
        friend.sentFriendRequests = await friend.sentFriendRequests.filter(friend_id => friend_id.toString() != req.user._id.toString())
        await user.save();
        await friend.save();
        res.status(200).json(await Promise.all(user.friendRequests.map(async(friend_id) => {
            const friendUser = await User.findById(friend_id);
            return friendUser;
        })));
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;