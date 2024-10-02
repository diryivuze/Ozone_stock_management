import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicAxios } from "../tokenGetter/api";

const StockOut = () => {
  const api = publicAxios();

  const [initialStockItems, SetinitialStockItems] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newStock, setNewStock] = useState({
    product_id: "",
    product_quantity: "",
    price_per_unit: "",
    total_price: "",
    date: "",
  });

  const [stockData, setStockData] = useState([]); // All stock data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Define the number of items per page
  const [sortByDate, setSortByDate] = useState("asc");

  // Fetch all products and stock data
  useEffect(() => {
    getAllProducts();
    getAllStockData();
  }, []);

  // Fetch all products for the dropdown
  const getAllProducts = () => {
    api.get(`${import.meta.env.VITE_MAIN_URL}/products/`)
      .then((res) => {
        const mappedData = res.data.map((item) => ({
          id: item.Pro_id,
          productName: item.product_name,
        }));
        SetinitialStockItems(mappedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch all stock out data for displaying in the table
  const getAllStockData = () => {
    api.get(`${import.meta.env.VITE_MAIN_URL}/stock/out/`)
      .then((res) => {
        setStockData(res.data); // Store all stock data in the state
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle stock submission
  const handleAddStockOut = (e) => {
    e.preventDefault();
    const totalPrice = newStock.product_quantity * newStock.price_per_unit;
    api.post(`${import.meta.env.VITE_MAIN_URL}/stock/out/add`, {
      ...newStock,
      total_price: totalPrice,
    })
      .then(() => {
        toast.success("Stock Out Added Successfully");
        getAllStockData(); // Refresh the stock data
        setShowAddProductModal(false);
      })
      .catch((error) => {
        if(error.response.data){

          toast.error(error.response.data.detail);
        }else{

          toast.error("Error Adding Stock");
        }
        console.log(error);
      });
  };

  // Handle delete
  const handleDelete = (stock_id) => {
    api.delete(`${import.meta.env.VITE_MAIN_URL}/stock/out/${stock_id}`)
      .then(() => {
        toast.success("Stock Deleted");
        getAllStockData(); // Refresh the stock data
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error Deleting Stock");
      });
  };

  // Handle pagination
  const totalPages = Math.ceil(stockData.length / itemsPerPage); // Calculate total pages
  const currentData = stockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // Sort by date
  const handleSortByDate = () => {
    const sortedData = [...stockData].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortByDate === "asc" ? dateA - dateB : dateB - dateA;
    });
    setStockData(sortedData);
    setSortByDate(sortByDate === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">Stock Out Dashboard</h2>
      
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
        >
          Add Product
        </button>
      </div>
      
      {/* Stock Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">Stock Out Inventory</h3>
          <button onClick={handleSortByDate} className="text-sm text-blue-500">
            Sort by Date {sortByDate === "asc" ? "↓" : "↑"}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price per Unit</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Profit Status</th>
                {/* <th className="px-4 py-2">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {currentData.map((stock) => (
                <tr key={stock.stock_id}>
                  <td className="border px-4 py-2">{stock.stock_id}</td>
                  <td className="border px-4 py-2">{stock.product_name}</td>
                  <td className="border px-4 py-2">{stock.product_quantity}</td>
                  <td className="border px-4 py-2">{stock.price_per_unit}</td>
                  <td className="border px-4 py-2">{stock.total_price}</td>
                  <td className="border px-4 py-2">{stock.date}</td>
                  <td className="border px-4 py-2">{stock.profit_status}</td>
                  {/* <td className="border px-4 py-2 flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <AiFillEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(stock.stock_id)}
                    >
                      <AiFillDelete />
                    </button>
                  </td> */}
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

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-6">Add new Stock Out</h3>
            <form onSubmit={handleAddStockOut}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Product :</label>
                <select
                  value={newStock.product_id}
                  onChange={(e) => setNewStock({ ...newStock, product_id: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                >
                  <option value="">Choose Product</option>
                  {initialStockItems.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.productName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Quantity:</label>
                <input
                  type="number"
                  value={newStock.product_quantity}
                  onChange={(e) => setNewStock({ ...newStock, product_quantity: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Product quantity"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Price Per Unit:</label>
                <input
                  type="number"
                  value={newStock.price_per_unit}
                  onChange={(e) => setNewStock({ ...newStock, price_per_unit: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter product price per unit"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium">Date:</label>
                <input
                  type="date"
                  value={newStock.date}
                  onChange={(e) => setNewStock({ ...newStock, date: e.target.value })}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                >
                  Add Stock Out
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

export default StockOut;
