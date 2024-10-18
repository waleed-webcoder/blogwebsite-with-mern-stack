import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook
import Cookies from 'js-cookie';

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from context
  const userId = location.state?.userId;

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp || !userId) {
      alert('Please provide both OTP and User ID');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/verify-otp", { userId, otp }, {
        withCredentials: true
      });

      alert(response.data.message);

      // If OTP verification is successful, set the token and update authentication state
      if (response.data.token) {
        Cookies.set('token', response.data.token); // Set token in cookies
        login(); // Call login function from context
        navigate("/dashboard"); // Navigate to the dashboard
      }

    } catch (error) {
      console.error("OTP verification failed", error);
      alert("OTP verification failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          <i className="fas fa-shield-alt mr-2"></i> 
          Verify Your Email
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          We've sent a one-time password (OTP) to your registered email address. 
          Please enter it below to verify your account.
        </p>
        
        <form onSubmit={handleOtpSubmit}>
          <div className="mb-6">
            <label htmlFor="otp" className="block text-gray-600 font-semibold mb-2">
              Enter OTP Code
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
          >
            <i className="fas fa-check mr-2"></i>
            Verify
          </button>
        </form>
        
        <p className="text-center text-gray-500 mt-6">
          Didn’t receive the OTP? <span className="text-purple-600 font-medium cursor-pointer hover:underline">Resend OTP</span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
