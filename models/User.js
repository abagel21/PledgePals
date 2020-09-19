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
    sentMedallions: [Schema.Types.ObjectId],
    receivedMedallions: [Schema.Types.ObjectId]
})

const User = new mongoose.model("User", UserSchema);
module.exports = User;