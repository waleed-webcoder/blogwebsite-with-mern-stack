const express=require("express")
const router=express.Router();
const postmodel=require("../modules/post");
router.get("/:id", async (req,res)=>{
    const id=req.params.id;
    try{
        const post=await postmodel.findById(id).populate('user','name');
        res.json({post:post});
    }catch(error){
        console.log("error in postfinding and sending json");
    }
})
module.exports=router;