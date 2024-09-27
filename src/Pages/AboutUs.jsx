import React from 'react';
import Navbar from '../components/NavBar';

const AboutUs = () => {
  return (
    <div className="font-sans">
      <Navbar />
      
      {/* About Us Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side: About Us Content */}
          <div className="text-left flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-6 font-poppins">
              About Us
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 font-merriweather leading-relaxed">
              At Ozone Milk Zone, we are dedicated to providing an efficient and reliable stock management solution for dairy products. Our platform is designed to ensure seamless inventory tracking, robust transaction management, and insightful analytics to help you optimize stock levels and meet customer demands effectively.
              <br /><br />
              Our commitment is to offer a user-friendly experience that enhances operational efficiency, minimizes waste, and ensures timely deliveries. Discover how our innovative solution can transform your milk stock management process.
            </p>
          </div>

          {/* Right Side: Interactive Graphics or Image */}
          <div className="flex justify-center items-center">
            <div className="relative group w-full h-full">
              <img
                src="/images/stock-management2.jpeg"
                alt="Stock Management"
                className="h-80 w-full object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              />
              <div className="absolute inset-0 bg-indigo-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                <p className="text-white text-lg font-semibold">Explore Our Management Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src="/images/team-collaboration.jpg"
              alt="Team Collaboration"
              className="h-60 w-90 object-cover rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            />
          </div>
          <div className="text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4 font-poppins">Our Vision</h3>
            <p className="text-lg md:text-xl text-gray-600 font-merriweather leading-relaxed">
              At Ozone Milk Zone, we envision a world where dairy product management is streamlined and optimized using technology, providing businesses with real-time insights and making inventory management simpler than ever before.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-6 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white text-blue-900 shadow-lg p-6 rounded-lg hover:shadow-2xl transition-all duration-300">
              <img src="/images/innovation2.jpg" alt="Innovation" className="h-40 w-full object-cover rounded-md mb-4 group-hover:scale-105 transform transition duration-500" />
              <h4 className="text-xl font-semibold font-poppins">Innovation</h4>
              <p className="text-gray-700 font-merriweather">We continuously innovate to bring the best technology solutions for dairy stock management.</p>
            </div>

            <div className="group bg-white text-blue-900 shadow-lg p-6 rounded-lg hover:shadow-2xl transition-all duration-300">
              <img src="/images/integrity.jpeg" alt="Integrity" className="h-40 w-full object-cover rounded-md mb-4 group-hover:scale-105 transform transition duration-500" />
              <h4 className="text-xl font-semibold font-poppins">Integrity</h4>
              <p className="text-gray-700 font-merriweather">Our commitment to transparency and ethical practices ensures trust with our customers.</p>
            </div>

            <div className="group bg-white text-blue-900 shadow-lg p-6 rounded-lg hover:shadow-2xl transition-all duration-300">
              <img src="/images/customer-focus1.jpeg" alt="Customer Focus" className="h-40 w-full object-cover rounded-md mb-4 group-hover:scale-105 transform transition duration-500" />
              <h4 className="text-xl font-semibold font-poppins">Customer Focus</h4>
              <p className="text-gray-700 font-merriweather">We prioritize our customers' needs and tailor our services to ensure satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
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

export default AboutUs;
