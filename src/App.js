import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import CashierDashboard from "./components/CashierDashboard";
import RegistrationForm from "./components/RegistrationForm";
import UpdateUserForm from "./components/UpdateUserForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      <Route path="/cashier-dashboard" element={<CashierDashboard />} />
      <Route path="/update/:id" element={<UpdateUserForm />} />
    </Routes>
  );
}

export default App;
