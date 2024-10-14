import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';  // Using .jsx extension
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import UserProfile from './pages/UserProfile.jsx';
import ManagePosts from './pages/managepost.jsx';
import EditPost from './pages/editpost.jsx';
import OtpVerification from './pages/otpverification.jsx';
import Feed from './pages/Feed.jsx';
import { AuthProvider } from './pages/AuthContext.jsx';
import { ThemeProvider } from './pages/ThemeContext';
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<UserProfile/>}></Route>
            <Route path="/managepost" element={<ManagePosts/>}></Route>
            <Route path='/editpost/:id' element={<EditPost/>}></Route>
            <Route path='/otp-verification' element={<OtpVerification/>}></Route>
            <Route path='/Feed' element={<Feed/>}></Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
