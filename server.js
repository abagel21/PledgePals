const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");

const connectDB = require('./config/db');
const User = require("./models/User");
const users = require("./routes/auth")
const medallions = require('./routes/medallion')
const friends = require('./routes/friend')
const { local } = require("./config/passport");

connectDB();

const app = express();
// body parsing for express
app.use(express.json({ extended: false }));

console.log("initializing session");
app.use(
    session({
        secret: "thisisthesecret",
        cookie: { maxAge: 10800000 },
        store: new MongoStore({ url: "mongodb+srv://dbuser1:pledgepals@cluster0.etnsm.mongodb.net/PledgePals?retryWrites=true&w=majority" }),
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
local(passport);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

// deserializes user and attaches user object to req.user from session
passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        console.log("deserializing error")
        return done(err);
    }
});

const PORT = process.env.PORT || 80;
console.log("HERE")
    //Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

app.use("/api/auth", users)
app.use("/api/medallion", medallions)
app.use("/api/friends", friends);

let server = app.listen(PORT, () => {
    console.log("Server running on " + PORT);
})