const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();


router.post("/register", async(req, res, next) => {
    console.log("register hit");
    req.session.tires = 0;
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400);
        const { name, email, password } = req.body;
        console.log(password)
        const newUser = new User({
            name,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

router.post("/login", async(req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            console.log(error)
            return next(err);
        }
        if (info) {
            res.status(401).json({ msg: info })
        }
        if (!user) {
            return;
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            res.json({ user: req.user });
            req.session.tries = 0;
        });
    })(req, res, next);
    console.log("login successful");
})

/**
 * return the current user if signed in
 */
router.get("/", (req, res, next) => {
    res.json(req.user);
})

/**
 * Return all users
 */
router.get("/users", async(req, res, next) => {
    const users = await User.find({ _id: { $ne: req.user._id } });
    res.json(users);
})


/**
 * Make a friend request
 */
router.post("/friends/:user_id", (req, res, next) => {
    const newFriend = User.findById(req.param.user_id);
    const user = User.findById(req.user._id);
    if (user.friends.includes(newFriend._id)) return res.status(400).send();
    newFriend.friendRequests.push(user._id);
    user.sentFriendRequests.push(newFriend._id);
    user.save();
    newFriend.save();
    res.status(200);
})

/**
 * Accept a friend request
 */
router.post("/friends/:user_id", (req, res, next) => {
    const newFriend = User.findById(req.param.user_id);
    const user = User.findById(req.user._id);
    user.friendRequests.filter(id => id.toString() != newFriend._id.toString());
    newFriend.sentFriendRequests.filter(id => id.toString() != user._id.toString());
    newFriend.friends.push(user._id);
    user.friends.push(newFriend._id);
    user.save();
    newFriend.save();
    res.status(200);
})

module.exports = router;