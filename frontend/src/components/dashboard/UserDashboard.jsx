import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, {user?.username}</p>
        </div>
        <button
          onClick={handleLogoutClick}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <span className="mr-2">🚪</span>
          Logout
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Logout</h3>
            <p className="mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Employment History */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Employment History
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/employment-history"
                className="text-primary hover:text-primary-dark flex items-center"
              >
                <span className="mr-2">📋</span>
                View History
              </a>
            </li>
            <li>
              <a
                href="/employment-history/new"
                className="text-primary hover:text-primary-dark flex items-center"
              >
                <span className="mr-2">➕</span>
                Add Experience
              </a>
            </li>
          </ul>
        </div>

        {/* My Documents */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Documents
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/my-documents"
                className="text-primary hover:text-primary-dark flex items-center"
              >
                <span className="mr-2">📄</span>
                View Documents
              </a>
            </li>
            <li>
              <a
                href="/my-documents/upload"
                className="text-primary hover:text-primary-dark flex items-center"
              >
                <span className="mr-2">⬆️</span>
                Upload Document
              </a>
            </li>
          </ul>
        </div>

        {/* My Profile */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Profile
          </h2>
          <ul className="space-y-3">
            <li>
              <a
                href="/profile"
                className="text-primary hover:text-primary-dark flex items-center"
              >
                <span className="mr-2">👤</span>
                View Profile
              </a>
            </li>
            <li>
              <a
                href="/profile/edit"
                className="text-primary hover:text-primary-dark flex items-center"
              >
                <span className="mr-2">✏️</span>
                Edit Profile
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
