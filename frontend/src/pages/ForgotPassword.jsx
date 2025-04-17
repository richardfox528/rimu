import React from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";
import appConfig from "../config/appConfig";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // Redirect the user to the login page after sending the email
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <img src="/logo192.png" alt={`${appConfig.APP_NAME} Logo`} className="w-20 h-20 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900">{appConfig.APP_NAME}</h1>
        <p className="mt-2 text-center text-gray-600">
          Recover access to your account
        </p>
      </div>

      <ForgotPasswordForm onSubmit={handleSubmit} />

      <div className="mt-4 space-y-2 text-center">
        <p className="text-gray-600">
          Did you remember your password?{" "}
          <a href="/login" className="text-primary hover:text-primary-dark">
            Log in here
          </a>
        </p>
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-primary hover:text-primary-dark">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
