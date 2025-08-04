import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = ({ switchToRegister }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.jwt) {
      throw new Error(data.message || "Invalid credentials");
    }

    const token = data.jwt;
    localStorage.setItem("token", token);


    // ✅ Decode token to get role
    const decoded = jwtDecode(token);
    const role =
      decoded.role ||
      decoded.roles ||
      decoded.authorities?.[0] ||
      "UNKNOWN";

      
console.log("Decoded token:", decoded);


    console.log("Decoded Role:", role);

    if (role === "ROLE_ADMIN") {
      navigate("/admin-dashboard");
    } else if (role === "ROLE_MANAGER") {
      navigate("/manager-dashboard");
    } else if (role === "ROLE_CASHIER") {
      navigate("/cashier-dashboard");
    } else {
      alert("Unauthorized role: " + role);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen bg-sky-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative">
            <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3 border">
              <FaUser className="text-indigo-500" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Username"
                className="w-full bg-transparent text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3 border">
              <FaLock className="text-indigo-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full bg-transparent text-gray-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Login
          </button>

          {/* Switch to Register */}
          <p className="text-center text-white mt-4 text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={switchToRegister}
              className="underline font-medium hover:text-yellow-200"
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
