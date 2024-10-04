const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const postmodel = require("../modules/post");
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

router.post("/", upload.single("pic"), async (req, res) => {
    const { title,date, description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send("No file uploaded or invalid file type.");
    }

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Unauthorized: No token provided.");
    }

    try {
        const verifiedToken = jwt.verify(token,process.env.SECRET_KEY);
        const user = await usermodel.findById(verifiedToken.userid);
        console.log(user);
        if (!user) {
            return res.status(400).send("User not found.");
        }

        const newPost = await postmodel.create({
            title,
            date,
            description,
            imageurl: file.path,
            user: user._id
        });

        user.posts.push(newPost._id);
        await user.save();

        res.json({
            message: "Post created successfully",
            data: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post.");
    }
});

module.exports = router;
