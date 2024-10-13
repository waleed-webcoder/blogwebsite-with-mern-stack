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
        <div>
            <h2>Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
                <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default OtpVerification;
