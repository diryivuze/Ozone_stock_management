import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/NavBar'; // Import the NavBar component

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    toast.success('Message sent successfully!', {
      autoClose: 3000,
    });
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="font-sans">
      <Navbar /> {/* Add NavBar component here */}

      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 font-poppins text-center">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-base md:text-lg font-merriweather mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-base md:text-lg font-merriweather mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="message" className="block text-base md:text-lg font-merriweather mb-2 text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-500 transition duration-300 mt-6"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      <p>&nbsp;</p>
      <section className="bg-gray-700 text-white py-16" id="contact">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 font-poppins">Contact Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="flex flex-col justify-center">
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Have questions or need support? We're here to help! Get in touch with us through any of the following methods:
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Email: <a href="mailto:ozonemilkzone@gmail.com" className="text-indigo-300 hover:underline">ozonemilkzone@gmail.com</a>
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Phone: <a href="tel:+250787695723" className="text-indigo-300 hover:underline">+250 787 695 723</a>
              </p>
              <p className="text-base md:text-lg text-gray-300 mb-4 font-merriweather">
                Address: 3 KG 92 St, Kigali, Rwanda
              </p>
              <a href="mailto:ozonemilkzone@gmail.com" className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-500 transition duration-300 inline-block mt-4">
                Email Us
              </a>
            </div>

            {/* Embedded Map */}
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
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>&copy; 2024 Ozone Milk Zone. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
