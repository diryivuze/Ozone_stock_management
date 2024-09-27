import React from "react";
import Navbar from "../components/NavBar";

const HomePage = () => {
  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
      <section 
  className="relative w-full h-screen bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/stock-management2.jpeg')",
    backgroundSize: "cover",
  }}
>
        <div className="bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-4 font-poppins">
              Welcome to Ozone Stock Management
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 font-light font-merriweather">
              Efficiently manage and track your milk stock with ease
            </p>
            <a
              href="/about"
              className="bg-indigo-600 text-white py-3 px-6 rounded-full hover:bg-indigo-500 transition duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 font-poppins">
            Why Choose Ozone Stock Management?
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-12 font-merriweather">
            A complete stock management system designed to help you track and
            manage your milk inventory seamlessly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300">
              <div className="mb-4">
                <img
                  src="/images/inventory2.jpg"
                  alt="Inventory Management"
                  className="h-40 md:h-48 w-full object-cover rounded-md group-hover:scale-105 transform transition duration-500"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 font-poppins">
                Inventory Tracking
              </h3>
              <p className="text-gray-600 font-merriweather">
                Monitor your milk stock levels and avoid shortages with
                real-time updates and detailed analytics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300">
              <div className="mb-4">
                <img
                  src="/images/transactions.jpeg"
                  alt="Transaction Management"
                  className="h-40 md:h-48 w-full object-cover rounded-md group-hover:scale-105 transform transition duration-500"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 font-poppins">
                Transaction History
              </h3>
              <p className="text-gray-400 font-merriweather">
                Keep track of all financial transactions, purchases, and sales
                with secure transaction logs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300">
              <div className="mb-4">
                <img
                  src="/images/analytics.jpg"
                  alt="Stock Analytics"
                  className="h-40 md:h-48 w-full object-cover rounded-md group-hover:scale-105 transform transition duration-500"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 font-poppins">
                Stock Analytics
              </h3>
              <p className="text-gray-600 font-merriweather">
                Use data-driven insights to optimize stock levels and ensure
                continuous supply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Graphic Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-400 to-indigo-900 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">
          Monitor Your Stock in Real-Time
        </h2>
        <div className="flex flex-col items-center space-y-8">
          <div className="max-w-lg">
            <img
              src="/images/real-time-stock2.webp"
              alt="Real-time stock tracking"
              className="h-60 md:h-80 w-full object-cover rounded-md shadow-lg"
            />
          </div>
          <p className="text-lg md:text-xl font-merriweather">
            Ozone Stock Management provides real-time data that helps you stay
            informed of every stock movement.
          </p>
        </div>
      </section>
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

export default HomePage;
