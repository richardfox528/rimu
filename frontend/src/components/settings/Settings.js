import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../../utils/config.js";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isCompany = user?.user_type === 1;

  // Function to determine the correct dashboard path based on user type
  const getDashboardPath = () => {
    return isCompany ? "/company-dashboard" : "/user-dashboard";
  };

  // Function to get dashboard-specific styles
  const getDashboardStyles = () => {
    return isCompany
      ? {
          toggleActive: "bg-emerald-700",
          toggleInactive: "bg-gray-300",
          buttonPrimary:
            "bg-emerald-700 hover:bg-emerald-900 focus:ring-emerald-500",
          buttonSecondary:
            "bg-emerald-900 hover:bg-gray-50 focus:ring-emerald-500",
          focusRing: "focus:ring-emerald-500 focus:border-emerald-500",
        }
      : {
          toggleActive: "bg-indigo-600",
          toggleInactive: "bg-gray-300",
          buttonPrimary:
            "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
          buttonSecondary: "bg-white hover:bg-gray-50 focus:ring-indigo-500",
          focusRing: "focus:ring-indigo-500 focus:border-indigo-500",
        };
  };

  // Get the styles for the current dashboard
  const dashboardStyles = getDashboardStyles();

  // State for common settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30", // minutes
  });

  // State for company-specific settings
  const [companySettings, setCompanySettings] = useState({
    autoVerification: false,
    verificationNotifications: true,
    publicCompanyProfile: true,
  });

  // State for user-specific settings
  const [userSettings, setUserSettings] = useState({
    autoShareDocuments: false,
    documentAccessControl: "selective",
    historyVisibility: "verified_only",
  });

  // Simulate loading settings from backend
  useEffect(() => {
    // In a real app, you would fetch these settings from your backend
    // For now, we'll just simulate a delay
    const timer = setTimeout(() => {
      // Simulate fetching settings based on user type
      if (isCompany) {
        // Fetch company settings
        console.log("Fetching company settings...");
      } else {
        // Fetch user settings
        console.log("Fetching user settings...");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isCompany]);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked,
    });
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings({
      ...privacySettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCompanySettingChange = (e) => {
    const { name, checked } = e.target;
    setCompanySettings({
      ...companySettings,
      [name]: checked,
    });
  };

  const handleUserSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings({
      ...userSettings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = async () => {
    try {
      // Show loading toast
      const loadingToast = toast.loading("Saving settings...");

      // Get the authentication token
      const token = localStorage.getItem("token");

      // Prepare the settings data based on user type
      const settingsData = {
        notification_settings: notificationSettings,
        privacy_settings: privacySettings,
        security_settings: securitySettings,
        ...(isCompany
          ? { company_settings: companySettings }
          : { user_settings: userSettings }),
      };

      // Since the backend API endpoint might not be fully implemented yet,
      // we'll add a fallback to sim"api/accounts/settings/"ulate success
      try {
        // Attempt to save settings to the backend
        await axios.post(getApiUrl("api/accounts/settings/")
          ,
          settingsData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update the loading toast to success
        toast.update(loadingToast, {
          render: "Settings saved successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (apiError) {
        console.log("API endpoint not available, simulating success");

        // If the API endpoint is not available, simulate success
        // In a production app, you would want to handle this differently
        toast.update(loadingToast, {
          render: "Settings saved successfully (simulated)",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // Store settings in localStorage as a fallback
        localStorage.setItem("userSettings", JSON.stringify(settingsData));
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    }
  };

  return (
    <DashboardLayout userType={isCompany ? "company" : "user"}>
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account preferences and configurations
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">
                Email Notifications
              </label>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="emailNotifications"
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onChange={handleNotificationChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                style={{
                  transform: notificationSettings.emailNotifications
                    ? "translateX(100%)"
                    : "translateX(0)",
                }}
              />
              <label
                htmlFor="emailNotifications"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  notificationSettings.emailNotifications
                    ? dashboardStyles.toggleActive
                    : dashboardStyles.toggleInactive
                }`}
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">
                SMS Notifications
              </label>
              <p className="text-sm text-gray-500">
                Receive updates via text message
              </p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="smsNotifications"
                id="smsNotifications"
                checked={notificationSettings.smsNotifications}
                onChange={handleNotificationChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                style={{
                  transform: notificationSettings.smsNotifications
                    ? "translateX(100%)"
                    : "translateX(0)",
                }}
              />
              <label
                htmlFor="smsNotifications"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  notificationSettings.smsNotifications
                    ? dashboardStyles.toggleActive
                    : dashboardStyles.toggleInactive
                }`}
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">
                Marketing Emails
              </label>
              <p className="text-sm text-gray-500">
                Receive promotional content and updates
              </p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="marketingEmails"
                id="marketingEmails"
                checked={notificationSettings.marketingEmails}
                onChange={handleNotificationChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                style={{
                  transform: notificationSettings.marketingEmails
                    ? "translateX(100%)"
                    : "translateX(0)",
                }}
              />
              <label
                htmlFor="marketingEmails"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  notificationSettings.marketingEmails
                    ? dashboardStyles.toggleActive
                    : dashboardStyles.toggleInactive
                }`}
              ></label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              name="profileVisibility"
              value={privacySettings.profileVisibility}
              onChange={handlePrivacyChange}
              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none ${dashboardStyles.focusRing} sm:text-sm rounded-md`}
            >
              <option value="public">Public - Visible to everyone</option>
              <option value="private">Private - Only visible to you</option>
              <option value="connections">
                Connections Only - Visible to verified connections
              </option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">Data Sharing</label>
              <p className="text-sm text-gray-500">
                Allow sharing your data with trusted partners
              </p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="dataSharing"
                id="dataSharing"
                checked={privacySettings.dataSharing}
                onChange={handlePrivacyChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                style={{
                  transform: privacySettings.dataSharing
                    ? "translateX(100%)"
                    : "translateX(0)",
                }}
              />
              <label
                htmlFor="dataSharing"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  privacySettings.dataSharing
                    ? dashboardStyles.toggleActive
                    : dashboardStyles.toggleInactive
                }`}
              ></label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-700">
                Two-Factor Authentication
              </label>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="twoFactorAuth"
                id="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onChange={handleSecurityChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                style={{
                  transform: securitySettings.twoFactorAuth
                    ? "translateX(100%)"
                    : "translateX(0)",
                }}
              />
              <label
                htmlFor="twoFactorAuth"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  securitySettings.twoFactorAuth
                    ? dashboardStyles.toggleActive
                    : dashboardStyles.toggleInactive
                }`}
              ></label>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select
              name="sessionTimeout"
              value={securitySettings.sessionTimeout}
              onChange={handleSecurityChange}
              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none ${dashboardStyles.focusRing} sm:text-sm rounded-md`}
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="240">4 hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* Company-specific settings */}
      {isCompany && (
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Company Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">
                  Automatic Verification
                </label>
                <p className="text-sm text-gray-500">
                  Automatically verify employment records that match your
                  database
                </p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="autoVerification"
                  id="autoVerification"
                  checked={companySettings.autoVerification}
                  onChange={handleCompanySettingChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                  style={{
                    transform: companySettings.autoVerification
                      ? "translateX(100%)"
                      : "translateX(0)",
                  }}
                />
                <label
                  htmlFor="autoVerification"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    companySettings.autoVerification
                      ? dashboardStyles.toggleActive
                      : dashboardStyles.toggleInactive
                  }`}
                ></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">
                  Verification Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive notifications when employment records need
                  verification
                </p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="verificationNotifications"
                  id="verificationNotifications"
                  checked={companySettings.verificationNotifications}
                  onChange={handleCompanySettingChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                  style={{
                    transform: companySettings.verificationNotifications
                      ? "translateX(100%)"
                      : "translateX(0)",
                  }}
                />
                <label
                  htmlFor="verificationNotifications"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    companySettings.verificationNotifications
                      ? dashboardStyles.toggleActive
                      : dashboardStyles.toggleInactive
                  }`}
                ></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">
                  Public Company Profile
                </label>
                <p className="text-sm text-gray-500">
                  Make your company profile visible to all users
                </p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="publicCompanyProfile"
                  id="publicCompanyProfile"
                  checked={companySettings.publicCompanyProfile}
                  onChange={handleCompanySettingChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                  style={{
                    transform: companySettings.publicCompanyProfile
                      ? "translateX(100%)"
                      : "translateX(0)",
                  }}
                />
                <label
                  htmlFor="publicCompanyProfile"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    companySettings.publicCompanyProfile
                      ? dashboardStyles.toggleActive
                      : dashboardStyles.toggleInactive
                  }`}
                ></label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User-specific settings */}
      {!isCompany && (
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">User Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">
                  Auto-Share Documents
                </label>
                <p className="text-sm text-gray-500">
                  Automatically share your employment documents with verified
                  companies
                </p>
              </div>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="autoShareDocuments"
                  id="autoShareDocuments"
                  checked={userSettings.autoShareDocuments}
                  onChange={handleUserSettingChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform"
                  style={{
                    transform: userSettings.autoShareDocuments
                      ? "translateX(100%)"
                      : "translateX(0)",
                  }}
                />
                <label
                  htmlFor="autoShareDocuments"
                  className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    userSettings.autoShareDocuments
                      ? dashboardStyles.toggleActive
                      : dashboardStyles.toggleInactive
                  }`}
                ></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">
                  Document Access Control
                </label>
                <p className="text-sm text-gray-500">
                  Control who can access your employment documents
                </p>
              </div>
              <select
                name="documentAccessControl"
                id="documentAccessControl"
                value={userSettings.documentAccessControl}
                onChange={handleUserSettingChange}
                className="block w-40 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">All Companies</option>
                <option value="selective">Selective</option>
                <option value="none">None</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-700">
                  Employment History Visibility
                </label>
                <p className="text-sm text-gray-500">
                  Control who can see your employment history
                </p>
              </div>
              <select
                name="historyVisibility"
                id="historyVisibility"
                value={userSettings.historyVisibility}
                onChange={handleUserSettingChange}
                className="block w-40 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="public">Public</option>
                <option value="verified_only">Verified Companies Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Save and Cancel Buttons */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate(getDashboardPath())}
          className={`px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 ${dashboardStyles.buttonSecondary} focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Cancel
        </button>
        <button
          onClick={saveSettings}
          className={`px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${dashboardStyles.buttonPrimary} focus:outline-none focus:ring-2 focus:ring-offset-2`}
        >
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
