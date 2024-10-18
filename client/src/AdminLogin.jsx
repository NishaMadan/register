
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [adminId, setAdminId] = useState(''); // State for admin ID
    const [password, setPassword] = useState(''); // State for password
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Send login request to backend
        axios.post('http://localhost:5000/api/auth/admin', { adminId, password })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token); // Save token in localStorage
                navigate('/admindashboard'); // Redirect to admin dashboard after login
            })
            .catch((error) => {
                console.error('Error during login:', error.response ? error.response.data : error);
                alert('Invalid Admin ID or Password');
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
            <div className="bg-white p-3 rounded w-25">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="adminId"style={{color: 'black'}} ><strong>Admin ID</strong></label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Admin ID"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                            required
                            style={{
                                color: 'black', // Text color
                                padding: '10px 15px', // Padding: 10px top/bottom, 15px left/right
                                width: '100%', // Full width
                                border: '1px solid grey', // Border color
                                borderRadius: '4px', // Rounded corners
                                marginBottom: '2px', // Margin below the input
                                fontSize: '16px', // Font size
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" style={{color: 'black'}}><strong>Password</strong></label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                color: 'black', // Text color
                                padding: '10px 15px', // Padding: 10px top/bottom, 15px left/right
                                width: '100%', // Full width
                                border: '1px solid grey', // Border color
                                borderRadius: '4px', // Rounded corners
                                marginBottom: '2px', // Margin below the input
                                fontSize: '16px', // Font size
                            }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: 'black', color: 'white' }}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AdminLogin() {
//     const [adminId, setAdminId] = useState(''); // State for admin ID
//     const [password, setPassword] = useState(''); // State for password
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Send login request to backend
//         axios.post('http://localhost:5000/api/admin', { adminId, password })
//             .then((response) => {
//                 console.log(response.data);
//                 localStorage.setItem('token', response.data.token); // Save token in localStorage
//                 navigate('/admindashboard'); // Redirect to the upload page after login
//             })
//             .catch((error) => {
//                 console.error(error);
//                 alert('Invalid Admin ID or Password');
//             });
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Admin Login</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label htmlFor="adminId"><strong>Admin ID</strong></label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter Admin ID"
//                             value={adminId}
//                             onChange={(e) => setAdminId(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary w-100">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AdminLogin;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AdminLogin() {
//     const [adminId, setAdminId] = useState('');  // Initial state for admin ID
//     const [password, setPassword] = useState(''); // Initial state for password
//     const navigate = useNavigate();

//     // List of valid admin credentials
//     const adminCredentials = [
//         { email: 'admin1@gmail.com', password: 'password1' },
//         { email: 'admin2@gmail.com', password: 'password2' },
//         { email: 'admin3@gmail.com', password: 'password3' }
//     ];

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Check if entered credentials match any of the admins
//         const validAdmin = adminCredentials.find(
//             admin => admin.email === adminId && admin.password === password
//         );

//         if (validAdmin) {
//             // If valid, simulate API call and navigate to upload page
//             axios.post('/admin/login', { adminId, password })
//                 .then((response) => {
//                     console.log(response.data);
//                     // Redirect to file upload page after login
//                     navigate('/upload');
//                 })
//                 .catch((error) => {
//                     console.error(error);
//                 });
//         } else {
//             // Handle invalid credentials
//             alert('Invalid Admin ID or Password. Please try again.');
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Admin Login</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label htmlFor="adminId"><strong>Admin ID</strong></label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter Admin ID"
//                             value={adminId}
//                             onChange={(e) => setAdminId(e.target.value)} 
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)} 
//                             required
//                         />
//                     </div>
//                     <button type="submit" style={{ backgroundColor: 'darkgrey', color: 'white' }} className="btn w-100">
//                         SignIn
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AdminLogin;
