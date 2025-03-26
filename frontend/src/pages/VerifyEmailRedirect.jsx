import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { getApiUrl } from "../utils/config";
import { setCookie, getCookie } from "../utils/cookieUtils";
import Cookies from "js-cookie";

/**
 * Component that handles email verification through the token received in the URL
 * and sends the request to the backend for processing.
 */
const VerifyEmailRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Extract token and user_id from the current URL
    const params = new URLSearchParams(location.search);
    const rawToken = params.get("token");
    const userId = params.get("user_id");
    const userEmail = params.get("email"); // Extract email from URL if present

    // Clean the token to avoid spaces and other unwanted characters
    const token = rawToken ? rawToken.trim().replace(/\s+/g, "") : null;

    console.log("Token extracted from URL:", rawToken);
    console.log("Cleaned token:", token);
    console.log("User ID:", userId);
    console.log("User Email:", userEmail);

    if (!token) {
      // If there's no token, redirect to the manual verification page
      setStatus("error");
      setMessage("You have not verified your email");
      setTimeout(() => {
        navigate("/auth/email-verification");
      }, 5000);
      return;
    }

    // Verify the token by sending it to the backend
    const verifyToken = async () => {
      try {
        console.log("Starting verification with token:", token);
        console.log("User ID:", userId);
        console.log("API URL:", getApiUrl("api/accounts/verify-email/"));

        // Prepare data for verification, including user_id if available
        const verificationData = { verification_code: token };
        if (userId) {
          verificationData.user_id = userId;
        }
        // If we have email from URL, include it in verification data
        if (userEmail) {
          verificationData.email = userEmail;
          setUserEmail(userEmail);
        }

        console.log("Clean verification data:", verificationData);

        // Send the token to the backend verification endpoint
        const response = await axios.post(
          getApiUrl("api/accounts/verify-email/"),
          verificationData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 10000, // 10 seconds timeout
          }
        );

        console.log("Verification response:", response.data);

        if (response.data.success) {
          setStatus("success");
          setMessage("¡Email successfully verified!");

          // Guardar información del usuario
          let userInfo = null;
          let userType = null;

          // Si el backend devuelve información del usuario directamente
          if (response.data.user) {
            userType = response.data.user.user_type;
            localStorage.setItem("userType", userType);

            // Crear objeto userInfo si no existe
            userInfo = {
              id: response.data.user.id,
              email: response.data.user.email,
              user_type: userType,
            };

            // Guardar en localStorage
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          }

          // Save token if included in the response
          if (response.data.token) {
            // Use cookies with consistent configuration
            const cookieOptions = {
              expires: 1,
              path: "/",
              sameSite: "Lax",
              secure: window.location.protocol === "https:",
            };

            // Set cookies using both methods to ensure compatibility
            setCookie("token", response.data.token, 1);
            Cookies.set("token", response.data.token, cookieOptions);

            // Remove any token from localStorage to avoid confusion
            localStorage.removeItem("token");

            console.log("Token saved in cookies:", response.data.token);
          }

          // If the token wasn't in the response, check the cookies
          const existingToken = getCookie("token");
          console.log("Existing token in cookies:", existingToken);

          if (!existingToken && !response.data.token) {
            console.log("No token found - redirecting to login");

            // Save verification state in localStorage for login to detect
            localStorage.setItem("emailVerified", "true");

            if (userId) {
              localStorage.setItem("verifiedUserId", userId);
            }

            navigate("/login", {
              state: {
                message: "Successful verification. Please log in to continue.",
                verified: true,
                user_id: userId,
              },
            });
            return;
          }

          // Get updated user information from the server
          try {
            const token = response.data.token || existingToken;

            console.log("Token to use for info:", token);
            const userResponse = await axios.get(
              getApiUrl("api/accounts/user/info/"),
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            console.log("User information response:", userResponse.data);

            // Verify if the response contains user data
            let userInfo = null;

            if (userResponse.data) {
              if (userResponse.data.user) {
                userInfo = userResponse.data.user;
                console.log("Using data.user:", userInfo);
              } else if (userResponse.data.id) {
                userInfo = userResponse.data;
                console.log("Using data directly:", userInfo);
              } else if (userResponse.data.success) {
                userInfo = userResponse.data.data || {};
                console.log("Using data.data:", userInfo);
              }

              if (userInfo) {
                // Save complete information
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                console.log("Information saved in localStorage:", userInfo);
                console.log("user_type:", userInfo.user_type);
              }
            }

            if (!userInfo) {
              console.warn("Could not obtain valid user information");
              throw new Error("Invalid user data");
            }

            // Esperar 15 segundos y luego redirigir al dashboard
            setTimeout(() => {
              // Determinar el tipo de usuario y redirigir al dashboard correspondiente

              // Prueba directamente los tipos como strings primero
              if (userInfo.user_type === "1" || userInfo.user_type === 1) {
                navigate("/company-dashboard");
                return;
              }

              if (userInfo.user_type === "2" || userInfo.user_type === 2) {
                navigate("/user-dashboard");
                return;
              }

              // Enfoque de conversión numérica como respaldo
              const userType = Number(userInfo.user_type);
              if (!isNaN(userType)) {
                if (userType === 1) {
                  navigate("/company-dashboard");
                } else {
                  navigate("/user-dashboard");
                }
              } else {
                navigate("/login");
              }
            }, 5000); // 5 segundos de espera
          } catch (userError) {
            console.error("Error getting user information:", userError);
            navigate("/login", {
              state: {
                message: "Successful verification. Please log in to continue.",
                verified: true,
              },
            });
          }
        } else {
          throw new Error(response.data.error || "Error verifying email");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        const errorData = {
          message: error.message,
          response: error.response
            ? {
                status: error.response.status,
                data: error.response.data,
              }
            : "No response data",
          request: error.request ? "Request exists" : "No request data",
        };
        console.log("Error details:", JSON.stringify(errorData, null, 2));

        // Show more detailed message to the user
        const errorMsg =
          error.response?.data?.error ||
          error.response?.data?.detail ||
          "Could not verify email. The code may be invalid or expired.";

        setStatus("error");
        setMessage(errorMsg);

        // Redirect to the manual verification page for the user to try again
        setTimeout(() => {
          navigate("/auth/email-verification", {
            state: {
              error: errorMsg,
              token: token,
              user_id: userId,
            },
          });
        }, 5000); // 5 segundos de espera
      }
    };

    verifyToken();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex flex-col items-center">
          {status === "loading" && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          )}
          {status === "success" && (
            <div className="text-center">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 text-green-500 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¡Email verificado correctamente!
              </h2>
              <p className="text-gray-600 mb-4">
                Tu cuenta ha sido verificada. Ahora puedes acceder a todas las
                funciones de la plataforma.
              </p>

              {userEmail && (
                <div className="mb-6 p-3 bg-gray-50 border border-gray-100 rounded-md">
                  <p className="text-sm text-gray-700">
                    Cuenta verificada para:
                  </p>
                  <p className="font-medium text-indigo-600">{userEmail}</p>
                </div>
              )}

              <div className="mt-4 py-2 px-4 bg-gray-100 rounded-md">
                <p className="text-gray-700">Redirigiendo al panel...</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          )}
          {status === "error" && (
            <svg
              className="h-12 w-12 text-yellow-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          )}
          <h2 className="text-xl text-gray-700 text-center">{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailRedirect;
