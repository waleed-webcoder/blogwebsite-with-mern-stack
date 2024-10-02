const express = require("express");
const router = express.Router();
const usermodel = require("../modules/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided." });
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    const findeduser = await usermodel.findOne({ email: verifiedToken.email }).populate("posts"); // Assuming posts are related models

    if (!findeduser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User posts data",
      data: {
        posts: findeduser.posts || [], 
        pic: findeduser.imageurl || "post pic", 
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router;
