const mongoose=require("mongoose")
const express =require("express")
const postschema=mongoose.Schema({
      user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
      },
     title:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true,
     },
     imageurl:{
      type:String,
      required:true,
     },
     date:{
        type:Date,
        default:Date.now()
     }

})
const postmodel=mongoose.model("post",postschema)
module.exports=postmodel