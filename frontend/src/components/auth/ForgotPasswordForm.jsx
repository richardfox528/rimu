import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      await resetPassword(email);
      setSuccess(
        "An email with password reset instructions has been sent to your email address."
      );
      onSubmit && onSubmit();
    } catch (err) {
      setError(err.message || "Error sending password reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-medium max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Reset Password
      </h2>

      {error && (
        <div className="mb-4 p-4 bg-danger-light text-danger rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-success-light text-success rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
            autoComplete="email"
            placeholder="Enter your email address"
          />
          <p className="mt-2 text-sm text-gray-500">
            We'll send you an email with instructions to reset your password. The link will expire in 15 minutes.
          </p>
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
              Sending...
            </span>
          ) : (
            "Send Instructions"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
