/**
 * Utilities for handling cookies in the frontend
 */

/**
 * Sets a cookie with the specified name, value, and expiration days
 * @param {string} name - Name of the cookie
 * @param {string} value - Value of the cookie
 * @param {number} days - Days until expiration
 */
export const setCookie = (name, value, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

/**
 * Gets the value of a cookie by its name
 * @param {string} name - Name of the cookie to search for
 * @returns {string|null} - Value of the cookie or null if it does not exist
 */
export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Deletes a cookie by its name
 * @param {string} name - Name of the cookie to delete
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
};

/**
 * Checks if cookies are enabled in the browser
 * @returns {boolean} - true if cookies are enabled
 */
export const areCookiesEnabled = () => {
  try {
    document.cookie = "cookietest=1";
    const result = document.cookie.indexOf("cookietest=") !== -1;
    document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
    return result;
  } catch (e) {
    return false;
  }
};
