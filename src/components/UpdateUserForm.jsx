
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function UpdateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isManagerContext = location.pathname.includes("manager");
  const isCashierContext = location.pathname.includes("cashier");

  const [user, setUser] = useState({
    id: "",
    username: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const endpoint = isManagerContext
          ? `http://localhost:8080/admin/manager/${id}`
          : `http://localhost:8080/Manager/cashier/${id}`;

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };
    fetchUser();
  }, [id, isManagerContext, isCashierContext]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");

    
    const userToSend = { ...user };

    
    if (!user.password || user.password.trim() === "") {
      delete userToSend.password;
    }

    const endpoint = isManagerContext
      ? `http://localhost:8080/admin/manager/${id}`
      : `http://localhost:8080/Manager/cashier/${id}`;

    await axios.put(endpoint, userToSend, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("User updated successfully!");
    navigate(isManagerContext ? "/manager-dashboard" : "/admin-dashboard");
  } catch (error) {
    console.error("Failed to update user", error);
    alert("Update failed.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-10 shadow-2xl rounded-3xl border border-purple-200">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-purple-800">
            Update {user.role === "ROLE_MANAGER" ? "Manager" : "Cashier"} Info
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            You can edit and save the user details here.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* ID (Read-only) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">User ID</label>
            <input
              type="text"
              name="id"
              value={user.id}
              disabled
              className="mt-1 w-full px-4 py-2 bg-gray-100 border rounded-md cursor-not-allowed text-gray-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
              placeholder="Enter new password"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-purple-500"
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
              className="w-full bg-purple-700 text-white py-2 rounded-md text-lg font-semibold hover:bg-purple-800 shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
