import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaMoneyBill, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import { publicAxios } from "../tokenGetter/api";

const StockOut = () => {
  const api = publicAxios();

  const [stockData, setStockData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of rows per page
  const [selectedStock, setSelectedStock] = useState(null); // For modal details
  const [expandedProducts, setExpandedProducts] = useState({}); // Track collapsed/expanded rows

  useEffect(() => {
    getStockOutData();
  }, []);

  const getStockOutData = () => {
    api
      .post(`${import.meta.env.VITE_MAIN_URL}/stock/out/byDate`)
      .then((res) => {
        setStockData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Handle pagination
  const totalPages = Math.ceil(stockData.length / itemsPerPage);
  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  // Group data by product name
  const groupStockByProduct = () => {
    return stockData.reduce((acc, item) => {
      const { product_name } = item;
      if (!acc[product_name]) {
        acc[product_name] = { total: 0, items: [] };
      }
      acc[product_name].total += Number(item.total_price);
      acc[product_name].items.push(item);
      return acc;
    }, {});
  };

  const groupedStock = groupStockByProduct();

  // Handle row click to show more details in a modal
  const handleRowClick = (stock) => {
    setSelectedStock(stock);
  };

  const toggleProductCollapse = (productName) => {
    setExpandedProducts((prev) => ({
      ...prev,
      [productName]: !prev[productName],
    }));
  };

  const closeModal = () => {
    setSelectedStock(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Stock Out Dashboard</h2>
        <a href="/view-all-details" className="text-blue-500 hover:underline">
          View All in Details
        </a>
      </div>

      {/* Responsive Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow-md flex items-center">
          <FaMoneyBill className="text-green-500 text-3xl mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Today's Earnings</h4>
            <p>MoMo: Frw 2000</p>
            <p>Cash: Frw 1500</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-md flex items-center">
          <FaMoneyBill className="text-yellow-500 text-3xl mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Yesterday's Earnings</h4>
            <p>MoMo: Frw 1800</p>
            <p>Cash: Frw 1200</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded shadow-md flex items-center">
          <FaMoneyBill className="text-blue-500 text-3xl mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Total Earnings</h4>
            <p>MoMo: Frw 5000</p>
            <p>Cash: Frw 2500</p>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Stock Out Inventory</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price per Unit</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Profit Status</th>
                <th className="px-4 py-2">Expand</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedStock)
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((productName) => (
                  <React.Fragment key={productName}>
                    {/* Main Row for Totals */}
                    <tr className="bg-blue-50">
                      <td className="px-4 py-2 text-[#363579] font-bold">#H{groupedStock[productName].items[0].stock_id}P</td>
                      <td className="px-4 py-2 text-[#363579] font-bold">{productName}</td>
                      <td className="px-4 py-2 text-[#363579] font-bold">
                        {groupedStock[productName].items.reduce((sum, item) => sum + Number(item.product_quantity), 0)}
                      </td>
                      <td className="px-4 py-2 text-[#363579] font-bold">
                        {groupedStock[productName].items.reduce((sum, item) => sum + Number(item.price_per_unit), 0)}
                      </td>
                      <td className="px-4 py-2 text-[#363579] font-bold">
                        {groupedStock[productName].total}
                      </td>
                      <td className="px-4 py-2 text-[#363579] font-bold">{groupedStock[productName].items[0].date}</td>
                      <td className="px-4 py-2 text-[#363579] font-bold">{groupedStock[productName].items[0].tra_type}</td>
                      <td
                        className={`px-4 py-2 text-[#363579] font-bold ${groupedStock[productName].items[0].profit_status === "profit"
                            ? "text-green-500"
                            : groupedStock[productName].items[0].profit_status === "loss"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }`}
                      >
                        {groupedStock[productName].items[0].profit_status}
                      </td>
                      <td className="px-4 py-2 text-[#363579] font-bold">
                        <button onClick={() => toggleProductCollapse(productName)}>
                          {expandedProducts[productName] ? <AiFillCaretUp /> : <AiFillCaretDown />}
                        </button>
                      </td>
                    </tr>

                    {/* Collapsible Rows */}
                    {expandedProducts[productName] &&
                      groupedStock[productName].items.map((item, index) => (
                        <tr
                          key={index}
                          className="cursor-pointer hover:bg-gray-100 transition"
                          onClick={() => handleRowClick(item)}
                        >
                          <td className=" px-4 py-2">{item.stock_id}</td>
                          <td className=" px-4 py-2">{item.product_name}</td>
                          <td className=" px-4 py-2">{item.product_quantity}</td>
                          <td className=" px-4 py-2">{item.price_per_unit}</td>
                          <td className=" px-4 py-2">{item.total_price}</td>
                          <td className=" px-4 py-2">{item.date}</td>
                          <td className=" px-4 py-2">{item.tra_type}</td>
                          <td
                            className={` px-4 py-2 ${item.profit_status === "profit"
                                ? "text-green-500"
                                : item.profit_status === "loss"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }`}
                          >
                            {item.profit_status}
                          </td>
                          <td className=" px-4 py-2"></td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            <FaArrowLeft /> 
          </button>
          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
             <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Modal for more details */}
      {selectedStock && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-6">Stock Details</h3>
            <div className="mb-4">
              <p><strong>ID:</strong> {selectedStock.stock_id}</p>
              <p><strong>Product Name:</strong> {selectedStock.product_name}</p>
              <p><strong>Product Type:</strong> {selectedStock.product_type}</p>
              <p><strong>Quantity:</strong> {selectedStock.product_quantity}</p>
              <p><strong>Remaining Quantity:</strong> {selectedStock.remaing_quantity}</p>
              <p><strong>Price per Unit:</strong> {selectedStock.price_per_unit}</p>
              <p><strong>Total Price:</strong> {selectedStock.total_price}</p>
              <p><strong>Date:</strong> {selectedStock.date}</p>
              <p><strong>Profit Status:</strong> {selectedStock.profit_status}</p>
              <p><strong>Transaction Type:</strong> {selectedStock.tra_type}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockOut;
