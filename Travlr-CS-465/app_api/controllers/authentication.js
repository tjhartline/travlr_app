const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Register a new user
const register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields are required" });
    }

    // Create a new user
    const user = new User();

    // Set the user's credentials
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    // Save the user
    user.save((err) => {

        // Generate a JWT
        if (err) {
            res
                .status(400)
                .json(err);
        }
        // If the user is saved
        else {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        }
    })
};

// Log in a user
const login = (req, res) => {

    // Check if the email and password are provided
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields are required" });
    }

    // Authenticate the user
    passport.authenticate('local', (err, user, info) => {
        // If Passport throws/catches an error
        if (err) {
            return res
                .status(404)
                .json(err);
        }
        // If a user is found
        if (user) {
            const token = user.generateJwt();
            res
                .status(200)
                .json({ token });
        }
        // If user is not found
        else {
            res
                .status(401)
                .json(info);
        }
        // If a user is found
    })(req, res);
};

// Export the functions
module.exports = {
    register,
    login
};