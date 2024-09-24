import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-2xl font-bold">Blogify</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/dashboard" className="text-white">Dashboard</Link>
          <Link to="/login" className="text-white">Login</Link>
          <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
