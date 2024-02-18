const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Configure the local strategy for use by Passport.
passport.use(new LocalStrategy({
 usernameField: 'email'
},

// The verify callback for the local strategy.
(username, password, done) => {
 User.findOne({ email: username }, (err, user) => {
 if (err) { return done(err); }
 if (!user) {
 return done(null, false, {
 message: 'The username you entered was not found or is incorrect.'
 });
 }

 // Check if the password is correct
 if (!user.validPassword(password)) {
 return done(null, false, {
 message: 'The password you entered is invalid.'
 });
 } 

 // If the credentials are correct, return the user object
 return done(null, user);
 });
}
));