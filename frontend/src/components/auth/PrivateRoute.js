import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RequireVerifiedEmail from "./RequireVerifiedEmail";

// Componente para proteger rutas que requieren autenticación
// También aplica RequireVerifiedEmail para asegurar que el email esté verificado
const PrivateRoute = ({ children, requireVerified = true }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

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

  // Si se requiere verificación de email, usa RequireVerifiedEmail
  if (requireVerified) {
    return <RequireVerifiedEmail>{children}</RequireVerifiedEmail>;
  }

  // Si no se requiere verificación o el usuario ya está verificado, renderiza normalmente
  return children;
};

export default PrivateRoute;
