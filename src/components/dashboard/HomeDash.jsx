import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaCashRegister, FaChartLine } from "react-icons/fa";

const HomeDash = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State for financial values
  const [todaysEarnings, setTodaysEarnings] = useState({ momo: 0, cash: 0 });
  const [yesterdaysEarnings, setYesterdaysEarnings] = useState({
    momo: 0,
    cash: 0,
  });
  const [totalEarnings, setTotalEarnings] = useState({ momo: 0, cash: 0 });

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setTodaysEarnings({ momo: 2000, cash: 1500 });
        setYesterdaysEarnings({ momo: 1800, cash: 1200 });
        setTotalEarnings({ momo: 5000, cash: 2500 });
      }, 1000);
    };

    fetchData();
  }, []);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const products = [
    { no: 1, detail: "Donuts", quantity: 50, price: 100, date: "2024-09-16", status: "stockout" },
    { no: 2, detail: "Cake", quantity: 30, price: 100, date: "2024-09-15", status: "stockin" },
    { no: 3, detail: "Fanta (small)", quantity: 50, price: 1000, date: "2024-09-15", status: "stockout" },
    { no: 4, detail: "Capati", quantity: 10, price: 200, date: "2024-09-15", status: "stockout" },
    { no: 5, detail: "Meat Samosa", quantity: 5, price: 300, date: "2024-09-14", status: "stockout" },
    { no: 6, detail: "Pizza", quantity: 2, price: 500, date: "2024-09-14", status: "stockin" },
    { no: 7, detail: "Potato Samosa", quantity: 20, price: 200, date: "2024-09-13", status: "stockout" },
    { no: 8, detail: "Inyange Juice", quantity: 8, price: 1000, date: "2024-09-12", status: "stockout" },
  ];

  // Pagination State
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  const paginatedProducts = getPaginatedProducts();

  const totalAmount = paginatedProducts.reduce((sum, product) => sum + product.quantity * product.price, 0);

  return (
    <>
      <div className="p-6 w-full bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-blue-900">Dashboard Overview</h2>

        {/* Financial Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-teal-600">Today's Earnings</h3>
              <p className="text-lg font-medium text-gray-700">MoMo: Frw {todaysEarnings.momo}</p>
              <p className="text-lg font-medium text-gray-700">Cash: Frw {todaysEarnings.cash}</p>
            </div>
            <FaMoneyBillWave size={24} className="text-teal-500" />
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-green-600">Yesterday's Earnings</h3>
              <p className="text-lg font-medium text-gray-700">MoMo: Frw {yesterdaysEarnings.momo}</p>
              <p className="text-lg font-medium text-gray-700">Cash: Frw {yesterdaysEarnings.cash}</p>
            </div>
            <FaCashRegister size={24} className="text-green-600" />
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-orange-700">Total Earnings</h3>
              <p className="text-lg font-medium text-gray-700">MoMo: Frw {totalEarnings.momo}</p>
              <p className="text-lg font-medium text-gray-700">Cash: Frw {totalEarnings.cash}</p>
            </div>
            <FaChartLine size={24} className="text-orange-700" />
          </div>
        </div>

        {/* Recent Stock Section */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Recent Stock Out</h4>
          <table className="min-w-full bg-white border border-gray-200 text-sm">
            <thead>
              <tr className="text-left border-b bg-gray-50">
                <th className="py-2 px-4 text-gray-600">Transaction ID</th>
                <th className="py-2 px-4 text-gray-600">Product Name</th>
                <th className="py-2 px-4 text-gray-600">Quantity</th>
                <th className="py-2 px-4 text-gray-600 hidden md:table-cell">Remaining Quantity</th>
                <th className="py-2 px-4 text-gray-600 hidden md:table-cell">Selling Price (Unit)</th>
                <th className="py-2 px-4 text-gray-600 hidden md:table-cell">Status</th>
                <th className="py-2 px-4 text-gray-600">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => (
                <tr
                  key={product.no}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleShowModal(product)}
                >
                  <td className="py-2 px-4 text-gray-800">#{product.no}</td>
                  <td className="py-2 px-4 text-gray-800">{product.detail}</td>
                  <td className="py-2 px-4 text-gray-800">{product.quantity}</td>
                  <td className="py-2 px-4 text-gray-800 hidden md:table-cell">30</td>
                  <td className="py-2 px-4 text-gray-800 hidden md:table-cell">Frw {product.price}</td>
                  <td className="py-2 px-4 hidden md:table-cell">
                    {product.status === "stockin" ? (
                      <span className="p-1 text-green-500 font-semibold">Stock In</span>
                    ) : (
                      <span className="p-1 text-red-500 font-semibold">Stock Out</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-gray-800">Frw {product.quantity * product.price}</td>
                </tr>
              ))}
              {/* Total Amount Row */}
              <tr className="font-bold text-gray-800">
                <td colSpan="6" className="py-2 px-4">Total Amount:</td>
                <td className="py-2 px-4">Frw {totalAmount}</td>
              </tr>
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
            >
              Previous
            </button>
            <div>
              &nbsp;&nbsp;{currentPage} of {totalPages}&nbsp;&nbsp;
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal for Product Details */}
        {showModal && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <p><strong>Product:</strong> {selectedProduct.detail}</p>
              <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
              <p><strong>Price per unit:</strong> Frw {selectedProduct.price}</p>
              <button
                onClick={handleCloseModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeDash;
