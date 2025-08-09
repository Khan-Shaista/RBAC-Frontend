import React, { useEffect , useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("managers");
  const [managers, setManagers] = useState([]);
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

const handleCreateUser = () => {
  navigate("/create-user"); 
};

  const fetchData = async () => {
    setLoading(true);
    const url =
      activeTab === "managers"
        ? "http://localhost:8080/admin/manager"
        : "http://localhost:8080/Manager/cashier";

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (activeTab === "managers") {
        setManagers(response.data);
      } else {
        setCashiers(response.data);
      }
    } catch (error) {
      console.error( "Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const endpoint =
      activeTab === "managers"
        ? `http://localhost:8080/admin/manager/${id}`
        : `http://localhost:8080/Manager/cashier/${id}`;

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("User deleted successfully");
        fetchData(); 
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

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
  
  <Link
    to={`/update/${user.id}`}
    className="inline-flex items-center px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full hover:bg-blue-200 transition"
  >
     Update
  </Link>


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
        Admin Dashboard
      </h1>

      <div className="flex justify-end mb-6">
  <button
    onClick={handleCreateUser}
    className="px-6 py-3 rounded-full text-lg font-semibold transition bg-purple-700 text-white shadow-md hover:bg-purple-800"
  >
    Create
  </button>
</div>


      <div className="flex justify-center mb-8 gap-6">
        <button
          onClick={() => setActiveTab("managers")}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition ${
            activeTab === "managers"
              ? "bg-purple-700 text-white shadow-md"
              : "bg-white text-purple-700 border border-purple-300 hover:bg-purple-50"
          }`}
        >
          Managers
        </button>
        <button
          onClick={() => setActiveTab("cashiers")}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition ${
            activeTab === "cashiers"
              ? "bg-purple-700 text-white shadow-md"
              : "bg-white text-purple-700 border border-purple-300 hover:bg-purple-50"
          }`}
        >
          Cashiers
        </button>
      </div>

      {loading ? (
        <div className="text-center text-purple-700 text-lg font-medium">
          Loading data...
        </div>
      ) : (
        renderTable(activeTab === "managers" ? managers : cashiers)
      )}
    </div>
  );
}
