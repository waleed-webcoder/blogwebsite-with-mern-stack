const express = require("express");
const router = express.Router();
const usermodel = require("../modules/user");
const postmodel = require("../modules/post");
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
router.delete("/deletepost/:id",async (req,res)=>{
  try{

    const postid=req.params.id;
    const deletepost=await postmodel.findByIdAndDelete(postid);
    if (!deletepost) {
      return res.status(404).json({ message: "Post not found" });
    }
  
    res.json({ message: "Post deleted successfully", deletepost });
  }catch(error){
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
})
router.get("/editpost/:id",async (req,res)=>{
  const id=req.params.id;
  try{
    const post= await postmodel.findById(id);
    if(!post){
      res.status(404).send("something went wrong");
      console.log("post noe found");
    }
    res.status(200).json(post)
    console.log(post)
  }catch(error){
    console.log("server issue")
  }
  
})
router.put('/:id', async (req, res) => {
  const { title, date, description } = req.body;

  try {
    // Find post by ID and update its data
    const updatedPost = await postmodel.findByIdAndUpdate(
      req.params.id,
      { title, date, description },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({ message: 'Post updated successfully', updatedPost });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post', error });
  }
});

module.exports = router;
