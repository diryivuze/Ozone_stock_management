// src/components/dashboard/Balance.js
import React, { useState } from "react";

const Balance = () => {
  const [balances, setBalances] = useState([]);
  const [stockType, setStockType] = useState("opening");
  const [date, setDate] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [momoAmount, setMomoAmount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortType, setSortType] = useState("date"); // Sorting based on cash, momo or total
  const itemsPerPage = 5;

  const handleAddBalance = () => {
    const currentDate = new Date(date);
    const options = { weekday: "long" };
    const day = new Intl.DateTimeFormat("en-US", options).format(currentDate);

    const totalCashMomo = parseFloat(cashAmount) + parseFloat(momoAmount);

    const newBalance = {
      id: balances.length + 1,
      date: currentDate.toLocaleDateString(),
      day,
      stockType,
      cashAmount: parseFloat(cashAmount),
      momoAmount: parseFloat(momoAmount),
      totalCashMomo,
    };

    setBalances([...balances, newBalance]);

    // Reset form fields
    setStockType("opening");
    setDate("");
    setCashAmount("");
    setMomoAmount("");
    setIsModalOpen(false);
  };

  const handleSort = (type) => {
    setSortType(type);
    const sortedBalances = [...balances].sort((a, b) => {
      if (type === "cash") return b.cashAmount - a.cashAmount;
      if (type === "momo") return b.momoAmount - a.momoAmount;
      return new Date(b.date) - new Date(a.date); // Default is date sort
    });
    setBalances(sortedBalances);
  };

  // Calculate total pages
  const totalPages = Math.ceil(balances.length / itemsPerPage);

  // Filter balances by date
  const filteredBalances = filterDate
    ? balances.filter((balance) => balance.date === filterDate)
    : balances;

  // Group balances by date
  const groupedBalances = filteredBalances.reduce((acc, balance) => {
    const existing = acc.find((b) => b.date === balance.date);
    if (existing) {
      existing.cashAmount += balance.cashAmount;
      existing.momoAmount += balance.momoAmount;
      existing.totalCashMomo += balance.totalCashMomo;
    } else {
      acc.push({ ...balance });
    }
    return acc;
  }, []);

  // Get current balances to display
  const indexOfLastBalance = currentPage * itemsPerPage;
  const indexOfFirstBalance = indexOfLastBalance - itemsPerPage;
  const currentBalances = groupedBalances.slice(indexOfFirstBalance, indexOfLastBalance);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 relative min-h-screen">
      <h2 className="text-xl font-bold mb-4">Balance</h2>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between mb-4">
        <div className="flex space-x-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="filterDate">
              Filter by Date:
            </label>
            <input
              type="date"
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Sort By:</label>
            <select
              value={sortType}
              onChange={(e) => handleSort(e.target.value)}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="date">Date</option>
              <option value="cash">Cash Amount</option>
              <option value="momo">MoMo Amount</option>
              <option value="total">Total</option>
            </select>
          </div>
        </div>

        {/* Add Balance Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
        >
          Add Balance
        </button>
      </div>

      {/* Modal for adding balance */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Balance</h2>
            {/* Balance form fields here */}
            <div className="flex justify-left space-x-3">
              <button
                onClick={handleAddBalance}
                className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Balance Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Day</th>
            <th className="border border-gray-300 p-2">Stock Type</th>
            <th className="border border-gray-300 p-2">Cash Amount</th>
            <th className="border border-gray-300 p-2">MoMo Amount</th>
            <th className="border border-gray-300 p-2">Total (Cash + MoMo)</th>
          </tr>
        </thead>
        <tbody>
          {currentBalances.length > 0 ? (
            currentBalances.map((balance) => (
              <tr key={balance.id}>
                <td className="border border-gray-300 p-2">{balance.date}</td>
                <td className="border border-gray-300 p-2">{balance.day}</td>
                <td className="border border-gray-300 p-2 capitalize">{balance.stockType}</td>
                <td className="border border-gray-300 p-2">{balance.cashAmount}</td>
                <td className="border border-gray-300 p-2">{balance.momoAmount}</td>
                <td className="border border-gray-300 p-2">
                  {balance.totalCashMomo >= 0 ? (
                    <span className="text-green-500">{balance.totalCashMomo}</span>
                  ) : (
                    <span className="text-red-500"> {balance.totalCashMomo}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-300 p-2 text-gray-500 text-center">
                No balances available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>
          &nbsp;&nbsp;
          {currentPage} of {totalPages}
          &nbsp;&nbsp;
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Balance;
