import React from 'react';
import axios from 'axios';
import { useState } from 'react';
const SignupPage = () => {
  const [name,setname]=useState("");
  const [number,setnumber]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [gender,setgender]=useState("");
  const [profilepic,setprofilepic]=useState(null);
  const handlefile=(e)=>{
    setprofilepic(e.target.files[0])
  }
  const handleformsubmit= async (e)=>{
    e.preventDefault();
    const formdata=new FormData;
    formdata.append("name",name)
    formdata.append("email",email)
    formdata.append("password",password)
    formdata.append("number",number)
    formdata.append("profilepic",profilepic)
    formdata.append("gender",gender)
    try{
      const response=await axios.post("http://localhost:3000/signup",formdata,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      console.log("the signup form is submitted",response.data)
      alert("the form is submitted")
    }catch(error){
      console.log("error in submitting form",error)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleformsubmit} >
          <input type="text" onChange={(e)=>{setname(e.target.value)}} name='name' placeholder="Name" className="block w-full p-2 mb-4 border rounded" />
          <input type="number" onChange={(e)=>{setnumber(e.target.value)}}  name='number' placeholder="Phone Number" className="block w-full p-2 mb-4 border rounded" />
          <input type="email" onChange={(e)=>{setemail(e.target.value)}} name='email' placeholder="Email" className="block w-full p-2 mb-4 border rounded" />
          <input type="password" onChange={(e)=>{setpassword(e.target.value)}} name='password' placeholder="Password" className="block w-full p-2 mb-4 border rounded" />
          <input type="file" onChange={handlefile} name='profilepic' className="block w-full p-2 mb-4 border rounded" />
          <select value={gender} onChange={(e)=>{setgender(e.target.value)}} className="block w-full p-2 mb-4 border rounded">
          <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
