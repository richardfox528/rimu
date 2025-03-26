import React, { useState, useEffect } from "react";
import UserNavigation from "../common/UserNavigation";
import CompanyNavigation from "../common/CompanyNavigation";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children, userType = "user" }) => {
  const { user, loading } = useAuth();
  // Initialize with localStorage data to prevent flashing during loading
  const [actualUserType, setActualUserType] = useState(() => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (localUser) {
        return localUser.user_type === 1 ? "company" : "user";
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
    }
    return userType;
  });
  
  // Only update user type when user context changes, not during loading
  useEffect(() => {
    if (user) {
      const newUserType = user.user_type === 1 ? "company" : "user";
      if (newUserType !== actualUserType) {
        setActualUserType(newUserType);
      }
    }
  }, [user, actualUserType]);
  
  const isCompany = actualUserType === "company";
  
  // Determine which navigation component to use
  const Navigation = isCompany ? CompanyNavigation : UserNavigation;
  
  // Set theme colors based on user type
  const spinnerColor = isCompany ? "border-emerald-500" : "border-indigo-500";
  const bgColor = isCompany ? "bg-gray-50" : "bg-gray-100";

  if (loading) {
    // During loading, use the actualUserType which is already set from localStorage
    // This prevents navigation component flashing during page refresh
    return (
      <div className={`min-h-screen ${bgColor}`}>
        <Navigation />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${spinnerColor}`}></div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Check if there's a token and user in localStorage as a fallback
    const token = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("user"));
    
    // If we have both token and user in localStorage, but the context hasn't loaded yet
    if (token && localUser) {
      return (
        <div className={`min-h-screen ${bgColor}`}>
          <Navigation />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </div>
      );
    }
    
    // If no user in context or localStorage, show login message
    return (
      <div className={`min-h-screen ${bgColor}`}>
        <Navigation />
        <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
          <p className="text-lg text-gray-600">Please log in to access the dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;