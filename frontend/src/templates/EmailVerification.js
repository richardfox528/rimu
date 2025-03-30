import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../utils/config.js";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from 'js-cookie';

export const EmailVerificationTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
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
    <h1>Email Verification</h1>
  </div>
  <div class="content">
    <p>Hello,</p>
    <p>Thank you for registering with VoxLyne. To verify your email address, please click the button below:</p>
    <p style="text-align: center;">
      <a href="{{verification_link}}" class="button" style="color: white;">Verify Email</a>
    </p>
    <p>Alternatively, you can use this verification code: <strong>{{verification_code}}</strong></p>
    <p>If you did not create an account, you can safely ignore this email.</p>
    <p>Best regards,<br>The VoxLyne Team</p>
  </div>
  <div class="footer">
    <p>This is an automatic email, please do not reply to this message.</p>
  </div>
</body>
</html>
`;

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [userType, setUserType] = useState("");
  const [manualCode, setManualCode] = useState("");
  const [resendingEmail, setResendingEmail] = useState(false);
  const [message, setMessage] = useState("Verificando tu correo electrónico...");
  const [resendTimer, setResendTimer] = useState(0);
  const [codeError, setCodeError] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [recaptchaKey, setRecaptchaKey] = useState("");
  const [extraAttemptsUsed, setExtraAttemptsUsed] = useState(false);
  const recaptchaRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  // Agregar estado para mostrar mensaje de redirección
  const [redirecting, setRedirecting] = useState(false);
  const [redirectDestination, setRedirectDestination] = useState("");

  // Configuración de timeouts
  const SUCCESS_MESSAGE_TIMEOUT = 2000; // 2 segundos para mostrar el mensaje de éxito
  const REDIRECT_ANIMATION_TIMEOUT = 2000; // 2 segundos para la animación de redirección

  // Función para manejar la redirección
  const handleRedirect = useCallback(() => {
    // Primero mostrar el mensaje de éxito
    setRedirecting(false);

    // Después del tiempo establecido, mostrar la animación de redirección
    setTimeout(() => {
      // Determinar la ruta de destino
      try {
        const currentUserType = parseInt(userType, 10);
        if (currentUserType === 1) {
          setRedirectDestination("Empresa");
        } else {
          setRedirectDestination("Usuario");
        }
      } catch (e) {
        setRedirectDestination("Usuario");
      }

      // Mostrar que estamos redirigiendo
      setRedirecting(true);

      // Después del tiempo para la animación, hacer la redirección real
      setTimeout(() => {
        try {
          const currentUserType = parseInt(userType, 10);
          if (currentUserType === 1) {
            navigate("/company-dashboard");
          } else {
            navigate("/user-dashboard");
          }
        } catch (e) {
          navigate("/user-dashboard");
        }
      }, REDIRECT_ANIMATION_TIMEOUT);
    }, SUCCESS_MESSAGE_TIMEOUT);
  }, [userType, navigate, setRedirecting, setRedirectDestination]);

  // Función para verificar el email con el token
  const verifyEmailWithToken = useCallback(async (token, userId, email) => {
    try {
      // Primero ponemos el estado en pending para mostrar el spinner
      setVerificationStatus("pending");
      setMessage("Verificando tu correo electrónico... Por favor espera.");

      // Hacer la petición al servidor
      const response = await axios.get(
        getApiUrl("api/accounts/verify-email/"),
        {
          params: {
            token,
            ...(userId && { user_id: userId }),
            ...(email && { email }),
          },
        }
      );

      // Después de la respuesta exitosa, mostrar el estado de éxito
      if (response.data && response.data.success) {
        // Actualizar el estado para mostrar éxito
        setVerificationStatus("success");

        // Si la respuesta incluye el tipo de usuario, actualizarlo
        if (response.data.user && response.data.user.user_type) {
          setUserType(response.data.user.user_type);
        }

        // Iniciar el proceso de redirección
        handleRedirect();
      } else {
        // Si hay error, mostrar mensaje de error
        setVerificationStatus("error");
        setErrorMessage(
          response.data?.error ||
            "La verificación falló por un motivo desconocido."
        );
        toast.error("Error en la verificación");
      }
    } catch (error) {
      console.error(
        "Error verifying email:",
        error.response?.data || error.message
      );

      // Si el error indica que ya está verificado, mostrar éxito de todos modos
      if (
        error.response?.data?.error &&
        (error.response.data.error.includes("already verified") ||
          error.response.data.error.includes("ya verificado"))
      ) {
        // Mostrar éxito
        setVerificationStatus("success");

        // Iniciar el proceso de redirección
        handleRedirect();

        return;
      }

      // Si es un error real, mostrar el estado de error
      setVerificationStatus("error");
      setErrorMessage(
        error.response?.data?.error ||
          "Se produjo un error durante la verificación."
      );
      toast.error(
        "Error: " + (error.response?.data?.error || "Error desconocido")
      );
    }
  }, [setVerificationStatus, setMessage, setUserType, setErrorMessage, handleRedirect]);

  // Función para obtener la clave de reCAPTCHA
  const getRecaptchaKey = useCallback(async (retryCount = 0) => {
    try {
      const response = await axios.get(getApiUrl("api/accounts/recaptcha-key/"));
      setRecaptchaKey(response.data.key);
    } catch (error) {
      console.error("Error getting reCAPTCHA key:", error);
      // Reintentar hasta 3 veces con un retraso exponencial
      if (retryCount < 3) {
        setTimeout(() => {
          getRecaptchaKey(retryCount + 1);
        }, Math.pow(2, retryCount) * 1000);
      } else {
        toast.error("No se pudo cargar la verificación de seguridad. Por favor, recarga la página.");
      }
    }
  }, []);

  // Obtener la clave pública de reCAPTCHA del backend
  useEffect(() => {
    if (showCaptcha && !recaptchaKey) {
      getRecaptchaKey();
    }
  }, [showCaptcha, recaptchaKey, getRecaptchaKey]);

  useEffect(() => {
    // Obtener información del usuario de diferentes fuentes
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const queryUserId = queryParams.get("user_id") || queryParams.get("uid");
    const queryEmail = queryParams.get("email");
    const queryUserType = queryParams.get("user_type");

    // Actualizar el estado con el email de la URL
    if (queryEmail) {
      setUserEmail(queryEmail);
      // Guardar el email en una cookie para persistencia
      Cookies.set('verificationEmail', queryEmail);
    } else {
      // Si no hay email en la URL, intentar obtenerlo de las cookies
      const savedEmail = Cookies.get('verificationEmail');
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
    }

    // Actualizar el estado
    setUserId(queryUserId || "");
    setUserType(queryUserType || "");

    // Si hay token, verificar automáticamente
    if (token) {
      setVerificationStatus("pending");
      setMessage("Verificando tu correo electrónico...");

      setTimeout(() => {
        verifyEmailWithToken(token, queryUserId, queryEmail);
      }, 500);
    } else {
      setVerificationStatus("waiting");
    }
  }, [location, verifyEmailWithToken]);

  // Función para validar el formato del código
  const validateCode = (code) => {
    // El código debe tener 6 dígitos numéricos
    const codeRegex = /^\d{6}$/;
    if (!code) {
      setCodeError("El código es requerido");
      return false;
    }
    if (!codeRegex.test(code)) {
      setCodeError("El código debe tener 6 dígitos numéricos");
      return false;
    }
    setCodeError("");
    return true;
  };

  // Manejar el cambio en el código
  const handleCodeChange = (e) => {
    const code = e.target.value;
    setManualCode(code);
    if (code.length === 6) {
      validateCode(code);
    } else {
      setCodeError("");
    }
  };

  // Iniciar el contador después de enviar el email
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Función para formatear el tiempo restante
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Modificar la función de reenvío de email
  const handleResendEmail = async () => {
    // Obtener el email del estado o de la cookie
    const emailToUse = userEmail || Cookies.get('verificationEmail');

    if (!emailToUse) {
      toast.error("No se pudo determinar su correo electrónico. Por favor, ingrese su correo o inicie sesión nuevamente.");
      return;
    }

    if (resendingEmail) {
      return;
    }

    setResendingEmail(true);

    try {
      const response = await axios.post(
        getApiUrl("api/accounts/resend-verification-email/"),
        { email: emailToUse }
      );

      if (response.data && response.data.success) {
        toast.success("Correo de verificación reenviado. Por favor revise su bandeja de entrada.");
        setResendTimer(60); // Solo para mostrar el contador en el botón de reenvío
      } else {
        toast.error(response.data?.error || "Error al reenviar el correo");
      }
    } catch (error) {
      if (error.response?.status === 429) {
        // Rate limit exceeded
        toast.error("Demasiados intentos de reenvío. Por favor, intente más tarde.");
      } else {
        toast.error(error.response?.data?.error || "Error al reenviar el correo de verificación");
      }
    } finally {
      setResendingEmail(false);
    }
  };

  const handleCaptchaChange = async (token) => {
    if (!token) {
      console.error("Token de CAPTCHA no válido");
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaToken("");
      return;
    }

    try {
      setCaptchaToken(token);
      setRemainingAttempts(3);
      setExtraAttemptsUsed(true);
      setShowCaptcha(false);
      toast.success("Verificación exitosa. Tienes 3 intentos adicionales.");
    } catch (error) {
      console.error("Error en la verificación del CAPTCHA:", error);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaToken("");
      toast.error("Error en la verificación. Por favor, inténtalo de nuevo.");
      
      // Recargar la clave de reCAPTCHA en caso de error
      getRecaptchaKey();
    }
  };

  const handleManualVerification = async (e) => {
    e.preventDefault();
    
    if (!validateCode(manualCode)) {
      return;
    }

    if (showCaptcha && !captchaToken) {
      toast.warning("Por favor, completa la verificación de seguridad para continuar");
      return;
    }

    setVerificationStatus("pending");

    try {
      // Asegurarnos de que tenemos el email del usuario
      const emailToUse = userEmail || Cookies.get('verificationEmail');
      
      if (!emailToUse) {
        toast.error("No se pudo determinar el correo electrónico. Por favor, intente nuevamente.");
        return;
      }

      console.log('Enviando solicitud de verificación:', {
        token: manualCode,
        email: emailToUse,
        userId,
        captchaToken
      });

      const response = await axios.get(
        getApiUrl("api/accounts/verify-email/"),
        {
          params: {
            token: manualCode.trim(),
            email: emailToUse.trim(),
            ...(userId && { user_id: userId }),
            ...(captchaToken && { recaptcha_token: captchaToken }),
          },
        }
      );

      if (response.data && response.data.success) {
        setVerificationStatus("success");
        if (response.data.user?.user_type) {
          setUserType(response.data.user.user_type);
        }
        handleRedirect();
      } else {
        setVerificationStatus("error");
        setErrorMessage(response.data?.error || "La verificación falló por un motivo desconocido.");
        toast.error("Error en la verificación");
      }
    } catch (error) {
      console.error('Error en la verificación:', error.response?.data || error);
      setVerificationStatus("error");
      setManualCode("");
      
      if (extraAttemptsUsed && remainingAttempts <= 1) {
        setResendTimer(3600);
        setErrorMessage("Has excedido el número máximo de intentos permitidos. Por tu seguridad, la verificación ha sido bloqueada temporalmente.");
        setRemainingAttempts(0);
        toast.error("Verificación bloqueada por seguridad");
        return;
      }

      const newAttempts = remainingAttempts - 1;
      setRemainingAttempts(newAttempts);

      if (!extraAttemptsUsed && newAttempts > 0) {
        setErrorMessage("El código ingresado no es válido. Por favor, verifica e intenta nuevamente.");
        toast.error("Código incorrecto");
      } else if (newAttempts === 0 && !extraAttemptsUsed) {
        setShowCaptcha(true);
        setErrorMessage("Has agotado tus intentos iniciales. Complete la verificación de seguridad para continuar.");
        toast.warning("Verificación adicional requerida");
        if (!recaptchaKey) {
          getRecaptchaKey();
        }
      } else {
        setErrorMessage(error.response?.data?.error || "El código ingresado no es válido. Por favor, verifica e intenta nuevamente.");
        toast.error("Código incorrecto");
      }

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken("");
      }
    }
  };

  // Actualizar el renderizado del mensaje de intentos restantes
  const renderAttemptsMessage = () => {
    // Solo mostrar mensaje de bloqueo si se han agotado todos los intentos
    if (remainingAttempts === 0 && extraAttemptsUsed) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-red-700 font-medium">Acceso temporalmente bloqueado</p>
              <p className="text-red-600 text-sm mt-1">
                Has excedido el número máximo de intentos. Por favor, intenta nuevamente más tarde.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    if (remainingAttempts === 0 && !extraAttemptsUsed) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-yellow-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-yellow-800 font-medium">Verificación adicional requerida</p>
              <p className="text-yellow-700 text-sm mt-1">
                Has agotado tus intentos iniciales. Por favor, completa el CAPTCHA.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // Solo mostrar el mensaje de intentos restantes cuando estamos usando intentos adicionales
    if (remainingAttempts > 0 && extraAttemptsUsed) {
      return (
        <div className="bg-blue-50 border border-blue-200 border rounded-md p-4 mb-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-blue-800 font-medium">Intentos disponibles</p>
              <p className="text-blue-700 text-sm mt-1">
                Te quedan {remainingAttempts} {remainingAttempts === 1 ? 'intento' : 'intentos'} para verificar tu código
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderCaptcha = () => {
    // Solo verificar si no hay clave de reCAPTCHA
    if (!recaptchaKey) return null;
    
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <div className="flex items-center mb-3">
            <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-700 font-medium">Verificación de seguridad</p>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Por favor, completa el siguiente CAPTCHA para confirmar que eres una persona.
          </p>
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaKey}
              onChange={handleCaptchaChange}
              theme="light"
              size="normal"
              hl="es"
              onExpired={() => {
                setCaptchaToken("");
                if (recaptchaRef.current) {
                  recaptchaRef.current.reset();
                }
                toast.warning("La verificación ha expirado. Por favor, completa el CAPTCHA nuevamente.");
              }}
              onErrored={(err) => {
                console.error("Error en reCAPTCHA:", err);
                setCaptchaToken("");
                if (recaptchaRef.current) {
                  recaptchaRef.current.reset();
                }
                // Recargar la clave de reCAPTCHA
                getRecaptchaKey();
                toast.error("Error en la verificación. Reintentando cargar el CAPTCHA...");
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderManualVerificationForm = () => (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Verificación con código
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Ingrese el código de 6 caracteres que recibió en su correo electrónico
      </p>
      <form onSubmit={handleManualVerification} className="space-y-4">
        <div>
          <input
            type="text"
            id="code"
            value={manualCode}
            onChange={handleCodeChange}
            className={`w-full px-3 py-2 border rounded-md ${
              codeError ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ingrese el código de verificación"
            maxLength={6}
            autoFocus
          />
          {codeError && (
            <p className="mt-1 text-sm text-red-600">{codeError}</p>
          )}
        </div>

        {/* Mostrar el div de email detectado solo después del primer intento fallido */}
        {remainingAttempts < 3 && userEmail && (
          <div className="mb-6 p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email detectado:
            </p>
            <p className="font-medium text-indigo-600 mb-3">{userEmail}</p>
            <div className="mt-2">
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={resendTimer > 0 || resendingEmail}
                className={`w-full bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 ${
                  resendTimer > 0 || resendingEmail ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {resendTimer > 0
                  ? `Reenviar código en ${formatTime(resendTimer)}`
                  : resendingEmail
                  ? "Enviando..."
                  : "Reenviar código de verificación"}
              </button>
            </div>
          </div>
        )}

        {showCaptcha && (
          <div className="flex justify-center my-4">
            {renderCaptcha()}
          </div>
        )}

        {renderAttemptsMessage()}

        <button
          type="submit"
          disabled={!!codeError || (showCaptcha && !captchaToken && !extraAttemptsUsed) || (remainingAttempts === 0 && extraAttemptsUsed)}
          className={`w-full font-medium py-2 px-4 rounded-md ${
            codeError || (showCaptcha && !captchaToken && !extraAttemptsUsed) || (remainingAttempts === 0 && extraAttemptsUsed)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          Verificar email
        </button>
      </form>
    </div>
  );

  // Renderizar según el estado de verificación
  const renderContent = () => {
    switch (verificationStatus) {
      case "success":
        return (
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
                <p className="text-sm text-gray-700">Cuenta verificada para:</p>
                <p className="font-medium text-indigo-600">{userEmail}</p>
              </div>
            )}

            {redirecting && (
              <div className="mt-4 py-2 px-4 bg-gray-100 rounded-md">
                <p className="text-gray-700">
                  Redirigiendo al panel de {redirectDestination}...
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse w-full"></div>
                </div>
              </div>
            )}
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-red-500 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Error de verificación
            </h2>
            <p className="text-red-600 mb-4">{errorMessage}</p>

            {renderManualVerificationForm()}

            <div className="mt-4">
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        );

      case "waiting":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Verificación de correo electrónico
            </h2>
            <p className="text-gray-600 mb-6">
              Hemos enviado un correo electrónico con un enlace y código de
              verificación.
            </p>

            {renderManualVerificationForm()}

            <div className="mt-4">
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Volver al inicio de sesión
                </Link>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 mb-2">
              {message || "Verificando tu correo electrónico..."}
            </p>

            {userEmail && (
              <p className="text-sm text-gray-500">
                Verificando cuenta:{" "}
                <span className="font-medium">{userEmail}</span>
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default EmailVerification;
