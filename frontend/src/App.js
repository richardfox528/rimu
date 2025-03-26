import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import CookieConsent from "./components/common/CookieConsent";
import PoliticaCookies from "./pages/PoliticaCookies";

// Context
import { AuthProvider } from "./context/AuthContext";

// Authentication components
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./templates/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";

// Dashboard components
import UserDashboard from "./components/dashboard/UserDashboard";
import CompanyDashboard from "./components/dashboard/CompanyDashboard";

// Employment history components
import EmploymentHistory from "./components/employment/EmploymentHistory";
import NewEmployment from "./components/employment/NewEmployment";

// Document components
import Documents from "./components/documents/Documents";
import NewDocument from "./components/documents/NewDocument";

// Profile components
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";

// Settings component
import Settings from "./components/settings";

// Route protection component
import PrivateRoute from "./components/common/PrivateRoute";

// Home page
import Home from "./pages/Home";

// Base layout
import BaseLayout from "./components/layout/BaseLayout";

// Public pages
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

// Error pages
import NotFound from "./pages/errorPages/NotFound";
import Forbidden from "./pages/errorPages/Forbidden";
import ServerError from "./pages/errorPages/ServerError";

// Import the new email verification pages
import EmailVerificationRequired from "./pages/EmailVerificationRequired";
import VerifyEmailRedirect from "./pages/VerifyEmailRedirect";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="bottom-left" />
        <CookieConsent />
        <Routes>
          {/* Rutas públicas */}
          {/* Public routes */}
          <Route
            path="/login"
            element={
              <BaseLayout>
                <Login />
              </BaseLayout>
            }
          />
          <Route
            path="/reset-password"
            element={
              <BaseLayout>
                <ResetPassword />
              </BaseLayout>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <BaseLayout>
                <ForgotPassword />
              </BaseLayout>
            }
          />
          <Route
            path="/register"
            element={
              <BaseLayout>
                <Register />
              </BaseLayout>
            }
          />

          {/* Email Verification Routes */}
          <Route
            path="/auth/email-verification"
            element={
              <BaseLayout>
                <EmailVerification />
              </BaseLayout>
            }
          />
          <Route
            path="/auth/email-verification-required"
            element={
              <BaseLayout>
                <EmailVerificationRequired />
              </BaseLayout>
            }
          />
          <Route path="/verify-email" element={<VerifyEmailRedirect />} />

          {/* Protected routes - normal user */}
          <Route
            path="/user-dashboard"
            element={<PrivateRoute element={<UserDashboard />} userType={2} />}
          />
          <Route
            path="/employment-history"
            element={
              <PrivateRoute element={<EmploymentHistory />} userType={2} />
            }
          />
          <Route
            path="/employment-history/new"
            element={<PrivateRoute element={<NewEmployment />} userType={2} />}
          />
          <Route
            path="/my-documents"
            element={<PrivateRoute element={<Documents />} userType={2} />}
          />
          <Route
            path="/my-documents/new"
            element={<PrivateRoute element={<NewDocument />} userType={2} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute element={<Profile />} userType={2} />}
          />
          <Route
            path="/profile/edit"
            element={<PrivateRoute element={<EditProfile />} userType={2} />}
          />
          <Route
            path="/user/settings"
            element={<PrivateRoute element={<Settings />} userType={2} />}
          />

          {/* Protected routes - Company */}
          <Route
            path="/company-dashboard"
            element={
              <PrivateRoute element={<CompanyDashboard />} userType={1} />
            }
          />
          <Route
            path="/company/settings"
            element={<PrivateRoute element={<Settings />} userType={1} />}
          />

          {/* Public pages */}
          <Route
            path="/about"
            element={
              <BaseLayout>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <About />
                </React.Suspense>
              </BaseLayout>
            }
          />
          <Route
            path="/services"
            element={
              <BaseLayout>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Services />
                </React.Suspense>
              </BaseLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <BaseLayout>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Contact />
                </React.Suspense>
              </BaseLayout>
            }
          />

          {/* Legal pages */}
          <Route
            path="/cookie-policy"
            element={
              <BaseLayout>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <PoliticaCookies />
                </React.Suspense>
              </BaseLayout>
            }
          />

          {/* Error pages */}
          <Route
            path="/403"
            element={
              <BaseLayout>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <Forbidden />
                </React.Suspense>
              </BaseLayout>
            }
          />
          <Route
            path="/500"
            element={
              <BaseLayout>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ServerError />
                </React.Suspense>
              </BaseLayout>
            }
          />

          {/* Default route */}
          <Route
            path="/"
            element={
              <BaseLayout>
                <Home />
              </BaseLayout>
            }
          />

          {/* 404 - Not Found - Must be the last route */}
          <Route
            path="*"
            element={
              <BaseLayout>
                <React.Suspense fallback={<div>Loading...</div>}>
                  <NotFound />
                </React.Suspense>
              </BaseLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
