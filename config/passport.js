const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const config = require('config')

//Models
const User = require('../models/User')

exports.local = (passport) => {
    passport.use(new localStrategy({ usernameField: 'email', passReqToCallback: true }, async(req, email, password, done) => {
        if (!req.session.tries) {
            req.session.tries = 0;
        }
        if (req.session.tries > 10) {
            return done(null, false, { message: "You have used too many tries. Try again later" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            req.session.tries += 1;
            return done(null, false, { message: 'Incorrect Email or Password' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                req.session.tries += 1;
                return done(null, false, { message: 'Incorrect Email or Password' });
            }
        } catch (err) {
            return done(err);
        }
    }))
}