import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    recentHires: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/employees");
      const employees = Array.isArray(res.data)
        ? res.data
        : res.data.employees || [];

      setStats({
        totalEmployees: employees.length,
        totalDepartments: new Set(employees.map((e) => e.department)).size,
        recentHires: employees.slice(-5).reverse(),
      });
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="card-grid">
        <div className="card">
          <h2>{stats.totalEmployees}</h2>
          <p>Total Employees</p>
        </div>
        <div className="card">
          <h2>{stats.totalDepartments}</h2>
          <p>Departments</p>
        </div>
        <div className="card">
          <h2>{stats.recentHires.length}</h2>
          <p>Recent Hires</p>
        </div>
      </div>

      <h3>Recent Hires</h3>
      {stats.recentHires.length === 0 ? (
        <p>No recent hires</p>
      ) : (
        <ul>
          {stats.recentHires.map((emp) => (
            <li key={emp.id}>
              <Link to={`/employees/${emp.id}`}>
                {emp.firstName} {emp.lastName}
              </Link>{" "}
              — {emp.department}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
