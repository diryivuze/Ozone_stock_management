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
  const [showStockOutModal, setShowStockOutModal] = useState(false);
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
        setShowStockOutModal(false); // Close modal after stock out
      } else {
        notify("Please select a valid item.");
      }
    } else {
      notify("Please fill all fields.");
    }
  };

  // Handle Delete Product with confirmation
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
      <h2 className="text-xl font-bold mb-6">Stock Out Dashboard</h2>

      {/* Stock Out Modal */}
      {showStockOutModal && (
        <div className="fixed inset-0 flex mt-3 items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Stock Out Item</h3>
            <form onSubmit={handleStockOut}>
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
                      value={selectedItemData.pricePerUnit}
                      readOnly
                      className="border border-gray-300 p-2 rounded w-full bg-gray-100"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 font-medium">Quantity:</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
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
                </>
              )}
       <div className="justify-end">         
            <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition">
                Confirm
              </button>
              <button type="button" onClick={() => setShowStockOutModal(false)} className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition ml-2">
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Edit Product</h3>
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
                  onChange={(e) => setUpdatedQuantity(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  min="0"
                  required
                />
              </div>

              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 transition">
                Save Changes
              </button>
              <button type="button" onClick={() => setShowEditModal(false)} className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition ml-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Add Product</h3>
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
                <label className="block mb-1 font-medium">Product Type:</label>
                <input
                  type="text"
                  value={newProductType}
                  onChange={(e) => setNewProductType(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Price Per Unit:</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>

              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded shadow hover:bg-green-600 transition">
                Add Product
              </button>
              <button type="button" onClick={() => setShowAddProductModal(false)} className="bg-red-500 text-white px-6 py-2 rounded shadow hover:bg-red-600 transition ml-2">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Stock Items Table */}
      <table className="min-w-full bg-white border border-gray-300 mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left">Product Name</th>
            <th className="p-4 text-left">Quantity</th>
            <th className="p-4 text-left">Date Modified</th>
            <th className="p-4 text-left">Price Per Unit</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedStock.map(item => (
            <tr key={item.id}>
              <td className="p-4 border">{item.productName}</td>
              <td className="p-4 border">{item.quantity}</td>
              <td className="p-4 border">{item.dateModified}</td>
              <td className="p-4 border">{item.pricePerUnit}</td>
              <td className="p-4 border">
                <AiFillEdit className="inline cursor-pointer text-blue-500" onClick={() => handleEditProduct(item)} />
                <AiFillDelete className="inline ml-4 cursor-pointer text-red-500" onClick={() => handleDeleteProduct(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 {/* Pagination Controls */}
 <div className="flex justify-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`mx-1 px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-400"}`}
        >
          Next
        </button>
      </div>
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowStockOutModal(true)} className="bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition">
          Stock Out Item
        </button>
      </div>
    </div>
  );
};

export default StockOut;
