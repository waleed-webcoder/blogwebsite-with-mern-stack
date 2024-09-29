const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const user = require("../modules/user");
const router = express.Router();
require("dotenv").config();
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const findedUser = await user.findOne({email });      
        if(findedUser){
            const match = await bcrypt.compare(password, findedUser.password);
            if(match){
                console.log("congratulation . you logged in")
                const token = jwt.sign(
                    {
                        name: findedUser.name,
                        email: findedUser.email,
                        userid: findedUser._id,
                    },
                    process.env.SECRET_KEY,);
        
                res.cookie('token', token, {
                    httpOnly: true,  // Prevent access to the cookie from JavaScript (for security)
                    secure: false,  // Set true if using HTTPS
                    sameSite: 'lax'  // Control cross-site cookie behavior
                });
                res.json({
                    message: "Login successful",
                    data: {
                        name: findedUser.name,
                        number: findedUser.number,
                        gender: findedUser.gender,
                    }
                });
            }
            else{
                res.status(400).send("your password is incorrect")
                console.log("pssword is incorrect")
            }
        }else{
            res.status(400).send("this user not found")
            console.log("email is incorrect . user not found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong.");
    }
});

module.exports = router;
