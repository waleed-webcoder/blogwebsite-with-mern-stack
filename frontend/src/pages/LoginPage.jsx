import React from 'react';
import axios from 'axios';
import { useState } from 'react';
const LoginPage = () => {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const handleformsubmit=async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
    }, {
      withCredentials:true,
        headers: {
           "Content-Type": "application/json",
        }
    });
    console.log("The login form data is submitted", response.data);
    alert("The form is submitted successfully");
      
    }catch(error){
      console.log("error in submitting loginform submitting",error)
      alert("error in submitting form")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleformsubmit} >
          <input type="email" onChange={(e)=>{setemail(e.target.value)}} placeholder="Email" className="block w-full p-2 mb-4 border rounded" />
          <input type="password" onChange={(e)=>{setpassword(e.target.value)}}  placeholder="Password" className="block w-full p-2 mb-4 border rounded" />
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
