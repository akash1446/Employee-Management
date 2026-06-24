import React from "react";
import "./App.css";
import { Routes, Route, Link, Navigate, NavLink } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">Employee Management System</div>
        <div className="nav-links">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/employees" className="nav-link">
            Employees
          </NavLink>
          <NavLink to="/employees/new" className="nav-link">
            New Employee
          </NavLink>
        </div>
      </nav>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/:id" element={<EmployeeForm />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
