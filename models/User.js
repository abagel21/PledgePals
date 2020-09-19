const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pendingMedallions: [Schema.Types.ObjectId],
    sentMedallions: [Schema.Types.ObjectId],
    sentPendingMedallions: [Schema.Types.ObjectId],
    receivedMedallions: [Schema.Types.ObjectId],
    completedMedallions: [Schema.Types.ObjectId],
    completedSentMedallions: [Schema.Types.ObjectId]
})

const User = new mongoose.model("User", UserSchema);
module.exports = User;