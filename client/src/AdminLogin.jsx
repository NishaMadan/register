import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [adminId, setAdminId] = useState('');  // Initial state for admin ID
    const [password, setPassword] = useState(''); // Initial state for password
    const navigate = useNavigate();

    // List of valid admin credentials
    const adminCredentials = [
        { email: 'admin1@gmail.com', password: 'password1' },
        { email: 'admin2@gmail.com', password: 'password2' },
        { email: 'admin3@gmail.com', password: 'password3' }
    ];

    const handleLogin = (e) => {
        e.preventDefault();

        // Check if entered credentials match any of the admins
        const validAdmin = adminCredentials.find(
            admin => admin.email === adminId && admin.password === password
        );

        if (validAdmin) {
            // If valid, simulate API call and navigate to upload page
            axios.post('/admin/login', { adminId, password })
                .then((response) => {
                    console.log(response.data);
                    // Redirect to file upload page after login
                    navigate('/upload');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            // Handle invalid credentials
            alert('Invalid Admin ID or Password. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
            <div className="bg-white p-3 rounded w-25">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="adminId"><strong>Admin ID</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Admin ID"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <button type="submit" style={{ backgroundColor: 'darkgrey', color: 'white' }} className="btn w-100">
                        SignIn
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
