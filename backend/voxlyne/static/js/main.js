// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      mobileMenuToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      navMenu &&
      mobileMenuToggle &&
      !navMenu.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      navMenu.classList.remove("active");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Alert Messages
document.addEventListener("DOMContentLoaded", function () {
  const alerts = document.querySelectorAll(".alert");

  alerts.forEach((alert) => {
    const closeButton = alert.querySelector(".close-alert");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        alert.remove();
      });

      // Auto-hide alerts after 5 seconds
      setTimeout(() => {
        alert.style.opacity = "0";
        setTimeout(() => alert.remove(), 300);
      }, 5000);
    }
  });
});

// Cookie Consent
document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptButton = document.getElementById("accept-cookies");

  if (cookieConsent && acceptButton) {
    if (!localStorage.getItem("cookieConsent")) {
      cookieConsent.style.display = "block";
    }

    acceptButton.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "true");
      cookieConsent.style.opacity = "0";
      setTimeout(() => {
        cookieConsent.style.display = "none";
      }, 300);
    });
  }
});

// Smooth Scroll for Anchor Links
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Form Validation
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      if (!isValid) {
        e.preventDefault();
        alert("Please fill in all required fields");
      }
    });
  });
});

// Dropdown Menu Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Manejar menús desplegables
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    if (toggle) {
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // Cerrar otros dropdowns
        dropdowns.forEach((other) => {
          if (other !== dropdown) {
            other.classList.remove("active");
          }
        });

        // Toggle el dropdown actual
        dropdown.classList.toggle("active");
      });
    }
  });

  // Cerrar dropdowns al hacer clic fuera
  document.addEventListener("click", function (e) {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });
});
