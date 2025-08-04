import React, { useState } from "react";
import { FaUser, FaLock, FaUserTag } from "react-icons/fa";

const RegistrationForm = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Add your logic here
  };

  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      icon: <FaUser className="text-indigo-500" />,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      icon: <FaLock className="text-indigo-500" />,
    },
    {
      name: "role",
      label: "Role",
      type: "text",
      icon: <FaUserTag className="text-indigo-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-sky-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-8 drop-shadow">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map(({ name, label, type, icon }) => (
            <div key={name} className="relative">
              <div className="flex items-center gap-3 bg-white/80 rounded-xl p-3 border border-white focus-within:ring-2 focus-within:ring-indigo-400 transition">
                <span>{icon}</span>
                <div className="flex-1 relative">
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="w-full bg-transparent text-gray-900 placeholder-transparent focus:outline-none peer"
                  />
                  <label
                    htmlFor={name}
                    className="absolute left-0 -top-2 text-sm text-gray-600 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:-top-2 peer-focus:text-sm peer-focus:text-indigo-600"
                  >
                    {label}
                  </label>
                </div>
              </div>
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-xl shadow-lg hover:from-purple-600 hover:to-yellow-500 transform transition hover:scale-105"
          >
            Create Account
          </button>

          <p className="text-center text-white mt-4 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={switchToLogin}
              className="underline font-medium hover:text-yellow-200"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
