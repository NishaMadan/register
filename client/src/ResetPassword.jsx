import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResetPassword.css';
function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        newPassword
      });

      if (response.data.message === 'Password reset successfully') {
        navigate('/signin');
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while resetting the password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Reset Password</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
           className="password-input"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
           className="password-input"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={loading} className="reset-button">
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      {error && <p className="reset-button">{error}</p>} {/* Display error message */}
    </div>
  );
}

export default ResetPassword;



// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ResetPassword() {
//   const [newPassword, setNewPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
//         email,
//         otp,
//         newPassword
//       });

//       if (response.data.message === 'Password reset successfully') {
//         navigate('/login');
//       } else {
//         console.log(response.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h4>Reset Password</h4>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           required
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter New Password"
//           value={newPassword}
//           required
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ResetPassword() {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Validate password match
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
//         email,
//         otp,
//         newPassword
//       });

//       if (response.data.message === 'Password reset successfully') {
//         navigate('/login');
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An error occurred while resetting the password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h4>Reset Password</h4>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           required
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter New Password"
//           value={newPassword}
//           required
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           required
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Resetting...' : 'Reset Password'}
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
//     </div>
//   );
// }

// export default ResetPassword;


// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function ResetPassword() {
//   const [newPassword, setNewPassword] = useState('');
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
//         email,
//         otp,
//         newPassword
//       });

//       if (response.data.message === 'Password reset successfully') {
//         navigate('/login');
//       } else {
//         setError(response.data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An error occurred while resetting the password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h4>Reset Password</h4>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           required
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter New Password"
//           value={newPassword}
//           required
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Resetting...' : 'Reset Password'}
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
//     </div>
//   );
// }

// export default ResetPassword;
