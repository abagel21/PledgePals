const mongoose = require("mongoose");
const db = "mongodb+srv://dbuser1:pledgepals@cluster0.etnsm.mongodb.net/PledgePals?retryWrites=true&w=majority";

const connectDB = async() => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
        console.log("Database Connected")
    } catch (err) {
        console.log("Normal Database Connection Error");
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;