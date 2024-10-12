const mongoose=require("mongoose")
const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"]
    },
    imageurl:{
        type:String,
        required:true,
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }],
    isVerified:{
        type:Boolean,
        required:true,
    }
})
const usermodel=mongoose.model("user",userschema)
module.exports=usermodel

