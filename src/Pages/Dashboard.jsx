import React, { useState } from "react";
import Sidebar from "../components/SideBar"; // Ensure correct import path
import { Link } from "react-router-dom";
import HomeDash from "../components/dashboard/HomeDash";
import StockIn from "../components/dashboard/StockIn";
import StockOut from "../components/dashboard/StockOut"; // Import additional components
import Transactions from "../components/dashboard/Transactions";
import Balance from "../components/dashboard/Balance";
import Settings from "../components/dashboard/Settings";
import Stock from "../components/dashboard/Stock";
import Products from '../components/dashboard/Products';

const Dashboard = () => {
  // State management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown menu state
  const [activeView, setActiveView] = useState("overview"); // Active dashboard view state

  // Toggle the visibility of the dropdown menu
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Render content based on the active view
  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <HomeDash />;
        case "Products":
          return <Products />;
        case "stock":
        return <Stock />;
      case "StockIn":
        return <StockIn />;
      case "StockOut":
        return <StockOut />;
      case "Transactions":
        return <Transactions />;
      case "Balance":
        return <Balance />;
      case "Settings":
        return <Settings />;
      default:
        return <HomeDash />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`relative transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>

      {/* Main Content */}
      <div className={`flex flex-col bg-gray-100 flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-0" : "ml-16"}`}>
        {/* Navigation Bar */}
        <nav className="bg-white p-2 flex items-center justify-between shadow">
          <h1 className="text-3xl font-bold text-blue-900">OZONE Milk Zone</h1>

          {/* Profile Dropdown */}
          <div className="relative flex-shrink-0">
            <img
              src="/images/profile.jpg"
              alt="Admin"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <Link
                  to="/Settings"
                  className="block px-3 py-1.5 text-gray-800 font-bold hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out text-sm"
                >
                  Settings
                </Link>
                <Link
                  to="/login"
                  className="block px-3 py-1.5 text-gray-800 font-bold hover:bg-red-500 hover:text-white transition duration-300 ease-in-out text-sm"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Main Dashboard Content */}
        <div className="flex-1 p-4 transition-all duration-300">
          {renderContent()}
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
