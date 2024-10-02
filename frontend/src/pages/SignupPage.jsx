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
  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
  //     <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border-t-4 border-green-500">
  //       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
  //       <p className="text-center text-gray-500 mb-4">Join us today for an amazing experience</p>
  //       <form onSubmit={handleformsubmit} className="space-y-4">
  //         <div>
  //           <input
  //             type="text"
  //             onChange={(e) => setname(e.target.value)}
  //             name="name"
  //             placeholder="Full Name"
  //             className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="number"
  //             onChange={(e) => setnumber(e.target.value)}
  //             name="number"
  //             placeholder="Phone Number"
  //             className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="email"
  //             onChange={(e) => setemail(e.target.value)}
  //             name="email"
  //             placeholder="Email Address"
  //             className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="password"
  //             onChange={(e) => setpassword(e.target.value)}
  //             name="password"
  //             placeholder="Password"
  //             className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
  //           />
  //         </div>
  //         <div>
  //           <input
  //             type="file"
  //             onChange={handlefile}
  //             name="profilepic"
  //             className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm"
  //           />
  //         </div>
  //         <div>
  //           <select
  //             value={gender}
  //             onChange={(e) => setgender(e.target.value)}
  //             className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm"
  //           >
  //             <option value="" disabled>Select Gender</option>
  //             <option>Male</option>
  //             <option>Female</option>
  //             <option>Other</option>
  //           </select>
  //         </div>
  //         <button
  //           type="submit"
  //           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
  //         >
  //           Sign Up
  //         </button>
  //       </form>
  //       <p className="mt-6 text-center text-gray-500">
  //         Already have an account?{" "}
  //         <a href="#" className="text-green-500 hover:underline font-medium">
  //           Log in here
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left side - Form Section */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>
          <form onSubmit={handleformsubmit} className="space-y-4">
            <div>
              <input
                type="text"
                onChange={(e) => setname(e.target.value)}
                name="name"
                placeholder="Full Name"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
              />
            </div>
            <div>
              <input
                type="number"
                onChange={(e) => setnumber(e.target.value)}
                name="number"
                placeholder="Phone Number"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
              />
            </div>
            <div>
              <input
                type="email"
                onChange={(e) => setemail(e.target.value)}
                name="email"
                placeholder="Email Address"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
              />
            </div>
            <div>
              <input
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                placeholder="Password"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm"
              />
            </div>
            <div>
              <input
                type="file"
                onChange={handlefile}
                name="profilepic"
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm"
              />
            </div>
            <div>
              <select
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm"
              >
                <option value="" disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-green-500 hover:underline font-medium">
              Log in here
            </a>
          </p>
        </div>
  
        {/* Right side - Image/Text Section */}
        <div className="w-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg mb-4">We're so happy to see you again. Sign up today and experience our service!</p>
            <p className="text-sm">Already have an account?</p>
            <a href="#" className="text-lg underline font-medium">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default SignupPage;
