import React from 'react';
import { Link } from 'react-router-dom';
import frontImage from './assets/Webpicture1.jpg';
import morganLogo from './assets/morganlogo.ico'; 
function LandingPage() {
    return (
        <div>
            {/* Navbar Section */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: 'static' }}>
                <div className="container-fluid">
                    {/* Company Logo and Name */}
                    <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Display logo before the text */}
                        <img
                            src={morganLogo}
                            alt="Morgan Logo"
                            style={{ width: '40px', height: '40px', marginRight: '10px' }} // Adjust size and spacing
                        />
                        <span style={{
                            fontFamily: 'Georgia, serif',  // Change the font family
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: '#FF0000', // Red color for the company name
                            letterSpacing: '1px',
                            textTransform: 'uppercase'
                        }}>
                            GA MORGAN Dynamics  PVT LTD
                        </span>
                    </Link>

                    {/* Navbar toggler for mobile view */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar items (right-aligned) */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" style={{ fontSize: '1.2rem', color: '#333', padding: '10px 15px' }}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about" style={{ fontSize: '1.2rem', color: '#333', padding: '10px 15px' }}>About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin" style={{ fontSize: '1.2rem', color: '#333', padding: '10px 15px' }}>Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup" style={{ fontSize: '1.2rem', color: '#333', padding: '10px 15px' }}>Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin" style={{ fontSize: '1.2rem', color: '#333', padding: '10px 15px' }}>Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Add internal style for hover effect */}
                <style>
                    {`
                        .navbar-brand:hover span {
                            color: #FF4500; /* OrangeRed color for company name on hover */
                            transition: color 0.3s ease;
                        }

                        .nav-link:hover {
                            background-color: #f8f9fa; /* Light background on hover */
                            color: #FF4500; /* Change text color to OrangeRed */
                            border-radius: 5px; /* Rounded corners */
                            transition: color 0.3s ease, background-color 0.3s ease;
                        }

                        .nav-link.active {
                            color: #FF0000; /* Active link in red */
                            font-weight: bold; /* Make the active link bold */
                        }
                    `}
                </style>
            </nav>
            <section
            className="welcome-section container-fluid d-flex align-items-center justify-content-center text-center"
            style={{
                backgroundImage: `url(${frontImage})`, // Set the image as background
                backgroundSize: 'cover', // Cover the entire section
                backgroundPosition: 'center', // Center the image
                height: '100vh', // Set the section height to full screen
                color: 'white', // White text
            }}
        >
            {/* Welcome Section Content */}
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px' }}> {/* Add a translucent overlay */}
                <h1>Welcome to GA MORGAN DYNAMICS</h1>
                <p style={{color : 'black', fontSize: '1rem',
                            fontWeight: 'bold',}}>We are committed to delivering the best service to our customers. Join us on our journey!</p>
            </div>
        </section>
        </div>
    );
}

export default LandingPage;



// import React from 'react';
// import { Link } from 'react-router-dom';

// function LandingPage() {
//     return (
//         <div>
//             <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                 <div className="container-fluid">
//                     <Link className="navbar-brand" to="/">CompanyName</Link>
//                     <div className="collapse navbar-collapse">
//                         <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li className="nav-item">
//                                 <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/about">About</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/signin">Sign In</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/signup">Sign Up</Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/admin">Admin</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>

//             <section className="container mt-5">
//                 <h1>Welcome to GA Morgan</h1>
//                 <p>We are committed to delivering the best service to our customers. Join us on our journey!</p>
//                 <img src="your-image-path" alt="Company" className="img-fluid" />
//             </section>
//         </div>
//     );
// }

// export default LandingPage;
