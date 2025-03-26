import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCookie } from "../../utils/cookieUtils";

const PrivateRoute = ({ element, userType }) => {
  const { user, loading, checkAuth } = useAuth();
  const token = getCookie("token");
  const [authChecked, setAuthChecked] = useState(false);

  // Verify authentication when component mounts
  useEffect(() => {
    const verifyAuth = async () => {
      if (!user && token) {
        await checkAuth();
      }
      setAuthChecked(true);
    };

    verifyAuth();
  }, [user, token, checkAuth]);

  // Show a loading indicator while authentication is being verified
  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Redirect to login only if there is no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If we have a user, check if the user type matches
  if (user && userType && user.user_type !== userType) {
    // Redirect to the appropriate dashboard
    return (
      <Navigate
        to={user.user_type === 1 ? "/company-dashboard" : "/user-dashboard"}
        replace
      />
    );
  }

  return element;
};

export default PrivateRoute;
