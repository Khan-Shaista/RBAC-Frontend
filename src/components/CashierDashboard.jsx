import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Required for Update button routing

export default function CashierDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/Cashier/product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Delete product by ID
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/Cashier/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Product deleted!");
        // Refresh list
        setProducts(products.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete product.");
      }
    }
  };

  // Table render function
  const renderTable = (data) => (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl border text-base">
      <table className="w-full text-left text-gray-700 text-lg">
        <thead className="text-md text-white uppercase bg-purple-700">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Product Name</th>
            <th className="px-6 py-4">Payment Method</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Customer Name</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b hover:bg-purple-50 transition"
            >
              <td className="px-6 py-4">{product.id}</td>
              <td className="px-6 py-4 font-medium">{product.productname}</td>
              <td className="px-6 py-4">{product.paymentmethod}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.customername}</td>
              <td className="px-6 py-4 space-x-2 flex">
                {/* Update Button */}
                <Link
                  to={`/cashier/update/${product.id}`}
                  className="inline-flex items-center px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full hover:bg-blue-200 transition"
                >
                   Update
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="inline-flex items-center px-4 py-1.5 bg-red-100 text-red-800 text-sm font-semibold rounded-full hover:bg-red-200 transition"
                >
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-800">
        Cashier Dashboard
      </h1>

      {loading ? (
        <div className="text-center text-purple-700 text-lg font-medium">
          Loading product details...
        </div>
      ) : (
        renderTable(products)
      )}
    </div>
  );
}
