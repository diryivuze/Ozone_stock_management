import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,    // New for Dashboard Overview
  FaListAlt,          // New for Product List
  FaPlusCircle,       // New for Add Stock
  FaMinusCircle,      // New for Remove Stock
  FaHistory,          // New for Transaction History
  FaWallet,           // New for Account Balance
  FaClipboardList,    // New for Stock Report
  FaUserCog,          // New for User Settings
  FaSignOutAlt,       // Keep Logout
  FaBars,             // Keep for Sidebar toggle
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen, activeView, setActiveView }) => {
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSetActive = (view) => {
    localStorage.setItem('viewmode', view);
    setActiveView(view);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 ease-in-out z-10 ${isOpen ? "w-64" : "w-16"}`}
    >
      {/* Top Menu Bar */}
      <div className="flex space-x-5 p-4 bg-gray-800">
        <button
          onClick={toggleSidebar}
          className="text-white rounded-full focus:outline-none transition-transform duration-300 hover:bg-gray-700"
        >
          <FaBars className="text-2xl" />
        </button>
        <h2 className={`text-xl font-bold transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
          Admin Panel
        </h2>
      </div>

      {/* Navigation Links with reduced margin */}
      <ul className="mt-4 space-y-2">
        {[
          { icon: <FaTachometerAlt />, label: "Dashboard Overview", view: "overview" },
          { icon: <FaListAlt />, label: "Product List", view: "Products" },
          { icon: <FaPlusCircle />, label: "Add Stock", view: "StockIn" },
          { icon: <FaMinusCircle />, label: "Remove Stock", view: "StockOut" },
          { icon: <FaHistory />, label: "Transaction History", view: "Transactions" },
          { icon: <FaWallet />, label: "Account Balance", view: "Balance" },
          { icon: <FaClipboardList />, label: "Stock Report", view: "stock" },
          { icon: <FaUserCog />, label: "User Settings", view: "Settings" },
        ].map(({ icon, label, view }) => (
          <li key={label}>
            <Link
              onClick={() => handleSetActive(view)}
              className={`flex items-center p-4 transition-all text-sm font-medium ${activeView === view ? "bg-blue-500" : "hover:bg-gray-700 text-white"}`}
            >
              <span className="text-xl">{icon}</span>
              <span className={`ml-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"} ${isOpen ? "block" : "hidden"}`}>
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button at the Bottom */}
      <div className="absolute bottom-0 w-full">
        <Link
          onClick={()=>{localStorage.clear();window.location.href=""}}
          className="flex items-center p-4 hover:bg-red-700 transition-all text-white font-medium"
        >
          <FaSignOutAlt className="text-xl" />
          <span className={`ml-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"} ${isOpen ? "block" : "hidden"}`}>
            Logout
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
