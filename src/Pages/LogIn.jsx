import React, { useState } from 'react';
import { FaGoogle, FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '../components/Loader'; // Import the Loader component

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show the loader when request starts
    let data = {
      username: username,
      password: password,
    };
    axios.post(`${import.meta.env.VITE_MAIN_URL}/auth/login`, data)
      .then(response => {
        setLoading(false); // Hide the loader after response
        if (response.status === 200) {
          localStorage.setItem('Ozone_token', response.data.access_token);
          localStorage.setItem('viewmode', 'overview');
          window.location.href = ''; // Reload the page or navigate
        } else {
          toast.error('Error while logging in. Try again later.');
        }
      })
      .catch(error => {
        setLoading(false); // Hide the loader after error
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.detail);
        } else {
          toast.error('System is down. Contact the admin.');
        }
      });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Display loader if loading is true */}
      {loading && <Loader />}

      {/* NavBar Section */}
      <Navbar />

      {/* Title Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-300 py-8 text-center">
        <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
        <p className="text-lg text-gray-200 mt-2">Log in to manage your stock and more</p>
      </div>
      <p>&nbsp;</p>

      {/* Content Section */}
      <div className="flex flex-1 justify-center items-center bg-gray-100">
        <div className="flex w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="hidden md:block w-1/2 bg-center" style={{ backgroundImage: "url('/images/stock-management2.jpeg')" }}></div>

          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 bg-white">
            <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">Login to Your Account</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password type
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-7 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember Me</label>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition duration-300"
              >
                Login
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-right mt-4">
              <a href="/forgot-password" className="text-sm text-indigo-500 hover:underline">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>

      <p>&nbsp;</p>

      <section className="bg-gray-700 text-white py-16" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 font-poppins">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Have questions or need support? We're here to help! Get in touch with us through any of the following methods:
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Username: <a href="mailto:ozonemilkzone@gmail.com" className="text-indigo-300 hover:underline">ozonemilkzone@gmail.com</a>
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Phone: <a href="tel:+250787695723" className="text-indigo-300 hover:underline">+250 787 695 723</a>
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Address: 3 KG 92 St, Kigali, Rwanda
              </p>
              <a href="mailto:ozonemilkzone@gmail.com" className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-500 transition duration-300 inline-block mt-4">
                Username Us
              </a>
            </div>

            <div className="flex justify-center items-center">
              <iframe
                title="Ozone Milk Zone Location"
                src="https://www.google.com/maps/embed?pb=!3m2!1sen!2srw!4v1726564103278!5m2!1sen!2srw!6m8!1m7!1sdIE2ZkKPo7SjyAmDVhXd1A!2m2!1d-1.934732253371465!2d30.13270432940653!3f94.75124177457948!4f-18.0709751040645!5f0.7820865974627469"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LogIn;
