import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../layout/DashboardLayout";
import { getApiUrl } from "../../utils/config.js";

const EmploymentHistory = () => {
  const [employments, setEmployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmploymentHistory();
  }, []);

  const fetchEmploymentHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        getApiUrl("api/employment-history/"),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEmployments(response.data);
    } catch (error) {
      toast.error("Error al cargar el historial laboral");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userType="user">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="user">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Employment History
          </h1>
          <Link
            to="/employment-history/new"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add Experience
          </Link>
        </div>

        {employments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No work experiences registered.</p>
            <Link
              to="/employment-history/new"
              className="text-indigo-600 hover:text-indigo-800 mt-2 inline-block"
            >
              Add your first experience
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {employments.map((employment) => (
              <div
                key={employment.id}
                className="bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {employment.position}
                </h3>
                <p className="text-gray-600 mb-2">{employment.company}</p>
                <p className="text-sm text-gray-500">
                  {new Date(employment.start_date).toLocaleDateString()} -{" "}
                  {employment.end_date
                    ? new Date(employment.end_date).toLocaleDateString()
                    : "Present"}
                </p>
                <p className="text-gray-700 mt-4">{employment.description}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Link
                    to={`/employment-history/${employment.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default EmploymentHistory;
