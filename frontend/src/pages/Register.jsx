import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import appConfig from "../config/appConfig";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (userData) => {
    try {
      const result = await register(
        userData.username,
        userData.email,
        userData.password,
        userData.first_name,
        userData.last_name,
        parseInt(userData.user_type),
        userData.phone_number,
        userData.country_code,
        userData.phone_number_national
      );

      console.log(
        `Registration successful for ${userData.first_name} ${
          userData.last_name
        }. User ID: ${result.user?.id || "N/A"}`
      );

      // Show success message
      toast.success(
        "¡Cuenta creada exitosamente! Por favor verifica tu correo electrónico.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Redirect to email verification page with more context
      setTimeout(() => {
        // If we have a verification token from the result, pass it to the verification page
        if (result.verification_code) {
          navigate(
            `/auth/email-verification?email=${encodeURIComponent(
              userData.email
            )}&token=${encodeURIComponent(result.verification_code)}`,
            {
              state: {
                email: userData.email,
                user_id: result.user?.id,
                just_registered: true,
              },
            }
          );
        } else {
          // Fallback to just passing the email if no token is provided
          navigate(
            `/auth/email-verification?email=${encodeURIComponent(
              userData.email
            )}`,
            {
              state: {
                email: userData.email,
                just_registered: true,
              },
            }
          );
        }
      }, 1500);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(error.message || "Error al registrar usuario", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-8">
        <img src="../assets/logo.svg" alt={appConfig.APP_NAME + " Logo"} className="w-20 h-20 mb-4" />
        <h1 className="text-4xl font-bold text-gray-900">{appConfig.APP_NAME}</h1>
        <p className="mt-2 text-center text-gray-600">
          Create your account to manage your work history
        </p>
      </div>

      <RegisterForm onRegister={handleRegister} />

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;
