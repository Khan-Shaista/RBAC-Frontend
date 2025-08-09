import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserCreateForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const endpoint =
        user.role === "ROLE_MANAGER"
          ? "http://localhost:8080/admin/manager"
          : "http://localhost:8080/Manager/cashier";

      await axios.post(endpoint, user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-200 p-8">
        <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
          Create New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              placeholder="Enter username"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="ROLE_MANAGER">ROLE_MANAGER</option>
              <option value="ROLE_CASHIER">ROLE_CASHIER</option>
            </select>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-2 rounded-lg text-lg font-semibold hover:bg-purple-800 shadow-md transition"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
