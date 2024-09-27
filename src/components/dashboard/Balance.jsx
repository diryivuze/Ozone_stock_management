// src/components/dashboard/Balance.js
import React, { useState } from "react";

const Balance = () => {
  const [balances, setBalances] = useState([

  ]);
  const [stockType, setStockType] = useState("opening"); // Stock type: opening or closing
  const [date, setDate] = useState(""); // Date of the balance
  const [cashAmount, setCashAmount] = useState(""); // Cash balance
  const [momoAmount, setMomoAmount] = useState(""); // MoMo balance
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const handleAddBalance = () => {
    const currentDate = new Date(date);
    const options = { weekday: "long" };
    const day = new Intl.DateTimeFormat("en-US", options).format(currentDate);

    const totalCashMomo = parseFloat(cashAmount) + parseFloat(momoAmount); // Total of Cash and MoMo

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
  };

  // Calculate total pages
  const totalPages = Math.ceil(balances.length / itemsPerPage);

  // Get current balances to display
  const indexOfLastBalance = currentPage * itemsPerPage;
  const indexOfFirstBalance = indexOfLastBalance - itemsPerPage;
  const currentBalances = balances.slice(
    indexOfFirstBalance,
    indexOfLastBalance
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

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Balance Dashboard</h2>

      {/* Form to add balance */}
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="stockType">
            Stock Type:
          </label>
          <select
            id="stockType"
            value={stockType}
            onChange={(e) => setStockType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="opening">Opening Stock</option>
            <option value="closing">Closing Stock</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cashAmount">
            Cash Amount:
          </label>
          <input
            type="number"
            id="cashAmount"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter cash amount"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="momoAmount">
            MoMo Amount:
          </label>
          <input
            type="number"
            id="momoAmount"
            value={momoAmount}
            onChange={(e) => setMomoAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter MoMo amount"
          />
        </div>

        <button
          onClick={handleAddBalance}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Balance
        </button>
      </div>

      {/* Balance Table */}
      <h2 className="text-3xl font-bold mb-4 ">Balance Report</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
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
                <td className="border border-gray-300 p-2">{balance.id}</td>
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
              <td colSpan="7" className="border border-gray-300 p-2 text-gray-500 text-center">
                No balances added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={prevPage}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>&nbsp;&nbsp;
         {currentPage} of {totalPages}
         &nbsp;&nbsp;</span>
        <button
          onClick={nextPage}
          className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Balance;
