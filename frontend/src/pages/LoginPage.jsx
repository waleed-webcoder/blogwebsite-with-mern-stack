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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border-t-4 border-blue-500">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-4">Login to your account</p>
        <form onSubmit={handleformsubmit} className="space-y-4">
          <div>
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-500 shadow-sm"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-500 shadow-sm"
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline font-medium">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
  
};

export default LoginPage;
