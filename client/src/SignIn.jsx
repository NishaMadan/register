// // SignIn.jsx
// import { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './SignIn.css'; 

// function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
//             console.log(response.data);
//             // Redirect to upload page after successful sign-in
//             navigate('/upload');
//         } catch (error) {
//             console.error(error);
//             alert("Invalid credentials, please try again.");
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Sign In</h2>
//                 <form onSubmit={handleSignIn}>
//                     <div className="mb-3">
//                         <label htmlFor="email"><strong>Email</strong></label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Enter Email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter Password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-secondary w-100">Sign In</button>
//                 </form>
//                 <p className="mt-3">
//                     Forgot Password? <Link to="/forgot-password" className="text-danger">Click here</Link>
//                 </p>
//                 <p>
//                     Don't have an account? <Link to="/signup" className="text-danger">Sign Up</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default SignIn;



// import { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();

//     const handleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
//             console.log(response.data);
//             navigate('/upload');
//         } catch (error) {
//             console.error(error);
//             alert("Invalid credentials, please try again.");
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Sign In</h2>
//                 <form onSubmit={handleSignIn}>
//                     <div className="mb-3">
//                         <label htmlFor="email"><strong>Email</strong></label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Enter Email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <div className="input-group">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 className="form-control"
//                                 placeholder="Enter Password"
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <span className="input-group-text">
//                                 <FontAwesomeIcon
//                                     icon={showPassword ? faEyeSlash : faEye}
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                             </span>
//                         </div>
//                     </div>
//                     <button type="submit" className="btn btn-secondary w-100">Sign In</button>
//                 </form>
//                 <p className="mt-3">
//                     Forgot Password? <Link to="/forgot-password" className="text-danger">Click here</Link>
//                 </p>
//                 <p>
//                     Don't have an account? <Link to="/signup" className="text-danger">Sign Up</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default SignIn;


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

const handleSignIn = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signin', {
            email,
            password,
        });
        console.log(response.data); // Log the response data for debugging
    } catch (error) {
        console.error('Error signing in:', error.response.data);
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



// import { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './SignIn.css'; 
// function SignIn() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSignIn = (e) => {
//         e.preventDefault();
//         axios.post('/api/auth/signin', { email, password })
//             .then((response) => {
//                 console.log(response.data);
//                 // Redirect to home or file upload page after successful sign-in
//                 navigate('/upload');
//             })
//             .catch((error) => {
//                 console.error(error);
//                 alert("Invalid credentials, please try again.");
//             });
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Sign In</h2>
//                 <form onSubmit={handleSignIn}>
//                     <div className="mb-3">
//                         <label htmlFor="email"><strong>Email</strong></label>
//                         <input
//                             type="email"
//                             className="form-control"
//                             placeholder="Enter Email"
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter Password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-secondary w-100">Sign In</button>
//                 </form>
//                 <p className="mt-3">
//                     Forgot Password? <Link to="/forgot-password" className="text-danger">Click here</Link>
//                 </p>
//                 <p>
//                     Don't have an account? <Link to="/signup" className="text-danger">Sign Up</Link>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default SignIn;
