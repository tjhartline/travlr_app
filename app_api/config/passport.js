//Tammy Hartline

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Configure the local strategy for use by Passport.
passport.use(new LocalStrategy({
 usernameField: 'email'
},

// The verify callback for the local strategy.
async (username, password, done) => {
    try {
        const user = await users.findOne({ email: username });

        // Is user valid
        if (!user) {
            return done(null, false, { message: 'Unrecognized username' });
        }

        // Is password valid
        if (!user.validatePassword(password)) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // User and Password is valid
        return done(null, user);
    } catch (e) {
        return done(e);
    }
}
))
