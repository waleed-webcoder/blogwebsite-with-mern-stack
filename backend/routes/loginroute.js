const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const user = require("../modules/user");
const router = express.Router();
require("dotenv").config();
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const findedUser = await user.findOne({email:email });
        if (!findedUser) {
            return res.status(400).send("User not found.");
        }

        const match = await bcrypt.compare(password, findedUser.password);
        if (!match) {
            return res.status(400).send("Invalid credentials.");
        }

        const token = jwt.sign(
            {
                name: findedUser.name,
                email: findedUser.email,
                userid: findedUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' } // Token expiration added for security
        );

        res.cookie('token', token, {
            httpOnly: true,  // Prevent access to the cookie from JavaScript (for security)
            secure: false,  // Set true if using HTTPS
            sameSite: 'lax'  // Control cross-site cookie behavior
        });
        res.json({
            message: "Login successful",
            data: {
                email: findedUser.email,
                name: findedUser.name,
                number: findedUser.number,
                imageurl: findedUser.imageurl,
                gender: findedUser.gender,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong.");
    }
});

module.exports = router;
