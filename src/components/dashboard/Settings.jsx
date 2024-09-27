// src/components/dashboard/Settings.js
import React, { useState } from "react";

const Settings = () => {
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...adminDetails,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setAdminDetails({
      ...adminDetails,
      profilePhoto: URL.createObjectURL(file),
    });
  };

  // Password strength validation
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSaveChanges = () => {
    if (adminDetails.newPassword !== adminDetails.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (!isValidPassword(adminDetails.newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character."
      );
      return;
    }

    // Add functionality to verify current password and save new changes (e.g., send data to the server)
    alert("Changes saved!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Username Section */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={adminDetails.username}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your username"
        />
      </div>

      {/* Current Password Section */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
          Current Password:
        </label>
        <input
          type="password"
          id="currentPassword"
          name="currentPassword"
          value={adminDetails.currentPassword}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your current password"
        />
      </div>

      {/* New Password Section */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="newPassword">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={adminDetails.newPassword}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter a new password"
        />
      </div>

      {/* Confirm New Password */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
          Confirm New Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={adminDetails.confirmPassword}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Confirm your new password"
        />
        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      </div>

      {/* Profile Photo Section */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="profilePhoto">
          Profile Photo:
        </label>
        <input
          type="file"
          id="profilePhoto"
          name="profilePhoto"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {adminDetails.profilePhoto && (
          <img
            src={adminDetails.profilePhoto}
            alt="Profile Preview"
            className="mt-4 w-32 h-32 rounded-full object-cover"
          />
        )}
      </div>

      <button
        onClick={handleSaveChanges}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
