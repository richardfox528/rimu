import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import BaseLayout from "./components/layout/BaseLayout";

// Lazy load page components
const Register = lazy(() => import('./pages/Register'));
const CookieConsent = lazy(() => import('./components/common/CookieConsent'));
const PoliticaCookies = lazy(() => import('./pages/PoliticaCookies'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

// Authentication components
const Login = lazy(() => import('./components/auth/Login'));
const ResetPassword = lazy(() => import('./components/auth/ResetPassword'));
const ForgotPassword = lazy(() => import('./templates/ForgotPassword'));
const EmailVerification = lazy(() => import('./pages/EmailVerification'));

// Dashboard components
const UserDashboard = lazy(() => import('./components/dashboard/UserDashboard'));
const CompanyDashboard = lazy(() => import('./components/dashboard/CompanyDashboard'));

// Employment history components
const EmploymentHistory = lazy(() => import('./components/employment/EmploymentHistory'));
const NewEmployment = lazy(() => import('./components/employment/NewEmployment'));

// Document components
const Documents = lazy(() => import('./components/documents/Documents'));
const NewDocument = lazy(() => import('./components/documents/NewDocument'));

// Profile components
const Profile = lazy(() => import('./components/profile/Profile'));
const EditProfile = lazy(() => import('./components/profile/EditProfile'));

// Company profile components
const CompanyProfile = lazy(() => import('./components/profile/CompanyProfile'));
const CompanyEditProfile = lazy(() => import('./components/profile/CompanyEditProfile'));

// Settings component
const Settings = lazy(() => import('./components/settings'));

// Home page
const Home = lazy(() => import('./pages/Home'));

// Public pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));

// Error pages
const NotFound = lazy(() => import('./pages/errorPages/NotFound'));
const Forbidden = lazy(() => import('./pages/errorPages/Forbidden'));
const ServerError = lazy(() => import('./pages/errorPages/ServerError'));

// Import the new email verification pages
const EmailVerificationRequired = lazy(() => import('./pages/EmailVerificationRequired'));
const VerifyEmailRedirect = lazy(() => import('./pages/VerifyEmailRedirect'));

// Simple loading component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="bottom-left" />
        <Suspense fallback={<LoadingSpinner />}>
          <CookieConsent />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
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
            <Route
              path="/company/profile"
              element={<PrivateRoute element={<CompanyProfile />} userType={1} />}
            />
            <Route
              path="/company/profile/edit"
              element={<PrivateRoute element={<CompanyEditProfile />} userType={1} />}
            />

            {/* Public pages */}
            <Route
              path="/about"
              element={
                <BaseLayout>
                  <About />
                </BaseLayout>
              }
            />
            <Route
              path="/services"
              element={
                <BaseLayout>
                  <Services />
                </BaseLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <BaseLayout>
                  <Contact />
                </BaseLayout>
              }
            />
            <Route
              path="/"
              element={
                <BaseLayout>
                  <Home />
                </BaseLayout>
              }
            />

            {/* Legal pages */}
            <Route
              path="/politica-cookies"
              element={
                <BaseLayout>
                  <PoliticaCookies />
                </BaseLayout>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <BaseLayout>
                  <PrivacyPolicy />
                </BaseLayout>
              }
            />
            <Route
              path="/terms-of-service"
              element={
                <BaseLayout>
                  <TermsOfService />
                </BaseLayout>
              }
            />

            {/* Error pages */}
            <Route
              path="/404"
              element={
                <BaseLayout>
                  <NotFound />
                </BaseLayout>
              }
            />
            <Route
              path="/403"
              element={
                <BaseLayout>
                  <Forbidden />
                </BaseLayout>
              }
            />
            <Route
              path="/500"
              element={
                <BaseLayout>
                  <ServerError />
                </BaseLayout>
              }
            />

            {/* Catch-all route for 404 Not Found */}
            <Route
              path="*"
              element={
                <BaseLayout>
                  <NotFound />
                </BaseLayout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
