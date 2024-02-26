//Tammy Hartline

// Import necessary modules
const passport = require('passport');
const mongoose = require('mongoose');

// Controller function for user registration
const register = async (req, res) => {
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({'message': 'Name, email, and password are required'});
    }

    // Create a new user instance
    const user = new (mongoose.model('users'));
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    try {
        // Save the user to the database
        await user.save();
        
        // Generate JWT token for the registered user
        const token = user.generateJwt();
        
        // Return success response with the token
        return res.status(200).json({token});
    } catch (e) {
        // Return error response if registration fails
        return res.status(400).json(e);
    }
};

// Controller function for user login
const login = (req, res, next) => {
    // Validate required fields
    if (!req.body.email || !req.body.password) {
        res.status(400).json({'message': 'Email and password are required'});
    }

    // Authenticate user using Passport local strategy
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // Return error response if authentication fails
            return res.status(400).json(err);
        }

        if (!user) {
            // Return unauthorized response if user not found
            return res.status(401).json(info);
        }

        // Generate JWT token for the authenticated user
        const token = user.generateJwt();
        
        // Return success response with the token
        return res.status(200).json({token});
    })(req, res, next);
};

// Export the controller functions
module.exports = {
    register,
    login
};
