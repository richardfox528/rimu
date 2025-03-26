import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../utils/config.js";

const ForgotPasswordTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
    .button { display: inline-block; background-color: #4F46E5; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-top: 20px; }
    .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Request</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>We have received a request to reset your password. Click the button below to create a new password:</p>
    <p style="text-align: center;">
      <a href="{{reset_link}}" class="button" style="color: white;">Reset Password</a>
    </p>
    <p>If you did not request this password reset, you can ignore this email.</p>
    <p>This link will expire in 15 minutes.</p>
    <p>Best regards,<br>The VoxLyne team.</p>
  </div>
  <div class="footer">
    <p>This is an automatic email, please do not reply to this message.</p>
  </div>
</body>
</html>
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Forgot password form submitted with email:", email);
    console.log("Frontend URL:", window.location.origin);

    try {
      const response = await axios.post(
        getApiUrl("api/accounts/auth/reset-password/"),
        {
          email,
          frontend_url: window.location.origin,
          email_template: ForgotPasswordTemplate,
        }
      );

      console.log("Reset password response:", response.data);
      toast.success("Instructions have been sent to your email");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error(
        "Reset password error:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error || "Error sending the recovery email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recover Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we will send you the instructions.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              E-mail address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Sending..." : "Send Instructions"}
            </button>
          </div>

          <div className="text-center">
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
