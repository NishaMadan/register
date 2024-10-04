// import { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Signup() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate();

//     // Regular expression to validate strong password (8-12 characters, including special characters, numbers, and uppercase letters)
//     const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }

//         if (!strongPasswordRegex.test(password)) {
//             alert("Password must be 8-12 characters long and include at least one uppercase letter, one number, and one special character.");
//             return;
//         }

//         axios.post('http://localhost:5000/api/auth/register', { name, email, password })
//             .then(result => {
//                 console.log(result.data); // Handle successful registration
//                 alert("Registration successful! You can now sign in.");
//                 navigate('/signin'); // Redirect to the sign-in page
//             })
//             .catch(err => {
//                 console.error(err.response ? err.response.data : err.message);
//                 alert("Registration failed. Please try again.");
//             });
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name"><strong>Name</strong></label>
//                         <input 
//                             type="text" 
//                             className="form-control" 
//                             placeholder="Enter Name"
//                             onChange={(e) => setName(e.target.value)} 
//                             required 
//                         />
//                     </div>
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
//                     <div className="mb-3">
//                         <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
//                         <input 
//                             type="password" 
//                             className="form-control" 
//                             placeholder="Confirm Password"
//                             onChange={(e) => setConfirmPassword(e.target.value)} 
//                             required 
//                         />
//                     </div>
//                     <button 
//                         type="submit" 
//                         style={{ backgroundColor: 'darkgrey', color: 'white' }} 
//                         className="btn w-100"
//                     >
//                         Register
//                     </button>
//                 </form>
//                 <p>Already Have an Account?</p>
//                 <Link to="/signin" className="btn btn-light w-100">Login</Link>
//             </div>
//         </div>
//     );
// }

// export default Signup;

import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,12}$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!strongPasswordRegex.test(password)) {
            setError("Password must be 8-12 characters long and include at least one uppercase letter, one number, and one special character.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email format is invalid");
            return;
        }

        axios.post('http://localhost:5000/api/auth/register', {
            name: name,
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('User registered:', response.data);
            alert("Registration successful! You can now sign in.");
            navigate('/signin');
        })
        .catch(error => {
            if (error.response) {
                console.error('Error registering user:', error.response.data);
                setError(`Registration failed: ${error.response.data.message}`);
            } else {
                console.error('Error registering user:', error.message);
                setError('Registration failed. Please try again.');
            }
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                        <div className="input-group">
                            <input 
                                type={showConfirmPassword ? "text" : "password"} 
                                className="form-control" 
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                required 
                            />
                            <span className="input-group-text">
                                <FontAwesomeIcon
                                    icon={showConfirmPassword ? faEyeSlash : faEye}
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </span>
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        style={{ backgroundColor: 'darkgrey', color: 'white' }} 
                        className="btn w-100"
                    >
                        Register
                    </button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/signin" className="btn btn-light w-100">Login</Link>
            </div>
        </div>
    );
}

export default Signup;

// import { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// function Signup() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const navigate = useNavigate();

//     const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,12}$/;


//     const handleSubmit = (e) => {
//         e.preventDefault();
    
//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
//             return;
//         }
    
//         if (!strongPasswordRegex.test(password)) {
//             alert("Password must be 8-12 characters long and include at least one uppercase letter, one number, and one special character.");
//             return;
//         }
    
//         axios.post('http://localhost:5000/api/auth/register', {
//             name: name,  // Use 'name' instead of 'values.username'
//             email: email,    // Use 'email' instead of 'values.email'
//             password: password // Use 'password' instead of 'values.password'
//         },{
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         .then(response => {
//             // Handle success
//             console.log('User registered:', response.data);
//             // You may want to navigate to another page after successful registration
//             navigate('/signin'); // Change '/some-path' to the desired route
//         })
//         .catch(error => {
//             // Check if the error has a response and log it for debugging
//             if (error.response) {
//                 console.error('Error registering user:', error.response.data);
//                 alert(`Registration failed: ${error.response.data.message}`);
//             } else {
//                 console.error('Error registering user:', error.message);
//                 alert('Registration failed. Please try again.');
//             }
//         });
//     };
    

//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name"><strong>Name</strong></label>
//                         <input 
//                             type="text" 
//                             className="form-control" 
//                             placeholder="Enter Name"
//                             onChange={(e) => setName(e.target.value)} 
//                             required 
//                         />
//                     </div>
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
//                     <div className="mb-3">
//                         <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
//                         <div className="input-group">
//                             <input 
//                                 type={showConfirmPassword ? "text" : "password"} 
//                                 className="form-control" 
//                                 placeholder="Confirm Password"
//                                 onChange={(e) => setConfirmPassword(e.target.value)} 
//                                 required 
//                             />
//                             <span className="input-group-text">
//                                 <FontAwesomeIcon
//                                     icon={showConfirmPassword ? faEyeSlash : faEye}
//                                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                     style={{ cursor: 'pointer' }}
//                                 />
//                             </span>
//                         </div>
//                     </div>
//                     <button 
//                         type="submit" 
//                         style={{ backgroundColor: 'darkgrey', color: 'white' }} 
//                         className="btn w-100"
//                     >
//                         Register
//                     </button>
//                 </form>
//                 <p>Already Have an Account?</p>
//                 <Link to="/signin" className="btn btn-light w-100">Login</Link>
//             </div>
//         </div>
//     );
// }

// export default Signup;
