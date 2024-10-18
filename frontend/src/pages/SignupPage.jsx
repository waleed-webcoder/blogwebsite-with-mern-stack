import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SignupPage = () => {
  const [name, setname] = useState('');
  const [number, setnumber] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [gender, setgender] = useState('');
  const [profilepic, setprofilepic] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!name.trim()) formErrors.name = 'Full name is required';
    if (!email) formErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) formErrors.email = 'Invalid email address';
    if (!password) formErrors.password = 'Password is required';
    if (!number) formErrors.number = 'Phone number is required';
    else if (number.length > 11) formErrors.number = 'Phone number must not exceed 11 digits';
    if (!gender) formErrors.gender = 'Please select your gender';
    return formErrors;
  };

  const handlefile = (e) => {
    setprofilepic(e.target.files[0]);
  };

  const handleformsubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const formdata = new FormData();
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('number', number);
    formdata.append('profilepic', profilepic);
    formdata.append('gender', gender);

    try {
      const response = await axios.post('http://localhost:3000/signup', formdata, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('the signup form is submitted', response.data);
      alert('! ! Sign Up Successfully ! !');
      navigate('/otp-verification', { state: { userId: response.data.userId } });
    } catch (error) {
      console.log('error in submitting form', error);
    }
  };

  return (
    <div className="min-h-screen relative top-3 flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row   w-11/12 lg:w-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side - Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Sign Up</h2>
          <form onSubmit={handleformsubmit} className="space-y-4">
            <div>
              <input
                type="text"
                onChange={(e) => setname(e.target.value)}
                name="name"
                placeholder="Full Name"
                className={`block w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <input
                type="number"
                onChange={(e) => setnumber(e.target.value)}
                name="number"
                placeholder="Phone Number"
                className={`block w-full p-3 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm`}
              />
              {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
            </div>
            <div>
              <input
                type="email"
                onChange={(e) => setemail(e.target.value)}
                name="email"
                placeholder="Email Address"
                className={`block w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                onChange={(e) => setpassword(e.target.value)}
                name="password"
                placeholder="Password"
                className={`block w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 placeholder-gray-500 shadow-sm`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
                className={`block w-full p-3 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm`}
              >
                <option value="" disabled>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-green-500 hover:underline font-medium">
              Log in here
            </Link>
          </p>
        </div>

        {/* Right side - Image/Text Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-md lg:text-lg mb-4">We're so happy to see you again. Sign up today and experience our service!</p>
            <p className="text-sm">Already have an account?</p>
            <Link to="/login" className="text-lg underline font-medium">Login here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
