import React, { useState } from 'react';
import axios from 'axios';

const OtpVerification = ({ userId }) => {
    const [otp, setOtp] = useState("");

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/verify-otp", { userId, otp });
            alert(response.data.message);
        } catch (error) {
            console.error("OTP verification failed", error);
            alert("OTP verification failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    <i className="fas fa-lock mr-2"></i>
                    Enter OTP
                </h2>
                <form onSubmit={handleOtpSubmit}>
                    <div className="mb-6">
                        <label htmlFor="otp" className="block text-gray-600 font-semibold mb-2">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
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
            </div>
        </div>
    );
};

export default OtpVerification;
