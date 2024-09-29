// const express=require("express")
// const app= express()
// const router=express.Router()
// const usermodel=require("../modules/user")
// const postmodel=require("../modules/post")
// const jwt=require("jsonwebtoken")
// require("dotenv").config()
// router.get("/",async (req,res)=>{
//     const token=req.cookies.token;
//     if(!token){
//        return res.status(401).redirect("/login")
//     }
//     try{
//         const verifiedToken=jwt.verify(token,process.env.SECRET_KEY)
//         const findeduser=await usermodel.findOne({email:verifiedToken.email})
//         if(!findeduser){
//            return res.status(404).send("user not found")
//         }
//         res.status(200).json({
//             message:"user profile data",
//             data:{
//                 name:findeduser.name,
//                 email:findeduser.email,
//                 number:findeduser.number,
//                 posts:findeduser.posts,
//                 pic:findeduser.pic,          
//             }
//         })

//     }catch(err){
//         console.error(err);
//     return res.status(403).send("Invalid token");
//     }
// })
// module.exports=router
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
      message: "User profile data",
      data: {
        name: findeduser.name,
        email: findeduser.email,
        number: findeduser.number || "", // Optional fallback if 'number' is missing
        posts: findeduser.posts || [], // Ensure posts array exists
        pic: findeduser.imageurl || "/multer/pic-1726973272807-56131540profile.png", // Optional fallback if 'pic' is missing
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router;
