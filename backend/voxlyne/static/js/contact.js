// JavaScript for Contact Page

document.addEventListener("DOMContentLoaded", () => {
  console.log("Contact page loaded");

  // Example: Form submission handling
  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
});
