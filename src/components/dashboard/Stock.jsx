import React, { useState, useEffect } from "react";
import { publicAxios } from "../tokenGetter/api";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import 'jspdf-autotable';
const Balance = () => {
  const api = publicAxios();
  const [stockData, setStockData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts or date range changes
  useEffect(() => {
    if (startDate && endDate) {
      getStockOutData();
    }
  }, [startDate, endDate]);

  const getStockOutData = () => {
    api.post(`${import.meta.env.VITE_MAIN_URL}/stock/out/byDate?startDate=${startDate}&endDate=${endDate}`)
      .then((res) => {
        setStockData(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching data");
      });

  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.text("Stock Report", 14, 10);

    // Define the columns
    const tableColumn = [
      "Product",
      "Quantity",
      "Price per Unit",
      "Total Price",
      "Date",
      "Type",
      "Profit Status"
    ];

    // Prepare the data to be displayed in the table
    const tableRows = stockData.map((item) => [
      item.product_name,
      item.product_quantity,
      item.price_per_unit,
      item.total_price,
      new Date(item.date).toLocaleDateString(),
      item.tra_type,
      item.profit_status,
    ]);

    // Generate the table
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // The position where the table starts in the PDF
      theme: 'grid', // You can change this to 'plain' or 'striped' for different table styles
    });

    // Save the PDF
    doc.save("stock_report.pdf");
  };

  return (
    <div className="p-4 relative min-h-screen bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-slate-800 pl-5">Report</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Filter and Sort Controls */}
      <div className="flex justify-between mb-4 pt-4 pl-5 pr-7 rounded-lg">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white p-2 h-10 rounded shadow hover:bg-yellow-600 transition"
        >
          Change Date Range
        </button>

        <button
          onClick={handleDownloadPDF}
          className="bg-blue-500 text-white p-2 h-10 rounded shadow hover:bg-blue-600 transition"
        >
          Download PDF Report
        </button>
      </div>

      {/* Modal for changing date range */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Date Range</h2>
            <div className="flex gap-5 justify-center">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="start-date">
                  Start Date:
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="end-date">
                  End Date:
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Get Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Balance Table */}
      <div className="p-5 w-full overflow-x-auto bg-gray-10 rounded-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
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
            </tr>
          </thead>
          <tbody>
            {stockData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
              <tr key={item.stock_id} className="bg-white border-b">
                <td className="px-4 py-2">{item.stock_id}</td>
                <td className="px-4 py-2">{item.product_name}</td>
                <td className="px-4 py-2">{item.product_quantity}</td>
                <td className="px-4 py-2">{item.price_per_unit}</td>
                <td className="px-4 py-2">{item.total_price}</td>
                <td className="px-4 py-2">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{item.tra_type}</td>
                <td className="px-4 py-2">{item.profit_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {Math.ceil(stockData.length / itemsPerPage) > 1 && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Previous
          </button>
          <span className="mx-4">
            {currentPage} of {Math.ceil(stockData.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(stockData.length / itemsPerPage)))}
            disabled={currentPage === Math.ceil(stockData.length / itemsPerPage)}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Balance;
