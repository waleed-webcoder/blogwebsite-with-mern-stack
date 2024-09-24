const express=require("express")
const app= express()
const router=express.Router()
router.get("/profile",(req,res)=>{
    const {name,bio,pic}=req.body
    res.json({name:name,bio:bio,pic:pic})
    console.log("this is profile route")
})
module.exports=router
