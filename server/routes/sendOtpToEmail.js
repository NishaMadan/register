const nodemailer = require('nodemailer');


// Function to generate a 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sendOtpToEmail = async (email) => {
  const otp = generateOtp();  // Generate a 6-digit OTP

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Outgoing server
    auth: {
      user: process.env.EMAIL_USER, // Sender email address
      pass: process.env.EMAIL_PASS, // Sender email password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email
    to: email, // Recipient email
    subject: 'Your OTP Code', // Email subject
    text: `Your OTP code is: ${otp}`, // Email body
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    return otp;  // Return the OTP for further use (e.g., store in DB)
  } catch (error) {
    console.error('Error sending OTP:', error);
    return null;  // Return null in case of an error
  }
};

module.exports = sendOtpToEmail;




// // const nodemailer = require('nodemailer');

// // const sendOtpToEmail = async (email, otp) => {
// //     console.log('Sending OTP to:', email);
// //     console.log('Generated OTP:', otp); // Ensure OTP is generated and being sent

// //     const transporter = nodemailer.createTransport({
// //         service: 'gmail',
// //         auth: {
// //             user: process.env.EMAIL_USER,
// //             pass: process.env.EMAIL_PASS,
// //         },
// //     });

// //     const mailOptions = {
// //         from: process.env.EMAIL_USER,
// //         to: email,
// //         subject: 'Your OTP Code',
// //         text: `Your OTP code is ${otp}`,
// //     };

// //     try {
// //         await transporter.sendMail(mailOptions);
// //         return true;
// //     } catch (error) {
// //         console.error('Error sending email:', error); // Log the error for debugging
// //         return false;
// //     }
// // };


// // module.exports = { sendOtpToEmail };


// const nodemailer = require('nodemailer');

// // Function to generate a 6-digit OTP
// function generateOtp() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }

// const sendOtpToEmail = async (email) => {
//   const otp = generateOtp();  // Generate a 6-digit OTP

//   const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//       },
//   });

//   const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Your OTP Code',
//       text: `Your OTP code is: ${otp}`,
//   };

//   try {
//       await transporter.sendMail(mailOptions);
//       console.log(`OTP sent to ${email}: ${otp}`);
//       return otp;  // Return the OTP
//   } catch (error) {
//       console.error('Error sending OTP:', error.message); // Log the error message
//       throw new Error('Failed to send OTP');  // Rethrow the error for further handling
//   }
// };


// module.exports = sendOtpToEmail;