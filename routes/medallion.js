const express = require('express');
const Medallion = require('../models/Medallion');
const router = express.Router();
const User = require('../models/User');

/**
 * Creates a medallion request
 */
router.post('/create/:recipient', async(req, res, next) => {
    if (req.user == null) res.status(401)
    try {
        const sender = await User.findById(req.user._id);
        // if (!sender.friends.includes(recipient._id)) res.status(400).send();
        // const recipient = await User.findById(req.params.recipient);
        const recipient = await User.findById(req.params.recipient)
        const { content } = req.body;
        const senderName = sender.name;
        const recipientName = recipient.name;
        const newMedallion = new Medallion({ sender, recipient, content, senderName, recipientName });
        sender.sentPendingMedallions.push(newMedallion);
        recipient.pendingMedallions.push(newMedallion);
        await newMedallion.save();
        await sender.save();
        await recipient.save();
        res.json(newMedallion);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})

/**
 * Accepts a medallion request
 */
router.put('/:medallion_id', async(req, res, next) => {
    if (req.user == null) res.status(401)
    try {
        const medallion = await Medallion.findById(req.params.medallion_id);
        const sender = await User.findById(medallion.sender);
        const recipient = await User.findById(medallion.recipient);
        const sentPendingMedallions = await sender.sentPendingMedallions.filter(x => x._id.toString() != req.params.medallion_id.toString());
        // if (sentPendingMedallions.length == sender.sentPendingMedallions) res.status(400).send();
        sender.sentPendingMedallions = sentPendingMedallions;
        recipient.pendingMedallions = await recipient.pendingMedallions.filter(x => x._id.toString() != req.params.medallion_id.toString());
        await sender.sentMedallions.push(medallion._id);
        await recipient.receivedMedallions.push(medallion._id);
        await sender.save();
        await recipient.save();
        res.status(200).json(await Promise.all(await recipient.pendingMedallions.map(async medal => {
            return await Medallion.findById(medal);
        })));
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})

/**
 * completes a medallion
 */
router.put('/complete/:medallion_id', async(req, res, next) => {
    if (req.user == null) res.status(401)
    try {
        const medallion = await Medallion.findById(req.params.medallion_id);
        const sender = await User.findById(medallion.sender);
        const recipient = await User.findById(medallion.recipient);
        sender.sentMedallions = await sender.sentMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        recipient.receivedMedallions = await recipient.receivedMedallions.filter(x => x._id.toString() != req.params.medallion_id);
        await sender.completedSentMedallions.push(medallion._id);
        await recipient.completedMedallions.push(medallion._id);
        await sender.save();
        await recipient.save();
        res.status(200).json(await Promise.all(await req.user.receivedMedallions.map(async medal => {
            return await Medallion.findById(medal);
        })));
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})

/**
 * Rejects a medallion
 */
router.delete('/:medallion_id', async(req, res, next) => {
    if (req.user == null) res.status(401)
    try {
        const medallion = await Medallion.findById(req.params.medallion_id);
        const sender = await User.findById(medallion.sender);
        const recipient = await User.findById(medallion.recipient);
        sender.sentPendingMedallions = sender.sentPendingMedallions.filter(x => x._id.toString() != req.params.medallion_id.toString());
        recipient.pendingMedallions = recipient.pendingMedallions.filter(x => x._id.toString() != req.params.medallion_id.toString());
        await sender.save();
        await recipient.save();
        res.status(200).json(await Promise.all(await recipient.pendingMedallions.map(async medal => {
            return await Medallion.findById(medal);
        })));
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})

/**
 * Gets all of a user's pending medallions
 */
router.get('/requests', async(req, res, next) => {
        if (req.user == null) res.status(401)
        try {
            const user = await User.findById(req.user._id);
            const medallions = await Promise.all(user.pendingMedallions.map(async(medallion_id) => {
                const medal = await Medallion.findById(medallion_id)
                console.log(medal);
                return medal;
            }))
            res.json(medallions);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's pending sent medallions
     */
router.get('/pending', async(req, res, next) => {
        if (req.user == null) res.status(401)
        try {
            const user = await User.findById(req.user._id);
            const medallions = await Promise.all(user.sentPendingMedallions.map(async(medallion_id) => {
                const medal = await Medallion.findById(medallion_id)
                console.log(medal);
                return medal;
            }))
            res.json(medallions);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of the medallions a user has to complete
     */
router.get('/', async(req, res, next) => {
        if (req.user == null) res.status(401)
        try {
            const user = await User.findById(req.user._id);
            const medallions = await Promise.all(user.receivedMedallions.map(async(medallion_id) => {
                const medal = await Medallion.findById(medallion_id)
                medal.name = user.name;
                console.log(medal);
                return medal;
            }))
            console.log(medallions);
            res.json(medallions);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's completed medallions
     */
router.get('/completed', async(req, res, next) => {
        if (req.user == null) res.status(401)
        try {
            const user = await User.findById(req.user._id);
            const medallions = await Promise.all(user.completedMedallions.map(async(medallion_id) => {
                const medal = await Medallion.findById(medallion_id)
                console.log(medal);
                return medal;
            }))
            res.json(medallions);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's sent medallions
     */
router.get('/sent', async(req, res, next) => {
        if (req.user == null) res.status(401)
        try {
            const user = await User.findById(req.user._id);
            const medallions = await Promise.all(user.sentMedallions.map(async(medallion_id) => {
                const medal = await Medallion.findById(medallion_id)
                console.log(medal);
                return medal;
            }))
            console.log(medallions)
            res.json(medallions);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    })
    /**
     * Gets all of a user's completed sent medallions
     */
router.get('/sent/completed', async(req, res, next) => {
    if (req.user == null) res.status(401)
    try {
        const user = await User.findById(req.user._id);
        const medallions = await Promise.all(user.completedSentMedallions.map(async(medallion_id) => {
            const medal = await Medallion.findById(medallion_id)
            console.log(medal);
            return medal;
        }))
        res.json(medallions);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
})


module.exports = router;