import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState("");

  // Show message if user comes from successful email verification
  useEffect(() => {
    // Check if user comes directly from verification or if we have a marker in localStorage
    const comesFromVerification =
      location.state?.verified ||
      localStorage.getItem("emailVerified") === "true";

    if (comesFromVerification) {
      toast.success(
        location.state?.message || "Email verified! Please log in to continue."
      );

      // Get saved email if it exists
      const verifiedEmail = localStorage.getItem("verifiedEmail");
      if (verifiedEmail) {
        setPrefilledEmail(verifiedEmail);
      }

      // Clear markers once used
      localStorage.removeItem("emailVerified");
      localStorage.removeItem("verifiedEmail");
      localStorage.removeItem("verifiedUserId");
    }
  }, [location]);

  // We simplify the handleLogin function to avoid duplication with Login.js
  // Now we just pass the data to the LoginForm component and let the AuthContext
  // handle redirection and toast messages
  const handleLogin = async (userData) => {
    try {
      setIsLoading(true);
      // We don't do anything here, redirection is already being handled by the AuthContext
      // and the Login.js component
      setIsLoading(false);
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo192.png" alt="VoxLyne Logo" className="w-20 h-20 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900">VoxLyne</h1>
        <p className="mt-2 text-center text-gray-600">
          Your employment history management system
        </p>
      </div>

      {location.state && location.state.verified && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 w-full max-w-md">
          <p>Email successfully verified! Please log in to continue.</p>
        </div>
      )}

      <LoginForm onLogin={handleLogin} prefilledEmail={prefilledEmail} />
    </div>
  );
};

export default Login;
