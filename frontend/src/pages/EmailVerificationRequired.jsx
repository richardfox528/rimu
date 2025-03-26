import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../utils/config";

const EmailVerificationRequired = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from location state if available
    if (location.state?.email) {
      setEmail(location.state.email);
    }

    if (location.state?.user_id) {
      setUserId(location.state.user_id);
    }

    // Fallback to localStorage if no state
    if (!location.state?.email) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      if (userInfo.email) {
        setEmail(userInfo.email);
      }
      if (userInfo.id) {
        setUserId(userInfo.id);
      }
    }
  }, [location]);

  const handleResendVerification = async () => {
    if (!email) {
      setError("Email information not found. Please log in again.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        getApiUrl("api/accounts/resend-verification-email/"),
        {
          email: email,
          frontend_url: window.location.origin,
        }
      );

      if (response.data.success) {
        setMessage(
          "Un nuevo correo de verificación ha sido enviado. Por favor revisa tu bandeja de entrada."
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Error al reenviar el correo de verificación"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoToVerification = () => {
    navigate("/auth/email-verification", {
      state: {
        email: email,
        user_id: userId,
      },
    });
  };

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <svg
            className="mx-auto h-12 w-12 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-3">
          Verificación de Correo Requerida
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Para continuar, necesitas verificar tu dirección de correo
          electrónico. Hemos enviado un email con instrucciones a{" "}
          <strong>{email}</strong>
        </p>

        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <p>{message}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleResendVerification}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Reenviar correo de verificación"}
          </button>

          <button
            onClick={handleGoToVerification}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Ya tengo el código
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationRequired;
