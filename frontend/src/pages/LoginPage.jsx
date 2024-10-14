import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};
    if (!email) formErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) formErrors.email = 'Invalid email address';
    if (!password) formErrors.password = 'Password is required';
    return formErrors;
  };

  const handleformsubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('The login form data is submitted', response.data);
      alert('! ! login successfully ! !');
      login();
      navigate('/dashboard');
    } catch (error) {
      alert("invalid cridentials");
      console.log('error in submitting login form', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-4/5 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Log In</h2>
          <form onSubmit={handleformsubmit} className="space-y-4">
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
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
            >
              Log In
            </button>
          </form>
          <p className="mt-6 text-center text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="text-green-500 hover:underline font-medium">
              Sign up here
            </a>
          </p>
        </div>

        <div className="w-1/2 bg-gradient-to-r from-green-400 to-blue-500 text-white flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg mb-4">We're so happy to see you again. Log in and experience our service!</p>
            <p className="text-sm">Don't have an account?</p>
            <a href="#" className="text-lg underline font-medium">Sign up here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
