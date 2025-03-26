import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout userType="user">
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome, {user?.first_name || user?.username || "User"}
        </h1>
        <p className="mt-2 text-gray-600">
          Manage your work history and documents from here
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Work History */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <svg
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                Work History
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Manage your work experience and keep your professional history
              updated.
            </p>
            <div className="space-y-3">
              <Link
                to="/employment-history"
                className="block w-full text-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors"
              >
                View History
              </Link>
              <Link
                to="/employment-history/new"
                className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add Experience
              </Link>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <svg
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                My Documents
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Store and manage your important documents securely.
            </p>
            <div className="space-y-3">
              <Link
                to="/my-documents"
                className="block w-full text-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors"
              >
                View Documents
              </Link>
              <Link
                to="/my-documents/new"
                className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Upload Document
              </Link>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white overflow-hidden shadow-sm rounded-lg transition-all duration-300 hover:shadow-md">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <svg
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h2 className="ml-3 text-xl font-semibold text-gray-900">
                My Profile
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Keep your personal and professional information updated.
            </p>
            <div className="space-y-3">
              <Link
                to="/profile"
                className="block w-full text-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-100 transition-colors"
              >
                View Profile
              </Link>
              <Link
                to="/profile/edit"
                className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
