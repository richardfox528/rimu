/**
 * Global configuration for the application
 * Contains global variables such as the base URL of the backend
 */

// Base URL for all API calls
export const API_BASE_URL = "http://localhost:8000";

// Debug mode - controls the behavior of errors and debug messages
// Set to false for production
export const DEBUG = process.env.NODE_ENV === "development";

// Utility function to build complete API URLs
export const getApiUrl = (endpoint) => {
  // Ensure that the endpoint starts with / if it doesn't have it
  const formattedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  return `${API_BASE_URL}${formattedEndpoint}`;
};

// Function to handle errors and redirect to appropriate error pages
export const handleError = (error, navigate) => {
  if (!navigate) {
    console.error("Navigation function not provided to handleError", error);
    return;
  }

  // If we are in debug mode, show the error in the console
  if (DEBUG) {
    console.error("API Error:", error);
  }

  // Redirect based on the status code
  if (error.response) {
    const status = error.response.status;

    if (status === 403) {
      navigate("/403");
    } else if (status === 404) {
      navigate("/404");
    } else if (status >= 500) {
      navigate("/500");
    }
  } else {
    // Network error or error not related to the response
    navigate("/500");
  }
};
