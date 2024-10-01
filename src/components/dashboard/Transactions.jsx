// src/components/dashboard/Transactions.js
import React, { useState } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("cash");
  const [date, setDate] = useState(""); // State for transaction date
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const itemsPerPage = 5; // Set the number of items to display per page

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount: parseFloat(amount), // Ensure amount is a float
      type,
      date, // Include date in the transaction
    };
    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setType("cash");
    setDate(""); // Clear date input after submission
    setIsModalOpen(false); // Close modal after adding transaction
  };

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Get current transactions to display
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
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
    <div className="p-4 relative min-h-screen">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      {/* Transactions Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border border-gray-300 text-center p-2">{transaction.id}</td>
              <td className="border border-gray-300 text-center p-2">{transaction.description}</td>
              <td className="border border-gray-300 text-center p-2">Frw {transaction.amount}</td>
              <td className="border border-gray-300 text-center p-2 capitalize">{transaction.type}</td>
              <td className="border border-gray-300 text-center p-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* No transactions message */}
      {transactions.length === 0 && (
        <p className="text-gray-500 mt-4">No transactions added yet.</p>
      )}

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
            {/* Add Transaction Button at the bottom-right corner */}
            <button
        onClick={() => setIsModalOpen(true)}
        className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition absolute right-2 mb-40 shadow-lg"
      >
        Add Transaction
      </button>

      {/* Modal for adding transaction */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Transaction</h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="description">
                Description:
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter transaction description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="amount">
                Amount Sent:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter amount sent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="type">
                Type of Money:
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="cash">Cash</option>
                <option value="momo">MoMo</option>
              </select>
            </div>

            {/* Date input field */}
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

            <div className="flex justify-left space-x-3">
              <button
                onClick={handleAddTransaction}
                className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
