const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendOtpToEmail = require('./sendOtpToEmail');
const router = express.Router();
const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,12}$/;
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

// // Register Route
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
// // Register Route
// router.post('/register', async (req, res) => {
//     const { name, email, password } = req.body;
//     console.log('Request received:', req.body);  // Check if correct data is coming through

//     try {
//         // Ensure the required fields are present
//         if (!name || !email || !password) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         // Check if the password meets the strength requirements
//         if (!strongPasswordRegex.test(password)) {
//             return res.status(400).json({
//                 message: 'Password must be 8-12 characters long, include at least one uppercase letter, one number, and one special character.'
//             });
//         }

//         // Check if the user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Hash the password before saving the user
//         const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

//         // Create the new user
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         // Send success response
//         res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//         console.error('Server error:', error);  // Log the error in the console
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// });
//Login Route
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
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    console.log('Sign-In Attempt:', { email, password });

    try {
        // Check for required fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        console.log('User Found:', user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // If successful, return success message or token
        res.status(200).json({ message: 'Sign-in successful' });
    } catch (error) {
        console.error('Sign-in Error:', error);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
});



// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Generate and send OTP
        const otp = await sendOtpToEmail(email); // Receive OTP from the email function
        if (!otp) {
            return res.status(500).json({ message: 'Failed to send OTP' });
        }

        // Set expiry time for OTP (10 minutes)
        const otpExpiry = Date.now() + 10 * 60 * 1000;

        // Update user with OTP and expiry time
        const user = await User.findOneAndUpdate(
            { email },
            { otp, otpExpiry },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error in forgot-password route:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check if user exists and OTP matches and is not expired
        if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // OTP verified successfully
        // Here you can proceed to allow the user to reset their password
        console.log("otp recieved:",otp); // Log the OTP for verification purposes

        // Optionally clear the OTP after verification
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// router.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         return res.status(400).json({ message: 'Email is required' });
//     }

//     try {
//         // Call your OTP sending function here
//         const otpSent = await sendOtpToEmail(email);
        
//         if (otpSent) {
//             res.status(200).json({ message: 'OTP sent to email' });
//         } else {
//             res.status(500).json({ message: 'Failed to send OTP' });
//         }
//     } catch (error) {
//         console.error('Error in forgot-password route:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// router.post('/verify-otp', async (req, res) => {
//     const { email, otp } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
  
//       // Check if OTP is correct and not expired
//       if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
//         return res.status(400).json({ message: 'Invalid or expired OTP' });
//       }
  
//       res.status(200).json({ success: true, message: 'OTP verified successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
// router.post('/reset-password', async (req, res) => {
//     const { email, otp, newPassword } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         // Ensure OTP is correct and not expired
//         if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
//             return res.status(400).json({ message: 'Invalid or expired OTP' });
//         }

//         // Hash the new password and update
//         user.password = await bcrypt.hash(newPassword, 10);
//         user.otp = undefined;
//         user.otpExpiry = undefined;
//         await user.save();

//         res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// POST route for OTP verification and password reset
// router.post('/reset-password', async (req, res) => {
//     const { email, otp, newPassword } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         // Check if OTP is correct and not expired
//         if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
//             return res.status(400).json({ message: 'Invalid or expired OTP' });
//         }

//         // Update user's password
//         user.password = await bcrypt.hash(newPassword, 10);  // Hash new password
//         user.otp = undefined;
//         user.otpExpiry = undefined;
//         await user.save();

//         res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required' });
    }

    try {
        // Find the user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Ensure new password is not the same as the old password
        if (user.password === newPassword) {
            return res.status(400).json({ message: 'New password cannot be the same as the old password' });
        }

        // Update the user's password (hash it if necessary)
        user.password = newPassword; // Ensure you hash the password here
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// // Reset Password Route
// router.post('/reset-password', async (req, res) => {
//     const { email, otp, newPassword } = req.body;

//     if (!email || !otp || !newPassword) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Find the user
//         const user = await User.findOne({ email });

//         if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
//             return res.status(400).json({ message: 'Invalid or expired OTP' });
//         }

//         // Update the user's password (hash it if necessary)
//         user.password = newPassword; // Ensure you hash the password here
//         user.otp = undefined; // Clear OTP after use
//         user.otpExpiry = undefined; // Clear expiry
//         await user.save();

//         res.status(200).json({ message: 'Password reset successfully' });
//     } catch (error) {
//         console.error('Error resetting password:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Store file details in MongoDB
        const newFile = new File({
            companyName: req.body.companyName,
            requirementDescription: req.body.requirementDescription,
            filePath: req.file.path // Save the file path for download later
        });
        await newFile.save(); // Save file info to the database

        res.json({ message: 'File uploaded successfully', file: newFile });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;


