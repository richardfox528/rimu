/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../voxlyne/templates/**/*.{html,js}",
    "../../**/templates/**/*.{html,js}",
    "./static/src/**/*.{html,js}",
    "!../../**/node_modules/**",
  ],
  safelist: [
    "nav-link",
    "btn",
    "btn-primary",
    "btn-secondary",
    "btn-success",
    "btn-danger",
    "btn-outline",
    "btn-sm",
    "btn-lg",
    "alert",
    "alert-success",
    "alert-danger",
    "alert-warning",
    "alert-info",
    "dropdown-menu",
    "dropdown-item",
    "card",
    "card-header",
    "card-body",
    "card-footer",
    "form-control",
    "form-label",
    "form-group",
    "table",
    "breadcrumb",
    "breadcrumb-item",
    "breadcrumb-separator",
    "mobile-menu",
    "mobile-menu-content",
    "mobile-menu-close",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007bff",
          dark: "#0056b3",
          light: "#3395ff",
        },
        secondary: {
          DEFAULT: "#6c757d",
          dark: "#545b62",
          light: "#868e96",
        },
        success: {
          DEFAULT: "#28a745",
          dark: "#1e7e34",
          light: "#34ce57",
        },
        danger: {
          DEFAULT: "#dc3545",
          dark: "#bd2130",
          light: "#e4606d",
        },
        warning: {
          DEFAULT: "#ffc107",
          dark: "#d39e00",
          light: "#ffce3a",
        },
        info: {
          DEFAULT: "#17a2b8",
          dark: "#117a8b",
          light: "#1fc8e3",
        },
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      boxShadow: {
        soft: "0 2px 15px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 20px rgba(0, 0, 0, 0.15)",
        strong: "0 8px 30px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-down": "slideDown 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
