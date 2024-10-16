

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

    console.log({ name, email, password });  // Add this line to check data sent

    axios.post('http://localhost:5000/api/auth/register', { name, email, password }, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        console.log('User registered:', response.data);
        alert("Registration successful! You can now sign in.");
        navigate('/signin');
    })
    .catch(error => {
        if (error.response) {
            setError(`Registration failed: ${error.response.data.message}`);
        } else {
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
//     const [error, setError] = useState('');
//     const [passwordInfo, setPasswordInfo] = useState('');
//     const navigate = useNavigate();

//     const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,12}$/;

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         axios.post('http://localhost:5000/api/auth/register', { name, email, password }, {
//             headers: { 'Content-Type': 'application/json' }
//         })
//         .then(response => {
//             console.log('User registered:', response.data);
//             alert("Registration successful! You can now sign in.");
//             navigate('/signin');
//         })
//         .catch(error => {
//             if (error.response) {
//                 setError(`Registration failed: ${error.response.data.message}`);
//             } else {
//                 setError('Registration failed. Please try again.');
//             }
//         });
//     };

//     const handlePasswordChange = (e) => {
//         const value = e.target.value;
//         setPassword(value);

//         // Provide feedback on password requirements
//         if (strongPasswordRegex.test(value)) {
//             setPasswordInfo('Strong password');
//         } else if (value.length < 8) {
//             setPasswordInfo('Password must be at least 8 characters long');
//         } else if (!/[A-Z]/.test(value)) {
//             setPasswordInfo('Password must include at least one uppercase letter');
//         } else if (!/\d/.test(value)) {
//             setPasswordInfo('Password must include at least one number');
//         } else if (!/[@$!%*?&#]/.test(value)) {
//             setPasswordInfo('Password must include at least one special character');
//         } else {
//             setPasswordInfo('');
//         }
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Register</h2>
//                 {error && <div className="alert alert-danger">{error}</div>}
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name"><strong>Name</strong></label>
//                         <input 
//                             type="text" 
//                             className="form-control" 
//                             id="name"
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
//                             id="email"
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
//                                 id="password"
//                                 placeholder="Enter Password"
//                                 onChange={handlePasswordChange} 
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
//                         {passwordInfo && <p className="text-danger">{passwordInfo}</p>}
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
//                         <div className="input-group">
//                             <input 
//                                 type={showConfirmPassword ? "text" : "password"} 
//                                 className="form-control" 
//                                 id="confirmPassword"
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
