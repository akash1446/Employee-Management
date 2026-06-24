import React, { createContext, useState, useContext, useCallback } from "react";
import api from "../services/api";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/employees");
      setEmployees(
        Array.isArray(res.data) ? res.data : res.data.employees || [],
      );
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, []);

  const getEmployee = useCallback(async (id) => {
    try {
      const res = await api.get(`/employees/${id}`);
      return res.data;
    } catch (err) {
      setError("Failed to load employee");
      return null;
    }
  }, []);

  const addEmployee = async (data) => {
    const res = await api.post("/employees", data);
    setEmployees((prev) => [...prev, res.data]);
    return res.data;
  };

  const updateEmployee = async (id, data) => {
    const res = await api.put(`/employees/${id}`, data);
    setEmployees((prev) => prev.map((emp) => (emp.id === id ? res.data : emp)));
    return res.data;
  };

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        fetchEmployees,
        getEmployee,
        addEmployee,
        updateEmployee,
        deleteEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees() {
  return useContext(EmployeeContext);
}
