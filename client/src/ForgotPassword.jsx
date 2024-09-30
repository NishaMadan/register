import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        axios.post('/forgot-password', { email })
            .then((response) => {
                alert('OTP sent to your email');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
            <div className="bg-white p-3 rounded w-25">
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" className="form-control" placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Send OTP</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
