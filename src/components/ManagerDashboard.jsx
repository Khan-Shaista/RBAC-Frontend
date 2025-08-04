import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ManagerDashboard() {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cashiers from backend
  useEffect(() => {
    const fetchCashiers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/Manager/cashier", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCashiers(response.data);
      } catch (error) {
        console.error("Error fetching cashiers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCashiers();
  }, []);

  // DELETE API call with JWT
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this cashier?")) return;

    try {
      await axios.delete(`http://localhost:8080/Manager/cashier/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove from UI
      setCashiers((prevCashiers) => prevCashiers.filter((user) => user.id !== id));
      alert("Cashier deleted successfully.");
    } catch (error) {
      console.error("Error deleting cashier:", error);
      alert("Failed to delete cashier.");
    }
  };

  // Table rendering
  const renderTable = (data) => (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl border text-base">
      <table className="w-full text-left text-gray-700 text-lg">
        <thead className="text-md text-white uppercase bg-purple-700">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Username</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b hover:bg-purple-50 transition"
            >
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4 font-medium">{user.username}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    user.role === "MANAGER"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 space-x-2 flex">
                {/* Update Button */}
                <Link
                  to={`/update/${user.id}`}
                  className="inline-flex items-center px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full hover:bg-blue-200 transition"
                >
                   Update
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(user.id)}
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
        Manager Dashboard
      </h1>

      {loading ? (
        <div className="text-center text-purple-700 text-lg font-medium">
          Loading cashiers...
        </div>
      ) : (
        renderTable(cashiers)
      )}
    </div>
  );
}
