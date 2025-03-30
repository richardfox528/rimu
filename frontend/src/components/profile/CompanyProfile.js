import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../layout/DashboardLayout";
import { getApiUrl } from "../../utils/config.js";
import { getCookie } from "../../utils/cookieUtils.js";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token") || getCookie("token");
      
      if (!token) {
        toast.error("No authentication token found");
        setLoading(false);
        return;
      }

      console.log("Token found:", token ? "Yes" : "No");
      
      const response = await axios.get(
        getApiUrl("api/accounts/user/info/"),
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Verify if the user is a company
      if (response.data.user_type !== 1) {
        toast.error("Unauthorized: This profile is only for company accounts");
        navigate("/user-dashboard");
        return;
      }

      setProfile(response.data);
    } catch (error) {
      console.error("Profile fetch error:", error.response?.status, error.response?.data);
      toast.error(error.response?.data?.detail || "Error loading company profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userType="company">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!profile) {
    return (
      <DashboardLayout userType="company">
        <div className="text-center py-8">
          <p className="text-gray-600">Could not load company profile information.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="company">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <Link
            to="/company/profile/edit"
            className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
          >
            Edit Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Company Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Company Name
                </label>
                <p className="mt-1 text-gray-900">
                  {profile.company_name}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Username
                </label>
                <p className="mt-1 text-gray-900">{profile.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <p className="mt-1 text-gray-900">{profile.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Tax ID / Business ID
                </label>
                <p className="mt-1 text-gray-900">{profile.tax_id || "Not provided"}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Contact Person
                </label>
                <p className="mt-1 text-gray-900">
                  {profile.contact_person || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Phone Number
                </label>
                <p className="mt-1 text-gray-900">
                  {profile.phone_number || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Address
                </label>
                <p className="mt-1 text-gray-900">
                  {profile.address || "Not provided"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Registration Date
                </label>
                <p className="mt-1 text-gray-900">
                  {new Date(profile.date_joined).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfile; 