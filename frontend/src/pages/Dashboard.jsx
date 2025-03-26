import React from "react";
import { useAuth } from "../context/AuthContext";
import CompanyDashboard from "../components/dashboard/CompanyDashboard";
import UserDashboard from "../components/dashboard/UserDashboard";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.user_type === 1 ? <CompanyDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
