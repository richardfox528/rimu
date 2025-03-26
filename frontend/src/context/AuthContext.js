import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { getApiUrl } from "../utils/config.js";
import { setCookie, getCookie, deleteCookie } from "../utils/cookieUtils.js";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    // Always prioritize token from cookies
    const token = getCookie("token");

    // For backward compatibility
    const localStorageToken = localStorage.getItem("token");

    // If token exists in localStorage but not in cookies, migrate it
    if (!token && localStorageToken) {
      const cookieOptions = {
        expires: 1,
        path: "/",
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      };

      // Set in cookies
      setCookie("token", localStorageToken, 1);
      Cookies.set("token", localStorageToken, cookieOptions);

      console.log("Migrated token from localStorage to cookies");
    }

    // Use token from cookies, or as fallback from localStorage
    const tokenToUse = token || localStorageToken;

    if (tokenToUse) {
      try {
        const response = await axios.get(getApiUrl("api/accounts/user/info/"), {
          headers: { Authorization: `Bearer ${tokenToUse}` },
          timeout: 10000, // 10 seconds timeout
        });
        setUser(response.data);

        // Migrate tokens from localStorage to cookies if they exist in localStorage
        if (localStorage.getItem("token")) {
          // Use consistent cookie options
          const cookieOptions = {
            expires: 1,
            path: "/",
            sameSite: "Lax",
            secure: window.location.protocol === "https:",
          };

          Cookies.set("token", localStorage.getItem("token"), cookieOptions);
          localStorage.removeItem("token");
        }
        if (localStorage.getItem("refreshToken")) {
          // Use consistent cookie options
          const cookieOptions = {
            expires: 7,
            path: "/",
            sameSite: "Lax",
            secure: window.location.protocol === "https:",
          };

          Cookies.set(
            "refreshToken",
            localStorage.getItem("refreshToken"),
            cookieOptions
          );
          localStorage.removeItem("refreshToken");
        }
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user"); // We no longer need to store the user in localStorage
        }
      } catch (error) {
        console.error("Error checking authentication:", error);

        // Only remove tokens if the error is not a timeout or connection error
        if (
          !error.code ||
          (error.code !== "ECONNABORTED" && error.code !== "ERR_NETWORK")
        ) {
          deleteCookie("token");
          deleteCookie("refreshToken");
          localStorage.removeItem("token"); // Just in case it still exists
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username_or_email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(getApiUrl("api/accounts/auth/login/"), {
        username_or_email,
        password,
      });

      // Check if email is verified
      if (response.data.verification_required) {
        // Store temporary tokens to be able to resend the verification
        const cookieOptions = {
          expires: 1,
          path: "/",
          sameSite: "Lax",
          secure: window.location.protocol === "https:",
        };

        // Set token in cookies
        setCookie("token", response.data.token, 1);
        Cookies.set("token", response.data.token, cookieOptions);

        // Remove any token from localStorage to avoid confusion
        localStorage.removeItem("token");

        setLoading(false);
        return {
          ...response.data,
          verification_required: true,
        };
      }

      // Store tokens in secure cookies with consistent configuration
      const accessTokenOptions = {
        expires: 1, // 1 day for access token
        path: "/",
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      };

      const refreshTokenOptions = {
        expires: 7, // 7 days for refresh token
        path: "/",
        sameSite: "Lax",
        secure: window.location.protocol === "https:",
      };

      // Set cookies using both methods to ensure compatibility
      setCookie("token", response.data.token, 1);
      setCookie("refreshToken", response.data.refresh, 7);

      Cookies.set("token", response.data.token, accessTokenOptions);
      Cookies.set("refreshToken", response.data.refresh, refreshTokenOptions);

      // Remove tokens from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Get the complete user information after login
      const userInfoResponse = await axios.get(
        getApiUrl("api/accounts/user/info/"),
        {
          headers: { Authorization: `Bearer ${response.data.token}` },
        }
      );

      // Save user information in the state
      setUser(userInfoResponse.data);

      // Save user information for quick access
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          email: userInfoResponse.data.email,
          username: userInfoResponse.data.username,
          id: userInfoResponse.data.id,
          user_type: userInfoResponse.data.user_type,
          is_email_verified: userInfoResponse.data.is_email_verified,
        })
      );

      // Prepare the response for the login component
      const responseData = {
        ...response.data,
        user: userInfoResponse.data,
      };

      setLoading(false);
      return responseData;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Get token from cookies only - we should not be relying on localStorage anymore
      const token = getCookie("token");
      const refreshToken = getCookie("refreshToken");

      if (token) {
        await axios.post(
          getApiUrl("api/accounts/auth/logout/"),
          { refresh: refreshToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Error logging out:", error);
      // Continue with logout process even if API call fails
    } finally {
      // Remove cookies using both methods to ensure they are properly removed
      // Use consistent cookie paths
      Cookies.remove("token", { path: "/" });
      Cookies.remove("refreshToken", { path: "/" });

      // Delete cookies using our utility functions
      deleteCookie("token");
      deleteCookie("refreshToken");

      // Clean localStorage as well, just to be safe
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo"); // Important to also remove userInfo

      setUser(null);
      setLoading(false);
    }
  };

  const register = async (
    username,
    email,
    password,
    first_name,
    last_name,
    user_type,
    phone_number,
    country_code,
    phone_number_national
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        getApiUrl("api/accounts/auth/register/"),
        {
          username,
          email,
          password,
          first_name,
          last_name,
          user_type,
          phone_number,
          country_code,
          phone_number_national,
          frontend_url: window.location.origin, // Enviamos la URL frontend para los emails
        }
      );

      console.log("Registration successful:", response.data);

      // Si recibimos un token, guardarlo temporalmente para la verificación
      if (response.data.token) {
        const cookieOptions = {
          expires: 1,
          path: "/",
          sameSite: "Lax",
          secure: window.location.protocol === "https:",
        };

        // Set token in cookies
        setCookie("token", response.data.token, 1);
        Cookies.set("token", response.data.token, cookieOptions);

        // Store user information in localStorage for easy access
        if (response.data.user) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              email: response.data.user.email || email,
              username: response.data.user.username || username,
              id: response.data.user.id,
              user_type: response.data.user.user_type || user_type,
              is_email_verified: false,
            })
          );
        }
      }

      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error in the API:", error);
      console.error("Error response data:", error.response?.data);
      console.error("Error response status:", error.response?.status);
      console.error("Error response headers:", error.response?.headers);
      console.error("Error request data:", {
        username,
        email,
        password: "REDACTED",
        first_name,
        last_name,
        user_type,
        phone_number,
        country_code,
        phone_number_national,
      });
      setLoading(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        register,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
