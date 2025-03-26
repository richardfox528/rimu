import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = ({ onLogin, prefilledEmail = "" }) => {
  const [formData, setFormData] = useState({
    username: prefilledEmail || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginSuccessData, setLoginSuccessData] = useState(null);

  // Update the form if the prefilledEmail prop changes
  useEffect(() => {
    if (prefilledEmail) {
      setFormData((prevData) => ({
        ...prevData,
        username: prefilledEmail,
      }));
    }
  }, [prefilledEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login(formData.username, formData.password);
      // Make sure we have data before setting success
      if (data) {
        // If email verification is required, redirect to the verification page
        if (data.verification_required) {
          // Redirect to the required verification page
          window.location.href = "/auth/email-verification-required";
          return;
        }

        // Prevent additional interactions during redirection
        const formElement = document.querySelector("form");
        if (formElement) {
          formElement.style.pointerEvents = "none";
          formElement.style.opacity = "0.7";
        }

        // Call onLogin directly here
        if (onLogin) {
          onLogin(data);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.detail || err.message || "Error logging in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Login
      </h2>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-control"
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
            autoComplete="current-password"
          />
          <div className="mt-1 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:text-primary-dark"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:text-primary-dark">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
