import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        axios.post('http://localhost:5000/api/auth/register', { name, email, password })
            .then(result => {
                console.log(result.data); // Handle successful registration (e.g., redirect, show success message)
            })
            .catch(err => {
                console.error(err.response.data); // Handle errors (e.g., user already exists)
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" className="form-control" placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" className="form-control" placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" className="form-control" placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                        <input type="password" className="form-control" placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Register</button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-light w-100">Login</Link>
            </div>
        </div>
    );
}

export default Signup;


// import {useState} from "react";
// import { Link } from 'react-router-dom';
// import axios from 'axios'


// function Signup() {
//     const [name, setName]= useState()
//     const [email, setEmail]= useState()
//     const [password, setPassword]= useState()

//     const handleSubmit = (e) =>{
//         e.preventdefault()
//         axios.post('', {name, email, password : password})
//         .then(result => console.log(result))
//         .catch(err => console.log(err))
//     }
//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//         <div className="bg-white p-3 rounded w-25">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//         <label htmlFor="email">
//         <strong>Name</strong>
//         </label>
//         <input
//         type="text"
//         placeholder="Enter Name"
//         autoComplete="off"
//         name="email"
//         className="form-control rounded-0"
//         onChange={(e) => setName(e.target.value)}
//         />
//         </div>
//         <div className="mb-3">
//   <label htmlFor="email">
//     <strong>Email</strong>
//   </label>
//   <input
//     type="email"
//     placeholder="Enter valid email" 
//     autoComplete="off" 
//     name="email"
//     className="form-control rounded-0"
//     onChange={(e) => setEmail(e.target.value)}
//   />
// </div>



// <div className="mb-3">
//         <label htmlFor="email">
//         <strong>Password</strong>
//         </label>
//         <input
//         type="password"
//         placeholder="Set Password"
  
//         name="password"
//         className="form-control rounded-0"
//         onChange={(e) => setPassword(e.target.value)}
//         />
//         </div>

//         <button type="submit" className="btn btn-success w-100 rounded-0"> Register</button>
//         </form>
// <p>Already Have an Account</p>
// <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>

// </div>
// </div>
//     );
// }


// export default Signup;