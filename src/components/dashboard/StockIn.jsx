import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StockIn = ({ products, setProducts }) => {
  const initialStockItems = [
    { id: 1, productName: "Donuts", quantity: 50, date: "2024-09-16", type: "Food", price: 100 },
    { id: 2, productName: "Cake", quantity: 30, date: "2024-09-15", type: "Food", price: 200 },
    { id: 3, productName: "Fanta (small)", quantity: 50, date: "2024-09-15", type: "Drink", price: 1000 },
    { id: 4, productName: "Capati", quantity: 40, date: "2024-09-16", type: "Food", price: 200 },
    { id: 5, productName: "Samosa", quantity: 10, date: "2024-09-15", type: "Food", price: 300 },
    { id: 6, productName: "Orange", quantity: 20, date: "2024-09-15", type: "Drink", price: 1000 },
    
  ];

  const [stockItems, setStockItems] = useState(initialStockItems);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const notify = (message) => toast(message);

  // Pagination calculations
  const totalPages = Math.ceil(stockItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const displayedStock = stockItems.slice(startIdx, startIdx + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProductName && newProductType && newProductPrice) {
      const newProduct = {
        id: stockItems.length > 0 ? Math.max(...stockItems.map(item => item.id)) + 1 : 1,
        productName: newProductName,
        quantity: 0,
        date: new Date().toISOString().split("T")[0],
        type: newProductType,
        price: parseFloat(newProductPrice),
      };
      setStockItems([...stockItems, newProduct]);
      // Add to the Products table as well
      setProducts([...products, newProduct]);
      notify("Product added successfully!");
      setShowAddProductModal(false);
      resetNewProductForm();
    } else {
      notify("Please fill in all product details.");
    }
  };

  const resetNewProductForm = () => {
    setNewProductName("");
    setNewProductType("");
    setNewProductPrice("");
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const selectedProductDetails = stockItems.find(item => item.productName === selectedProduct);
    if (selectedProductDetails && quantity && date) {
      const updatedStockItems = stockItems.map(item => {
        if (item.productName === selectedProduct) {
          return { ...item, quantity: item.quantity + parseInt(quantity), date };
        }
        return item;
      });
      setStockItems(updatedStockItems);
      notify("Stock added successfully!");
      setQuantity("");
      setDate("");
      setSelectedProduct("");
    } else {
      notify("Please fill in all the details.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">Stock in Dashboard</h2>

      {/* Stock Form */}
      <form className="mb-6" onSubmit={handleAddStock}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1 font-medium">Select Product:</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            >
              <option value="">Select a product</option>
              {stockItems.map((item) => (
                <option key={item.id} value={item.productName}>
                  {item.productName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              placeholder="Enter quantity"
              required
              min="1"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Add Stock
          </button>

        </div>
      </form>

      {/* Stock Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Stock Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Product</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Type</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {displayedStock.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="border border-gray-300 px-4 py-2">{item.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
          >
            Previous
          </button>
          <span className="mx-2">{currentPage} of {totalPages}</span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
          >
            Next
          </button>
        </div>
      </div>
&nbsp;
      
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
        >
          Add Product
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-6">Add new product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Product Name:</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Type:</label>
                <input
                  type="text"
                  value={newProductType}
                  onChange={(e) => setNewProductType(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter product type"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium">Price:</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter price"
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              {/* Modal Action Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockIn;
