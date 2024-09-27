import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">Sign Up</button>
      </form>
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
    </div>
  );
};

export default Signup;
