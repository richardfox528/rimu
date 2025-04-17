import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getApiUrl } from "../utils/config.js";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from 'js-cookie';
import appConfig from "../config/appConfig";

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
    <p>Thank you for registering with ${appConfig.APP_NAME}. To verify your email address, please click the button below:</p>
    <p style="text-align: center;">
      <a href="{{verification_link}}" class="button" style="color: white;">Verify Email</a>
    </p>
    <p>Alternatively, you can use this verification code: <strong>{{verification_code}}</strong></p>
    <p>If you did not create an account, you can safely ignore this email.</p>
    <p>Best regards,<br>The ${appConfig.APP_NAME} Team</p>
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
  const [message, setMessage] = useState("Verifying your email...");
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

  const [redirecting, setRedirecting] = useState(false);
  const [redirectDestination, setRedirectDestination] = useState("");

  const SUCCESS_MESSAGE_TIMEOUT = 2000;
  const REDIRECT_ANIMATION_TIMEOUT = 2000;

  const handleRedirect = useCallback(() => {
    setRedirecting(false);

    setTimeout(() => {
      try {
        const currentUserType = parseInt(userType, 10);
        if (currentUserType === 1) {
          setRedirectDestination("Company");
        } else {
          setRedirectDestination("User");
        }
      } catch (e) {
        setRedirectDestination("User");
      }

      setRedirecting(true);

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

  const verifyEmailWithToken = useCallback(async (token, userId, email) => {
    try {
      setVerificationStatus("pending");
      setMessage("Verifying your email... Please wait.");

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

      if (response.data && response.data.success) {
        setVerificationStatus("success");

        if (response.data.user && response.data.user.user_type) {
          setUserType(response.data.user.user_type);
        }

        handleRedirect();
      } else {
        setVerificationStatus("error");
        setErrorMessage(
          response.data?.error ||
            "Verification failed for an unknown reason."
        );
        toast.error("Verification error");
      }
    } catch (error) {
      console.error(
        "Error verifying email:",
        error.response?.data || error.message
      );

      if (
        error.response?.data?.error &&
        (error.response.data.error.includes("already verified") ||
          error.response.data.error.includes("already verified"))
      ) {
        setVerificationStatus("success");
        handleRedirect();
        return;
      }

      setVerificationStatus("error");
      setErrorMessage(
        error.response?.data?.error ||
          "An error occurred during verification."
      );
      toast.error(
        "Error: " + (error.response?.data?.error || "Unknown error")
      );
    }
  }, [setVerificationStatus, setMessage, setUserType, setErrorMessage, handleRedirect]);

  const getRecaptchaKey = useCallback(async (retryCount = 0) => {
    try {
      const response = await axios.get(getApiUrl("api/accounts/recaptcha-key/"));
      setRecaptchaKey(response.data.key);
    } catch (error) {
      console.error("Error getting reCAPTCHA key:", error);
      if (retryCount < 3) {
        setTimeout(() => {
          getRecaptchaKey(retryCount + 1);
        }, Math.pow(2, retryCount) * 1000);
      } else {
        toast.error("Could not load security verification. Please reload the page.");
      }
    }
  }, []);

  useEffect(() => {
    if (showCaptcha && !recaptchaKey) {
      getRecaptchaKey();
    }
  }, [showCaptcha, recaptchaKey, getRecaptchaKey]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const queryUserId = queryParams.get("user_id") || queryParams.get("uid");
    const queryEmail = queryParams.get("email");
    const queryUserType = queryParams.get("user_type");

    if (queryEmail) {
      setUserEmail(queryEmail);
      Cookies.set('verificationEmail', queryEmail);
    } else {
      const savedEmail = Cookies.get('verificationEmail');
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
    }

    setUserId(queryUserId || "");
    setUserType(queryUserType || "");

    if (token) {
      setVerificationStatus("pending");
      setMessage("Verifying your email...");

      setTimeout(() => {
        verifyEmailWithToken(token, queryUserId, queryEmail);
      }, 500);
    } else {
      setVerificationStatus("waiting");
    }
  }, [location, verifyEmailWithToken]);

  const validateCode = (code) => {
    const codeRegex = /^\d{6}$/;
    if (!code) {
      setCodeError("Code is required");
      return false;
    }
    if (!codeRegex.test(code)) {
      setCodeError("Code must be 6 numeric digits");
      return false;
    }
    setCodeError("");
    return true;
  };

  const handleCodeChange = (e) => {
    const code = e.target.value;
    setManualCode(code);
    if (code.length === 6) {
      validateCode(code);
    } else {
      setCodeError("");
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResendEmail = async () => {
    const emailToUse = userEmail || Cookies.get('verificationEmail');

    if (!emailToUse) {
      toast.error("Could not determine your email. Please enter your email or log in again.");
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
        toast.success("Verification email resent. Please check your inbox.");
        setResendTimer(60);
      } else {
        toast.error(response.data?.error || "Error resending email");
      }
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Too many resend attempts. Please try again later.");
      } else {
        toast.error(error.response?.data?.error || "Error resending verification email");
      }
    } finally {
      setResendingEmail(false);
    }
  };

  const handleCaptchaChange = async (token) => {
    if (!token) {
      console.error("Invalid CAPTCHA token");
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
      toast.success("Verification successful. You have 3 additional attempts.");
    } catch (error) {
      console.error("Error in CAPTCHA verification:", error);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setCaptchaToken("");
      toast.error("Verification error. Please try again.");
      
      getRecaptchaKey();
    }
  };

  const handleManualVerification = async (e) => {
    e.preventDefault();
    
    if (!validateCode(manualCode)) {
      return;
    }

    if (showCaptcha && !captchaToken) {
      toast.warning("Please complete the security verification to continue");
      return;
    }

    setVerificationStatus("pending");

    try {
      const emailToUse = userEmail || Cookies.get('verificationEmail');
      
      if (!emailToUse) {
        toast.error("Could not determine email. Please try again.");
        return;
      }

      console.log('Sending verification request:', {
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
        setErrorMessage(response.data?.error || "Verification failed for an unknown reason.");
        toast.error("Verification error");
      }
    } catch (error) {
      console.error('Verification error:', error.response?.data || error);
      setVerificationStatus("error");
      setManualCode("");
      
      if (extraAttemptsUsed && remainingAttempts <= 1) {
        setResendTimer(3600);
        setErrorMessage("You have exceeded the maximum number of allowed attempts. For your security, verification has been temporarily blocked.");
        setRemainingAttempts(0);
        toast.error("Verification blocked for security");
        return;
      }

      const newAttempts = remainingAttempts - 1;
      setRemainingAttempts(newAttempts);

      if (!extraAttemptsUsed && newAttempts > 0) {
        setErrorMessage("The entered code is not valid. Please verify and try again.");
        toast.error("Incorrect code");
      } else if (newAttempts === 0 && !extraAttemptsUsed) {
        setShowCaptcha(true);
        setErrorMessage("You have used all your initial attempts. Complete the security verification to continue.");
        toast.warning("Additional verification required");
        if (!recaptchaKey) {
          getRecaptchaKey();
        }
      } else {
        setErrorMessage(error.response?.data?.error || "The entered code is not valid. Please verify and try again.");
        toast.error("Incorrect code");
      }

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken("");
      }
    }
  };

  const renderAttemptsMessage = () => {
    if (remainingAttempts === 0 && extraAttemptsUsed) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-red-700 font-medium">Access temporarily blocked</p>
              <p className="text-red-600 text-sm mt-1">
                You have exceeded the maximum number of attempts. Please try again later.
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
              <p className="text-yellow-800 font-medium">Additional verification required</p>
              <p className="text-yellow-700 text-sm mt-1">
                You have used all your initial attempts. Please complete the CAPTCHA.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    if (remainingAttempts > 0 && extraAttemptsUsed) {
      return (
        <div className="bg-blue-50 border border-blue-200 border rounded-md p-4 mb-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-blue-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-blue-800 font-medium">Available attempts</p>
              <p className="text-blue-700 text-sm mt-1">
                You have {remainingAttempts} {remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining to verify your code
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderCaptcha = () => {
    if (!recaptchaKey) return null;
    
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <div className="flex items-center mb-3">
            <svg className="h-5 w-5 text-gray-400 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-700 font-medium">Security verification</p>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Please complete the following CAPTCHA to confirm you are a person.
          </p>
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaKey}
              onChange={handleCaptchaChange}
              theme="light"
              size="normal"
              hl="en"
              onExpired={() => {
                setCaptchaToken("");
                if (recaptchaRef.current) {
                  recaptchaRef.current.reset();
                }
                toast.warning("Verification has expired. Please complete the CAPTCHA again.");
              }}
              onErrored={(err) => {
                console.error("Error in reCAPTCHA:", err);
                setCaptchaToken("");
                if (recaptchaRef.current) {
                  recaptchaRef.current.reset();
                }
                getRecaptchaKey();
                toast.error("Verification error. Attempting to reload CAPTCHA...");
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
        Code verification
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Enter the 6-character code you received in your email
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
            placeholder="Enter verification code"
            maxLength={6}
            autoFocus
          />
          {codeError && (
            <p className="mt-1 text-sm text-red-600">{codeError}</p>
          )}
        </div>

        {remainingAttempts < 3 && userEmail && (
          <div className="mb-6 p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Detected email:
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
                  ? `Resend code in ${formatTime(resendTimer)}`
                  : resendingEmail
                  ? "Sending..."
                  : "Resend verification code"}
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
          Verify email
        </button>
      </form>
    </div>
  );

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
              Email verified successfully!
            </h2>
            <p className="text-gray-600 mb-4">
              Your account has been verified. You can now access all platform features.
            </p>

            {userEmail && (
              <div className="mb-6 p-3 bg-gray-50 border border-gray-100 rounded-md">
                <p className="text-sm text-gray-700">Account verified for:</p>
                <p className="font-medium text-indigo-600">{userEmail}</p>
              </div>
            )}

            {redirecting && (
              <div className="mt-4 py-2 px-4 bg-gray-100 rounded-md">
                <p className="text-gray-700">
                  Redirecting to {redirectDestination} dashboard...
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
              Verification Error
            </h2>
            <p className="text-red-600 mb-4">{errorMessage}</p>

            {renderManualVerificationForm()}

            <div className="mt-4">
              <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Return to login
              </Link>
            </div>
          </div>
        );

      case "waiting":
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Email Verification
            </h2>
            <p className="text-gray-600 mb-6">
              We have sent an email with a verification link and code.
            </p>

            {renderManualVerificationForm()}

            <div className="mt-4">
                <Link
                  to="/login"
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Return to login
                </Link>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 mb-2">
              {message || "Verifying your email..."}
            </p>

            {userEmail && (
              <p className="text-sm text-gray-500">
                Verifying account:{" "}
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
