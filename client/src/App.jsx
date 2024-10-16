import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Signup from './Signup';
import SignIn from './SignIn';
import AdminLogin from './AdminLogin';
import ForgotPassword from './ForgotPassword';
import FileUpload from './FileUpload';
import OtpVerification from './OtpVerification';
import ResetPassword from './ResetPassword';
import AboutPage from './About';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/upload" element={<FileUpload />} />
                <Route path='/otp-verification' element={<OtpVerification />} />
                <Route path='/reset-password' element={<ResetPassword />} />
            </Routes>
        </Router>
    );
}

export default App;


// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import Signup from './Signup'
// import  {BrowserRouter, Routes, Route} from 'react-router-dom'

// import Login from './Login'

// function App() {


//   return (
// <BrowserRouter>
// <Routes>
//   <Route path='/register' element={<Signup />}></Route>
//   <Route path='/login' element={<Login />}></Route>
// </Routes>
// </BrowserRouter>
//   )
// }

// export default App
