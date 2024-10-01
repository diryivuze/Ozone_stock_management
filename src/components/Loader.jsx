// Spinner.js
import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Spinner;
