import React, { useState, useEffect } from 'react';
import { publicAxios } from "../tokenGetter/api";

  const TransactionTable = () => {
  const api = publicAxios();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    type: '',
    date: '',
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/transactions');
      setTransactions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching transactions');
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleFilter = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  const handleNewTransactionSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/transactions', newTransaction);
      setShowModal(false);
      fetchTransactions(); // Reload the transactions after adding a new one
    } catch (err) {
      console.error('Error creating transaction:', err);
    }
  };

  const sortedTransactions = React.useMemo(() => {
    let sortableTransactions = [...transactions];
    if (sortConfig.key) {
      sortableTransactions.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTransactions;
  }, [transactions, sortConfig]);

  const filteredTransactions = sortedTransactions.filter(
    (transaction) =>
      (transaction.description?.toLowerCase() || '').includes(filterText.toLowerCase()) ||
      (transaction.type?.toLowerCase() || '').includes(filterText.toLowerCase())
  );
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter transactions..."
          value={filterText}
          onChange={handleFilter}
          className="border p-2 rounded max-w-sm"
        />
        <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Transaction
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Transaction</h3>
            <form onSubmit={handleNewTransactionSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Description</label>
                <input
                  type="text"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <input
                  type="text"
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th
                className="px-4 py-2 cursor-pointer border"
                onClick={() => handleSort('id')}
              >
                ID
              </th>
              <th
                className="px-4 py-2 cursor-pointer border"
                onClick={() => handleSort('description')}
              >
                Description
              </th>
              <th
                className="px-4 py-2 cursor-pointer border"
                onClick={() => handleSort('amount')}
              >
                Amount
              </th>
              <th
                className="px-4 py-2 cursor-pointer border"
                onClick={() => handleSort('type')}
              >
                Type
              </th>
              <th
                className="px-4 py-2 cursor-pointer border"
                onClick={() => handleSort('date')}
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">{transaction.description}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredTransactions.length / itemsPerPage)}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredTransactions.length / itemsPerPage)}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
