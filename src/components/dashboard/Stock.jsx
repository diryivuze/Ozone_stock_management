// src/components/dashboard/Stock.js
import React, { useState } from "react";

const Stock = () => {
  const initialProducts = [
    { id: 1, detail: "Donuts", quantity: 50, type: "Food", date: "2024-09-16" },
    { id: 2, detail: "Cake", quantity: 30, type: "Food", date: "2024-09-15" },
    { id: 3, detail: "Fanta (small)", quantity: 50, type: "Drink", date: "2024-09-15" },
    { id: 4, detail: "Capati", quantity: 10, type: "Food", date: "2024-09-15" },
    { id: 5, detail: "Meat Samosa", quantity: 5, type: "Food", date: "2024-09-14" },
    { id: 6, detail: "Pizza", quantity: 2, type: "Food", date: "2024-09-14" },
    { id: 7, detail: "Potato Samosa", quantity: 20, type: "Food", date: "2024-09-13" },
    { id: 8, detail: "Inyange Juice", quantity: 8, type: "Drink", date: "2024-09-12" },
  ];

  const initialReports = [
    { id: 1, productName: "Donuts", quantity: 20, pricePerUnit: 5, action: "StockIn", date: "2024-09-15" },
    { id: 2, productName: "Fanta (small)", quantity: 10, pricePerUnit: 1, action: "StockOut", date: "2024-09-16" },
    { id: 3, productName: "Pizza", quantity: 15, pricePerUnit: 10, action: "StockIn", date: "2024-09-14" },
    { id: 4, productName: "Cake", quantity: 5, pricePerUnit: 8, action: "StockOut", date: "2024-09-15" },
    { id: 5, productName: "Potato Samosa", quantity: 8, pricePerUnit: 2, action: "StockIn", date: "2024-09-16" },
    { id: 6, productName: "Inyange Juice", quantity: 12, pricePerUnit: 3, action: "StockOut", date: "2024-09-17" },
    { id: 7, productName: "Meat Samosa", quantity: 3, pricePerUnit: 4, action: "StockOut", date: "2024-09-18" },
    { id: 8, productName: "Capati", quantity: 10, pricePerUnit: 1, action: "StockIn", date: "2024-09-19" },
  ];

  const [products] = useState(initialProducts);
  const [reports, setReports] = useState(initialReports);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Pagination States
  const [currentReportPage, setCurrentReportPage] = useState(1);
  const reportsPerPage = 5;

  // Date range filter for reports
  const handleDateChange = () => {
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    const filteredReports = initialReports.filter((report) => {
      const reportDate = new Date(report.date);
      return reportDate >= fromDate && reportDate <= toDate;
    });

    setReports(filteredReports.length > 0 ? filteredReports : initialReports);
    setCurrentReportPage(1); // Reset to first page after filter
  };

  // Pagination logic
  const totalReportPages = Math.ceil(reports.length / reportsPerPage);
  const indexOfLastReport = currentReportPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const nextReportPage = () => {
    if (currentReportPage < totalReportPages) {
      setCurrentReportPage(currentReportPage + 1);
    }
  };

  const prevReportPage = () => {
    if (currentReportPage > 1) {
      setCurrentReportPage(currentReportPage - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Reports</h2>

      {/* Date Filter */}
      <div className="mb-4 flex">
        <div className="mr-4">
          <label className="mr-2 font-semibold">From:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mr-4">
          <label className="mr-2 font-semibold">To:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          onClick={handleDateChange}
          className="bg-blue-500 text-white px-5 py-2 rounded flex items-center"
        >
          Apply
        </button>
      </div>

      {/* Reports Table */}
      <table className="min-w-full bg-white border border-gray-200 text-sm mb-6 shadow-lg">
        <thead>
          <tr className="text-left border-b bg-blue-50">
            <th className="py-2 px-4 text-gray-600">Report ID</th>
            <th className="py-2 px-4 text-gray-600">Product Name</th>
            <th className="py-2 px-4 text-gray-600">Quantity</th>
            <th className="py-2 px-4 text-gray-600">Price/Unit</th>
            <th className="py-2 px-4 text-gray-600">Action</th>
            <th className="py-2 px-4 text-gray-600">Amount</th>
            <th className="py-2 px-4 text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentReports.map((report) => (
            <tr key={report.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4 text-gray-800">{report.id}</td>
              <td className="py-2 px-4 text-gray-800">{report.productName}</td>
              <td className="py-2 px-4 text-gray-800">{report.quantity}</td>
              <td className="py-2 px-4 text-gray-800">{report.pricePerUnit}</td>
              <td className="py-2 px-4 text-gray-800">{report.action}</td>
              <td className="py-2 px-4 text-gray-800">
                {report.quantity * report.pricePerUnit}
              </td>
              <td className="py-2 px-4 text-gray-800">{report.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={prevReportPage}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
          disabled={currentReportPage === 1}
        >
          Previous
        </button>
        <span>
        &nbsp;&nbsp; {currentReportPage} of {totalReportPages}
        &nbsp;&nbsp;</span>
        <button
          onClick={nextReportPage}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
          disabled={currentReportPage === totalReportPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stock;
