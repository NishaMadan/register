const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
<<<<<<< HEAD
const sendOtpToEmail = require('./sendOtpToEmail');
=======
const  sendOtpToEmail = require('./sendOtpToEmail');
>>>>>>> 63d4a5c569012ac4c7b3463064e61b79b07a6df8
const router = express.Router();

// JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
// Admin Credentials (you can hardcode these or move them to env variables)
const adminCredentials = [
    { email: 'admin1@gmail.com', password: 'adminPassword1' },
    { email: 'admin2@gmail.com', password: 'adminPassword2' },
    { email: 'admin3@gmail.com', password: 'adminPassword3' }
];

// Admin Login Route
router.post('/admin', (req, res) => {
    const { adminId, password } = req.body;

    // Find matching admin credentials
    const validAdmin = adminCredentials.find(
        admin => admin.email === adminId && admin.password === password
    );

    if (validAdmin) {
        // If valid, create a JWT token
        const token = jwt.sign({ adminId, isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });

        // Return success message and token
        return res.status(200).json({
            message: 'Admin login successful',
            token
        });
    } else {
        // If credentials don't match, return error
        return res.status(400).json({ message: 'Invalid Admin ID or password' });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Request received:', req.body);  // Check if correct data is coming through
    try {
        // Ensure the required fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create the new user (add password hashing if not done already)
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Server error:', error);  // Log the error in the console
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Login Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Call your OTP sending function here
        const otpSent = await sendOtpToEmail(email);
        
        if (otpSent) {
            res.status(200).json({ message: 'OTP sent to email' });
        } else {
            res.status(500).json({ message: 'Failed to send OTP' });
        }
    } catch (error) {
        console.error('Error in forgot-password route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// POST route for OTP verification and password reset
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check if OTP is correct and not expired
        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Update user's password
        user.password = await bcrypt.hash(newPassword, 10);  // Hash new password
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;


