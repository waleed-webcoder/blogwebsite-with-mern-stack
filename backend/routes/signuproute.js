const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const usermodel = require("../modules/user");
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
            imageurl: file ? file.path : null // Handle case where file isn't uploaded
        });

        const token = jwt.sign(
            { name: newUser.name, email: newUser.email, userid: newUser._id },
            process.env.SECRET_KEY,
        );

        res.cookie('token', token, {
              // Prevent access to the cookie from JavaScript (for security)
            secure: false,  // Set true if using HTTPS
            sameSite: 'lax'  // Control cross-site cookie behavior
        });
        res.json({
            message: "Signup successful",
            token:token,
            data: {
                name: newUser.name,
                //other properties are not returned due to user privacy(security issue)
                gender: newUser.gender,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error during signup.");
    }
});

module.exports = router;
