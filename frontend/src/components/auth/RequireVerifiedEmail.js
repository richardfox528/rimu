import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Higher-Order Component para asegurar que solo usuarios con email verificado
// puedan acceder a ciertas páginas
const RequireVerifiedEmail = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    console.log("RequireVerifiedEmail - User:", user);
    console.log("RequireVerifiedEmail - Loading:", loading);
    console.log(
      "RequireVerifiedEmail - Is email verified:",
      user?.is_email_verified
    );
  }, [user, loading]);

  // Si está cargando, muestra spinner o nada hasta que termine
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // No hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el usuario existe pero no tiene email verificado, redirigir a la página de verificación
  if (user && !user.is_email_verified) {
    return (
      <Navigate
        to="/auth/email-verification-required"
        state={{
          email: user.email,
          user_id: user.id,
          from: location.pathname,
        }}
        replace
      />
    );
  }

  // Si el usuario existe y tiene email verificado, renderizar normalmente
  return children;
};

export default RequireVerifiedEmail;
