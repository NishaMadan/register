import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Replace with actual admin login API
        axios.post('/admin/login', { adminId, password })
            .then((response) => {
                console.log(response.data);
                // Redirect to file upload page after login
                navigate('/upload');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
            <div className="bg-white p-3 rounded w-25">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="adminId"><strong>Admin ID</strong></label>
                        <input type="text" className="form-control" placeholder="Enter Admin ID"
                            onChange={(e) => setAdminId(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" className="form-control" placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign In</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
