const express = require("express");
const router = express.Router();
const usermodel = require("../modules/user");
const postmodel = require("../modules/post");
router.get("/",async (req,res)=>{
    try{
        const postdata=await postmodel.find().populate('user','name');
        if(!postdata){
            res.status(400).json({message:"not found any posts for you at this time !"})
        }
        res.status(200).json({
            postdata
        })
    }catch(err){
        console.log("error in posts sendings")
    }
})
module.exports = router;