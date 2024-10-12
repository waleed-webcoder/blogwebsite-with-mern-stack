
// import React, { useState } from 'react';
// import axios from 'axios';

// const OtpVerification = ({ userId }) => {
//     const [otp, setOtp] = useState("");

//     const handleOtpSubmit = async (e) => {
//         e.preventDefault();

//         if (!userId || !otp) {
//             alert("User ID or OTP is missing");
//             return;
//         }

//         try {
//             const response = await axios.post("http://localhost:3000/api/verify-otp", { userId, otp });
//             alert(response.data.message);
//         } catch (error) {
//             console.error("OTP verification failed:", error.response?.data?.message || error.message);
//             alert("OTP verification failed: " + (error.response?.data?.message || error.message));
//         }
//     };

//     return (
//         <div>
//             <h2>Enter OTP</h2>
//             <form onSubmit={handleOtpSubmit}>
//                 <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     placeholder="Enter OTP"
//                 />
//                 <button type="submit">Verify</button>
//             </form>
//         </div>
//     );
// };

// export default OtpVerification;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
const OtpVerification = () => {
    const location = useLocation();
    const { userId } = location.state || {}; // Get userId from location state
    const [otp, setOtp] = useState("");

    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !otp) {
            alert("User ID or OTP is missing");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/verify-otp", { userId, otp }, { withCredentials: true });
            alert(response.data.message);
        } catch (error) {
            console.error("OTP verification failed:", error.response?.data?.message || error.message);
            alert("OTP verification failed: " + (error.response?.data?.message || error.message));
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
