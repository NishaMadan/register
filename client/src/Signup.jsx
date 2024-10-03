import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Regular expression to validate strong password (8-12 characters, including special characters, numbers, and uppercase letters)
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (!strongPasswordRegex.test(password)) {
            alert("Password must be 8-12 characters long and include at least one uppercase letter, one number, and one special character.");
            return;
        }

        axios.post('http://localhost:5000/api/auth/register', { name, email, password })
            .then(result => {
                console.log(result.data); // Handle successful registration
                alert("Registration successful! You can now sign in.");
                navigate('/signin'); // Redirect to the sign-in page
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                alert("Registration failed. Please try again.");
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input 
                            type="text" 
                            className="form-control" 
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
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
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

// function Signup() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (password !== confirmPassword) {
//             alert("Passwords do not match");
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
//                         <input type="text" className="form-control" placeholder="Enter Name"
//                             onChange={(e) => setName(e.target.value)} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email"><strong>Email</strong></label>
//                         <input type="email" className="form-control" placeholder="Enter Email"
//                             onChange={(e) => setEmail(e.target.value)} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <input type="password" className="form-control" placeholder="Enter Password"
//                             onChange={(e) => setPassword(e.target.value)} required />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
//                         <input type="password" className="form-control" placeholder="Confirm Password"
//                             onChange={(e) => setConfirmPassword(e.target.value)} required />
//                     </div>
//                     <button type="submit" style={{ backgroundColor: 'darkgrey', color: 'white' }} className="btn w-100">Register</button>
//                 </form>
//                 <p>Already Have an Account?</p>
//                 <Link to="/signin" className="btn btn-light w-100">Login</Link>
//             </div>
//         </div>
//     );
// }

// export default Signup;



