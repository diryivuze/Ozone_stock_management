import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LogIn from "./Pages/LogIn";
import Dashboard from "./Pages/Dashboard";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Settings from "./components/dashboard/Settings";

const App = () => {
  const dash = localStorage.getItem('Ozone_token') ? <Dashboard /> : <LogIn />
  return (
    <Router>
      <Routes>
        {/* Define route for root path ("/") */}
        <Route path="/" element={<HomePage />} />

        {/* Define route for "/home" */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={dash} />
        <Route path="/login" element={dash} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
