const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
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

// Forgot Password (OTP)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes

    // Save OTP and expiry in the user document (extend schema to save OTP and expiry)
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();

        // Send OTP to user's email
        const transporter = nodemailer.createTransport({ /* SMTP Settings */ });
        const mailOptions = {
            from: 'noreply@yourapp.com',
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP is ${otp}. It will expire in 15 minutes.`
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;


