import React from 'react';
import { Link } from 'react-router-dom';


function LandingPage() {
    return (
        <div>
            {/* Navbar Section */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    {/* Company name (left-aligned) */}
                    <Link className="navbar-brand" to="/">GA MORGAN</Link>

                    {/* Navbar toggler for mobile view */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar items (right-aligned) */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">Sign In</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Welcome Section */}
            <section className="container mt-5 text-center">
                <h1>Welcome to MORGAN TECHNICA</h1>
                <p>We are committed to delivering the best service to our customers. Join us on our journey!</p>
                <img 
                    src="your-image-path" 
                    alt="Company" 
                    className="img-fluid" 
                    style={{ maxWidth: '80%', height: 'auto' }} 
                />
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
