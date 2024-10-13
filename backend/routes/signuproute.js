const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const usermodel = require("../modules/user");
const otpmodel  = require("../modules/otp");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();
// Multer settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./multer");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E8);
        cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD 
    }
});

// Signup route
router.post("/", upload.single("profilepic"), async (req, res) => {
    const { name, number, email, password, gender } = req.body;
    const file = req.file;

    try {
        const checkUser = await usermodel.findOne({ email });
        if (checkUser) {
            return res.status(400).send("User already registered.");
        }

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await usermodel.create({
            name,
            email,
            number,
            gender,
            password: hash,
            imageurl: file ? file.path : null, // Handle case where file isn't uploaded
            isVerified:false,
        });
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Save the OTP in a new OTP model with the user's reference
        await otpmodel.create({
            userId: newUser._id,
            otp: otp,
            expiresAt: Date.now() + 3600000 // OTP expires in 1 hour
        });

        // Send OTP to user's email
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: newUser.email,
            subject: 'Verify your email',
            // text: `Your OTP code is ${otp}. Please enter this code to verify your email.`
            html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; padding: 20px 0;">
        <h1 style="color: #4CAF50; font-size: 28px; margin-bottom: 10px;">Verify Your Email</h1>
        <p style="color: #888; font-size: 16px; margin: 0;">Welcome to Our Platform! We're thrilled to have you on board.</p>
      </div>

      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center;">
        <h2 style="color: #333; font-size: 22px; margin-bottom: 20px;">Your OTP Code is</h2>
        <p style="font-size: 40px; color: #4CAF50; font-weight: bold; margin: 0;">${otp}</p>
        <p style="color: #888; font-size: 16px; margin-top: 20px;">Please enter this code to verify your email address.</p>
      </div>

      <div style="margin-top: 40px; text-align: center;">
        <a href="#" style="background-color: #4CAF50; color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;">Verify Email</a>
      </div>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;">

      <div style="text-align: center; color: #888;">
        <p>If you didn’t request this email, please ignore it.</p>
        <p>Need help? Contact our <a href="#" style="color: #4CAF50; text-decoration: none;">support team</a>.</p>
      </div>
    </div>
  `,
        });
        res.status(200).json({ message: "Signup successful. OTP sent to email.", userId: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error during signup.");
    }

        // const token = jwt.sign(
        //     { name: newUser.name, email: newUser.email, userid: newUser._id },
        //     process.env.SECRET_KEY,
        // );

        // res.cookie('token', token, {
        //       // Prevent access to the cookie from JavaScript (for security)
        //     secure: false,  // Set true if using HTTPS
        //     sameSite: 'lax'  // Control cross-site cookie behavior
        // });
    //     res.json({
    //         message: "Signup successful",
    //         token:token,
    //         data: {
    //             name: newUser.name,
    //             //other properties are not returned due to user privacy(security issue)
    //             gender: newUser.gender,
    //         }
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Error during signup.");
    // }
});

module.exports = router;
