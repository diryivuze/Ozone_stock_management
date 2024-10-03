import React, { useState, useEffect } from "react";
import { publicAxios } from "../tokenGetter/api";

const Balance = () => {
  const api = publicAxios()
  const [balances, setBalances] = useState([]);
  const [balanceType, setBalanceType] = useState("opening");
  const [date, setDate] = useState("");
  const [cashBalance, setCashBalance] = useState("");
  const [momoBalance, setMomoBalance] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [sortType, setSortType] = useState("date");
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const response = await api.get("/balance");
      if (Array.isArray(response.data)) {
        setBalances(response.data);
      } else {
        console.error("Unexpected API response format:", response.data);
        setError("Unexpected data format received from the server");
        setBalances([]);
      }
    } catch (error) {
      console.error("Error fetching balances:", error);
      setError("Failed to fetch balances. Please try again later.");
      setBalances([]);
    }
  };

  const handleAddBalance = async () => {
    const newBalance = {
      balance_type: balanceType,
      date: date,
      cash_balance: parseFloat(cashBalance),
      momo_balance: parseFloat(momoBalance)
    };

    try {
      await api.post("/balance/add", newBalance);
      await fetchBalances(); // Refresh the list after adding
      resetForm();
    } catch (error) {
      console.error("Error adding balance:", error);
      setError("Failed to add balance. Please try again.");
    }
  };

  const resetForm = () => {
    setBalanceType("opening");
    setDate("");
    setCashBalance("");
    setMomoBalance("");
    setIsModalOpen(false);
    setError(null);
  };

  const handleSort = (type) => {
    setSortType(type);
    const sortedBalances = [...balances].sort((a, b) => {
      if (type === "cash") return b.cash_balance - a.cash_balance;
      if (type === "momo") return b.momo_balance - a.momo_balance;
      if (type === "total") return (b.cash_balance + b.momo_balance) - (a.cash_balance + a.momo_balance);
      return new Date(b.date) - new Date(a.date);
    });
    setBalances(sortedBalances);
  };

  const filteredBalances = filterDate
    ? balances.filter((balance) => balance.date === filterDate)
    : balances;

  const totalPages = Math.ceil(filteredBalances.length / itemsPerPage);

  const currentBalances = filteredBalances.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4 relative min-h-screen bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-slate-800 pl-5">All Balance</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between mb-4 pt-4 pl-5 pr-7 rounded-lg">
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
              <option value="cash">Cash Balance</option>
              <option value="momo">MoMo Balance</option>
              <option value="total">Total</option>
            </select>
          </div>
        </div>

        {/* Add Balance Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-yellow-500 text-white p-2 h-10 rounded shadow hover:bg-yellow-600 transition"
        >
          Add Balance
        </button>
      </div>

      {/* Modal for adding balance */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Balance</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="balanceType">
                Balance Type:
              </label>
              <select
                id="balanceType"
                value={balanceType}
                onChange={(e) => setBalanceType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="opening">Opening Balance</option>
                <option value="closing">Closing Balance</option>
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
              <label className="block text-gray-700 mb-2" htmlFor="cashBalance">
                Cash Balance:
              </label>
              <input
                type="number"
                id="cashBalance"
                value={cashBalance}
                onChange={(e) => setCashBalance(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter cash balance"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="momoBalance">
                MoMo Balance:
              </label>
              <input
                type="number"
                id="momoBalance"
                value={momoBalance}
                onChange={(e) => setMomoBalance(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter MoMo balance"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleAddBalance}
                className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition"
              >
                Add
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

      {/* Balance Table */}
      <div className="p-5 w-full overflow-x-auto bg-gray-10 rounded-lg0">

      <table className="min-w-full table-auto border-collapse border border-gray-300 text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Day</th>
            <th className="border border-gray-300 p-2">Balance Type</th>
            <th className="border border-gray-300 p-2">Cash Balance</th>
            <th className="border border-gray-300 p-2">MoMo Balance</th>
            <th className="border border-gray-300 p-2">Total (Cash + MoMo)</th>
          </tr>
        </thead>
        <tbody>
          {currentBalances.length > 0 ? (
            currentBalances.map((balance) => (
              <tr key={balance.id}>
                <td className="border border-gray-300 p-2">{balance.date}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(balance.date).toLocaleString('en-US', { weekday: 'long' })}
                </td>
                <td className="border border-gray-300 p-2 capitalize">{balance.balance_type}</td>
                <td className="border border-gray-300 p-2">{balance.cash_balance.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">{balance.momo_balance.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">
                  <span className={(balance.cash_balance + balance.momo_balance) >= 0 ? "text-green-500" : "text-red-500"}>
                    {(balance.cash_balance + balance.momo_balance).toFixed(2)}
                  </span>
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
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="mx-4">
            {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Balance;