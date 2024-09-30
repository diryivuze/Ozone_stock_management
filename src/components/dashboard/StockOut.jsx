import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StockOut = () => {
  const initialStockItems = [
    { id: 1, productName: "Milk 1L", quantity: 10, dateModified: "2024-09-20", pricePerUnit: 600 },
    { id: 2, productName: "Milk 500ml", quantity: 5, dateModified: "2024-09-18", pricePerUnit: 300 },
    { id: 3, productName: "Yogurt", quantity: 8, dateModified: "2024-09-15", pricePerUnit: 1000 },
    { id: 4, productName: "Cheese", quantity: 4, dateModified: "2024-09-10", pricePerUnit: 3000 },
    { id: 5, productName: "Butter", quantity: 6, dateModified: "2024-09-05", pricePerUnit: 2500 },
    { id: 6, productName: "Cream", quantity: 12, dateModified: "2024-09-01", pricePerUnit: 1500 },
    { id: 7, productName: "Sour Cream", quantity: 3, dateModified: "2024-08-20", pricePerUnit: 800 },
    { id: 8, productName: "Ice Cream", quantity: 5, dateModified: "2024-08-15", pricePerUnit: 1200 },
    { id: 9, productName: "Whipped Cream", quantity: 10, dateModified: "2024-08-10", pricePerUnit: 1500 },
    { id: 10, productName: "Feta Cheese", quantity: 2, dateModified: "2024-08-05", pricePerUnit: 3500 },
  ];

  const [stockItems, setStockItems] = useState(initialStockItems);
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemData, setSelectedItemData] = useState({ pricePerUnit: 0, productName: '' });
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState(1);
  const [newProductName, setNewProductName] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const notify = (message) => toast(message);

  const handleStockOut = (e) => {
    e.preventDefault();
    if (selectedItem && quantity > 0 && date) {
      const stockOutItem = stockItems.find(item => item.id === parseInt(selectedItem));
      if (stockOutItem) {
        const updatedStockItems = stockItems.map(item => {
          if (item.id === stockOutItem.id) {
            return { ...item, quantity: item.quantity - parseInt(quantity) };
          }
          return item;
        }).filter(item => item.quantity > 0);
        setStockItems(updatedStockItems);
        notify(`Stocked out ${quantity} of ${stockOutItem.productName} on ${date}`);
      } else {
        notify("Please select a valid item.");
      }
    } else {
      notify("Please fill all fields.");
    }
  };

  const handleDeleteProduct = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updatedItems = stockItems.filter(item => item.id !== id);
      setStockItems(updatedItems);
      notify("Product deleted successfully!");
    }
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setUpdatedProductName(product.productName);
    setUpdatedQuantity(product.quantity);
    setShowEditModal(true);
  };

  const saveEditedProduct = (e) => {
    e.preventDefault();
    if (updatedProductName && updatedQuantity >= 0) {
      const updatedProducts = stockItems.map(item =>
        item.id === productToEdit.id
          ? { ...item, productName: updatedProductName, quantity: updatedQuantity, dateModified: new Date().toISOString().split("T")[0] }
          : item
      );
      setStockItems(updatedProducts);
      notify("Product updated successfully!");
      setShowEditModal(false);
      setProductToEdit(null);
    } else {
      notify("Please provide valid product details.");
    }
  };

  const handleItemChange = (e) => {
    const selectedId = e.target.value;
    setSelectedItem(selectedId);
    const selectedItemData = stockItems.find(item => item.id === parseInt(selectedId));
    setSelectedItemData(selectedItemData || { pricePerUnit: 0, productName: '' });
    setQuantity(1);
  };

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
    if (newProductName && newProductType && newProductPrice > 0) {
      const newProduct = {
        id: stockItems.length > 0 ? Math.max(...stockItems.map(item => item.id)) + 1 : 1,
        productName: newProductName,
        quantity: 0,
        dateModified: new Date().toISOString().split("T")[0],
        type: newProductType,
        pricePerUnit: parseFloat(newProductPrice),
      };
      setStockItems([...stockItems, newProduct]);
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
    setNewProductPrice(0);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6">Stock Out Dashboard</h2>

      <form onSubmit={handleStockOut} className="bg-white p-6 rounded shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Stock Out Item</h3>
        
        <div className="mb-4">
          <label className="block mb-1 font-medium">Select Item:</label>
          <select
            value={selectedItem}
            onChange={handleItemChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          >
            <option value="">-- Select an item --</option>
            {stockItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.productName}
              </option>
            ))}
          </select>
        </div>

        {selectedItemData && (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Price Per Unit:</label>
              <input
                type="text"
                value={`Frw ${selectedItemData.pricePerUnit}`}
                readOnly
                className="border border-gray-300 p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Quantity:</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="border border-gray-300 p-2 rounded w-full"
                min="1"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition">
              Stock Out
            </button>
          </>
        )}
      </form>

      <h3 className="text-2xl font-semibold mb-4">Current Stock Items</h3>

      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedStock.map(item => (
            <tr key={item.id}>
              <td className="py-2 text-center px-4 border-b">{item.productName}</td>
              <td className="py-2 text-center px-4 border-b">{item.quantity}</td>
              <td className="py-2 text-center px-4 border-b">Frw {item.pricePerUnit}</td>
              <td className="py-2 text-center px-4 border-b flex space-x-2">
                <button onClick={() => handleEditProduct(item)} className="text-blue-500 justfy-cent ">
                  <AiFillEdit />
                </button>
                <button onClick={() => handleDeleteProduct(item.id)} className="text-red-500 justfy-cent ">
                  <AiFillDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
            <form onSubmit={saveEditedProduct}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Product Name:</label>
                <input
                  type="text"
                  value={updatedProductName}
                  onChange={(e) => setUpdatedProductName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Quantity:</label>
                <input
                  type="number"
                  value={updatedQuantity}
                  onChange={(e) => setUpdatedQuantity(Math.max(0, Number(e.target.value)))}
                  className="border border-gray-300 p-2 rounded w-full"
                  min="0"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-xl font-semibold mb-4">Add Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Product Name:</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
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
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Price:</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(Math.max(0, Number(e.target.value)))}
                  className="border border-gray-300 p-2 rounded w-full"
                  min="0"
                  required
                />
              </div>
              <div className="flex justify-center space-x-6">
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Save Product
                </button>
                <button type="button" onClick={() => setShowAddProductModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* <div className="flex justify-end mb-4 mt-7">
        <button
          onClick={() => setShowAddProductModal(true)}
          className="bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
        >
          Add Product
        </button>
      </div> */}
    </div>
  );
};

export default StockOut;
