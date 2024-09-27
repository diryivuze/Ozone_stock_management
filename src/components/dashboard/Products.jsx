import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Juice", type: "Beverage", quantity: 10, price: 2500 },
    { id: 2, name: "Donuts", type: "Snack", quantity: 5, price: 1500 },
    { id: 3, name: "Small Cakes", type: "Snack", quantity: 25, price: 3000 },
    { id: 4, name: "Fresh Milk", type: "Dairy", quantity: 15, price: 1000 },
    // ... other products
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal state for adding and editing products
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductType, setNewProductType] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(""); // New state for price
  const [editingProductId, setEditingProductId] = useState(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

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

  // Handle Add Product Form submission
  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: products.length + 1,
      name: newProductName,
      type: newProductType,
      quantity: 0, // Default quantity 0
      price: parseFloat(newProductPrice), // Convert to float
    };
    setProducts([...products, newProduct]);
    setShowAddProductModal(false);
    resetForm();
    toast.success("Product added successfully!");
  };

  // Handle Edit Product Form submission
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(product =>
      product.id === editingProductId
        ? { ...product, name: newProductName, type: newProductType, price: parseFloat(newProductPrice) } // Update price
        : product
    ));
    setShowAddProductModal(false);
    resetForm();
    toast.success("Product updated successfully!");
  };

  // Handle Delete Product with confirmation
  const handleDeleteProduct = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this product?</p>
        <button
          onClick={() => confirmDeleteProduct(id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Yes
        </button>
        <button
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 ml-2"
          onClick={() => toast.dismiss()}
        >
          No
        </button>
      </div>,
      { autoClose: false }
    );
  };

  const confirmDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    toast.dismiss();
    toast.success("Product deleted successfully!");
  };

  // Open edit modal with product data
  const handleEditProduct = (product) => {
    setEditingProductId(product.id);
    setNewProductName(product.name);
    setNewProductType(product.type);
    setNewProductPrice(product.price); // Set price for editing
    setIsEditMode(true);
    setShowAddProductModal(true);
  };

  const resetForm = () => {
    setNewProductName("");
    setNewProductType("");
    setNewProductPrice(""); // Reset price
    setIsEditMode(false);
    setEditingProductId(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

      {/* Product Table */}
      <table className="w-full text-center table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">ID</th>
            <th className="py-3 px-6">Product</th>
            <th className="py-3 px-6">Type</th>
            <th className="py-3 px-6">Quantity</th>
            <th className="py-3 px-6">Price per Unit</th> {/* New Header */}
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentItems.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 text-center px-6">{product.id}</td>
              <td className="py-3 text-center px-6">{product.name}</td>
              <td className="py-3 text-center px-6">{product.type}</td>
              <td className="py-3 text-center px-6">{product.quantity}</td>
              <td className="py-3 text-center px-6">Frw {product.price.toFixed(2)}</td> {/* New Price Column */}
              <td className="py-3 justify-center px-6 flex space-x-3">
                {/* Update and Delete icons */}
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => handleEditProduct(product)}
                />
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteProduct(product.id)}
                />
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

      {/* Add Product Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            resetForm(); // Reset form for adding a new product
            setShowAddProductModal(true);
          }}
          className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
        >
          Add Product
        </button>
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded shadow-md w-11/12 md:w-1/3">
            <h3 className="text-2xl font-semibold mb-6">{isEditMode ? "Edit Product" : "Add New Product"}</h3>
            <form onSubmit={isEditMode ? handleUpdateProduct : handleAddProduct}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Product Name:</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter product name"
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
                  placeholder="Enter product type"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Price per Unit:</label>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Enter price per unit"
                  required
                  min="0" // Prevent negative prices
                  step="0.01" // Allow decimal values
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  {isEditMode ? "Update Product" : "Save Product"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
