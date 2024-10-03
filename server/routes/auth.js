// routes/auth.js
const express = require('express');
const User = require('../models/User'); // Ensure you're using the correct model
const jwt = require('jsonwebtoken');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // To generate OTPs

// Configure nodemailer transporter (using Gmail in this example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail email address
        pass: process.env.EMAIL_PASS, // Your Gmail password or App password (for security reasons, use environment variables)
    }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a random 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Store the OTP in the user's document (or a separate collection if needed)
        // Optionally, you can set an expiration time for the OTP
        user.otp = otp;
        user.otpExpiry = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. This OTP is valid for 15 minutes.`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.json({ message: 'OTP sent to email' });
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;



// const express = require('express');
// const User = require('../models/User'); // Ensure you're using the correct model
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const nodemailer = require('nodemailer');

// // Register route
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     try {
//         const newUser = new User({ name, email, password }); // Use User model to create a new user
//         await newUser.save(); // Save the user to the database
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(400).json({ error: error.message });
//     }
// });

// // Login route
// router.post('/signin', async (req, res) => {
//     const { email, password } = req.body;
//     console.log('Login attempt:', { email, password }); // Log the email and password

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('User not found'); // Log if user is not found
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await user.comparePassword(password);
//         console.log('Password match:', isMatch); // Log the password comparison result

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(400).json({ error: error.message });
//     }
// });



// // Forgot password route
// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         // Send OTP logic here (using nodemailer)
//         res.json({ message: 'OTP sent to email' });
//     } catch (error) {
//         console.error(error); // Log the error for debugging
//         res.status(400).json({ error: error.message });
//     }
// });

// module.exports = router;
