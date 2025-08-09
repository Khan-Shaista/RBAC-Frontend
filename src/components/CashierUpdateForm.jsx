
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CashierUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: "",
    productname: "",
    paymentmethod: "",
    price: "",
    customername: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/Cashier/product/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8080/Cashier/product/${id}`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product updated successfully!");
      navigate("/cashier-dashboard");
    } catch (error) {
      console.error("Failed to update product", error);
      alert("Update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full bg-white p-8 shadow-lg rounded-2xl border border-purple-200">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">
          Update Product
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="productname"
            value={product.productname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="paymentmethod"
            value={product.paymentmethod}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="customername"
            value={product.customername}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-md font-semibold hover:bg-purple-800"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
