import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password }, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(response.data);
            navigate('/upload'); // Navigate on successful login
        } catch (error) {
            setError(error.response?.data?.message || 'Something went wrong. Please try again.');
            console.error('Error signing in:', error.response?.data || error.message);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign In</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignIn}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="input-group-text">
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-secondary w-100">Sign In</button>
                </form>
                <p className="mt-3">
                    Forgot Password? <Link to="/forgot-password" className="text-danger">Click here</Link>
                </p>
                <p>
                    Don't have an account? <Link to="/signup" className="text-danger">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
