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

module.exports = router;