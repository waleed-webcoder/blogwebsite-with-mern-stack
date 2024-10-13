
const express = require("express");
const jwt = require("jsonwebtoken");
const otpmodel = require("../modules/otp");
const usermodel = require("../modules/user");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        return res.status(400).json({ message: "Missing userId or OTP." });
    }

    try {
        // Find OTP record for the user
        const otpRecord = await otpmodel.findOne({ userId });

        if (!otpRecord) {
            return res.status(400).json({ message: "OTP not found for the user." });
        }

        // Check if OTP matches and is not expired
        if (otpRecord.otp === otp && otpRecord.expiresAt > Date.now()) {
            // Mark user as verified
            await usermodel.findByIdAndUpdate(userId, { isVerified: true });

            // Delete OTP record
            await otpmodel.deleteOne({ userId });

            // Retrieve user information from the database
            const user = await usermodel.findById(userId).select('name email'); // Only select name and email

            // Create JWT token including user information
            const token = jwt.sign(
                { userId, name: user.name, email: user.email }, // Include name and email in token
                process.env.SECRET_KEY,
                { expiresIn: "1h" } // Token expires in 1 hour
            );

            // Set the token in cookies
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,  // Set true if using HTTPS
                sameSite: "lax" // Control cross-site cookie behavior
            });

            return res.status(200).json({ message: "Email verified successfully!",token:token ,data:{name:user.name}});
        } else {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).send("Error during OTP verification.");
    }
});

module.exports = router;
