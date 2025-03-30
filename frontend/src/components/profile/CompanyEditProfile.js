import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../layout/DashboardLayout";
import { getApiUrl } from "../../utils/config.js";
import { getCookie } from "../../utils/cookieUtils.js";

const CompanyEditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    username: "",
    tax_id: "",
    contact_person: "",
    phone_number: "",
    address: "",
  });

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

      setFormData({
        company_name: response.data.company_name || "",
        email: response.data.email || "",
        username: response.data.username || "",
        tax_id: response.data.tax_id || "",
        contact_person: response.data.contact_person || "",
        phone_number: response.data.phone_number || "",
        address: response.data.address || "",
      });
    } catch (error) {
      console.error("Profile fetch error:", error.response?.status, error.response?.data);
      toast.error(error.response?.data?.detail || "Error loading company profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token") || getCookie("token");
      
      if (!token) {
        toast.error("No authentication token found");
        setSaving(false);
        return;
      }

      await axios.put(
        getApiUrl("api/accounts/user/info/"),
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success("Company profile updated successfully");
      navigate("/company/profile");
    } catch (error) {
      console.error("Profile update error:", error.response?.status, error.response?.data);
      
      // Handle specific error cases
      if (error.response?.data) {
        const errorData = error.response.data;
        
        if (errorData.username) {
          toast.error(`Username error: ${errorData.username[0]}`);
        } else if (errorData.email) {
          toast.error(`Email error: ${errorData.email[0]}`);
        } else if (errorData.company_name) {
          toast.error(`Company name error: ${errorData.company_name[0]}`);
        } else if (errorData.tax_id) {
          toast.error(`Tax ID error: ${errorData.tax_id[0]}`);
        } else if (errorData.detail) {
          toast.error(errorData.detail);
        } else if (typeof errorData === 'string') {
          toast.error(errorData);
        } else {
          toast.error("Error updating company profile. Please try again.");
        }
      } else {
        toast.error("Error updating company profile. Please try again.");
      }
    } finally {
      setSaving(false);
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

  return (
    <DashboardLayout userType="company">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Company Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                id="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="tax_id"
                className="block text-sm font-medium text-gray-700"
              >
                Tax ID / Business ID
              </label>
              <input
                type="text"
                name="tax_id"
                id="tax_id"
                value={formData.tax_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="contact_person"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Person
              </label>
              <input
                type="text"
                name="contact_person"
                id="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                name="address"
                id="address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/company/profile")}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CompanyEditProfile; 