import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OtpVerification.css';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp
      });

      if (response.data.message === 'OTP verified successfully') {
        navigate('/reset-password', { state: { email } });
      } else {
        setError('OTP verification failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Error verifying OTP.');
    }
  };

  return (
    <div className='otp-container '>
      <h4>OTP Verification</h4>
      {error && <div>{error}</div>}
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="otp-input"
          style={{height: 30, width: 300}}
        />
        <button type="submit" className="otp-button">Verify OTP</button>
      </form>
    </div>
  );
}

export default OtpVerification;
