const express = require('express');
const Medallion = require('../models/Medallion');
const router = express.Router();
const User = require('../models/User');
const Medallion = require('../models/Medallion');

/**
 * Creates a medallion request
 */
router.post('/create/:sender/:recipient', async(req, res, next) => {
    try {
        const sender = User.findById(req.params.sender);
        const recipient = User.findById(req.params.recipient);
        const { content, deadline } = req.body;
        const newMedallion = new Medallion({ sender, recipient, content, deadline });
        sender.sentPendingMedallions.push(newMedallion);
        recipient.pendingMedallions.push(newMedallion);
        newMedallion.save();
        sender.save();
        recipient.save();
        res.json(newMedallion);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

/**
 * Accepts a medallion request
 */
router.put('/:medallion_id', async(req, res, next) => {
    try {
        const medallion = Medallion.findById(req.params.medallion_id);
        const sender = User.findById(medallion.sender);
        const recipient = User.findById(medallion.recipient);
        sender.sentPendingMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        recipient.pendingMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        sender.sentMedallions.push(medallion);
        recipient.receivedMedallions.push(medallion);
        sender.save();
        recipient.save();
        res.status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

/**
 * completes a medallion
 */
router.put('/complete/:medallion_id', async(req, res, next) => {
    try {
        const medallion = Medallion.findById(req.params.medallion_id);
        const sender = User.findById(medallion.sender);
        const recipient = User.findById(medallion.recipient);
        sender.sentMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        recipient.receivedMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        sender.completedSentMedallions.push(medallion);
        recipient.completedMedallions.push(medallion);
        sender.save();
        recipient.save();
        res.status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

/**
 * Rejects a medallion
 */
router.delete('/:medallion_id', async(req, res, next) => {
    try {
        const medallion = Medallion.findById(req.params.medallion_id);
        const sender = User.findById(medallion.sender);
        const recipient = User.findById(medallion.recipient);
        sender.sentPendingMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        recipient.pendingMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        sender.save();
        recipient.save();
        res.status(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

/**
 * Gets all of a user's pending medallions
 */
router.get('/pending/:user_id', async(req, res, next) => {
        try {
            const user = User.findById(req.params.user_id);
            res.json(user.pendingMedallions)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's pending sent medallions
     */
router.get('/pending/:user_id', async(req, res, next) => {
        try {
            const user = User.findById(req.params.user_id);
            res.json(user.sentPendingMedallions)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of the medallions a user has to complete
     */
router.get('/pending/:user_id', async(req, res, next) => {
        try {
            const user = User.findById(req.params.user_id);
            res.json(user.receivedMedallions)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's completed medallions
     */
router.get('/pending/:user_id', async(req, res, next) => {
        try {
            const user = User.findById(req.params.user_id);
            res.json(user.completedMedallions)
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's sent medallions
     */
router.get('/pending/:user_id', async(req, res, next) => {
        try {
            const user = User.findById(req.params.user_id);
            res.json(user.sentMedallions);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's completed sent medallions
     */
router.get('/pending/:user_id', async(req, res, next) => {
    try {
        const user = User.findById(req.params.user_id);
        res.json(user.completedSentMedallions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


module.exports = router;