import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary py-20 overflow-hidden border-b border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6 hover:text-white/90 transition-colors duration-300">
              Our Services
            </h1>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              Innovative solutions for managing and verifying your work history.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Main Services
            </h2>
            <p className="text-xl text-gray-600">
              Discover how Laboral History can transform the management of your
              professional information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Career Planning
                </h3>
                <p className="text-gray-600">
                  Receive personalized advice to plan your professional
                  development and set realistic goals based on your verified
                  work history.
                </p>
              </div>
            </div>

            {/* Additional Service 3 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1 flex">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Customized Reports
                </h3>
                <p className="text-gray-600">
                  Generate detailed reports of your work history for various
                  purposes, from job applications to immigration or financial
                  processes.
                </p>
              </div>
            </div>

            {/* Additional Service 4 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1 flex">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Employer Verification
                </h3>
                <p className="text-gray-600">
                  Specialized tools for companies to quickly verify the work
                  backgrounds of candidates and employees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Plans and Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Flexible solutions tailored to your professional needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Basic Plan
                </h3>
                <p className="text-gray-500 mb-4">
                  For individual professionals
                </p>
                <div className="text-4xl font-bold text-primary mb-1">Free</div>
                <p className="text-gray-500">Essential features</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Storage for 5 documents</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Basic labor history</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    1 blockchain verification
                  </span>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  to="/register"
                  className="inline-block w-full px-6 py-3 bg-gray-100 text-primary font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
                >
                  Start Free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 border-2 border-primary/20 bg-white transform hover:-translate-y-2 relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Professional Plan
                </h3>
                <p className="text-gray-500 mb-4">For active professionals</p>
                <div className="text-4xl font-bold text-primary mb-1">
                  $9.99<span className="text-lg font-normal">/month</span>
                </div>
                <p className="text-gray-500">Annual billing</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Unlimited storage</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Complete labor history</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    10 blockchain verifications
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Professional profile analysis
                  </span>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  to="/register"
                  className="inline-block w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
                >
                  Subscribe Now
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise Plan
                </h3>
                <p className="text-gray-500 mb-4">
                  For companies and organizations
                </p>
                <div className="text-4xl font-bold text-primary mb-1">
                  Customized
                </div>
                <p className="text-gray-500">Contact for more information</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Custom solution</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">API for integration</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Unlimited verifications</span>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  to="/contact"
                  className="inline-block w-full px-6 py-3 bg-gray-100 text-primary font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-dark to-primary text-white border-t border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/20">
            <h2 className="text-3xl font-bold mb-6 hover:text-white/90 transition-colors duration-300">
              Start Managing Your Work History Today
            </h2>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              Choose the plan that best suits your needs and start enjoying the
              benefits of secure and verified professional management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 text-center hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-primary/20"
              >
                Register Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-center transform hover:-translate-y-1 hover:scale-105 hover:shadow-soft"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Complementary solutions to optimize your professional experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Additional Service 1 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1 flex">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Career Planning
                </h3>
                <p className="text-gray-600">
                  Receive personalized advice to plan your professional
                  development and set realistic goals based on your verified
                  work history.
                </p>
              </div>
            </div>

            {/* Additional Service 3 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1 flex">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Customized Reports
                </h3>
                <p className="text-gray-600">
                  Generate detailed reports of your work history for various
                  purposes, from job applications to immigration or financial
                  processes.
                </p>
              </div>
            </div>

            {/* Additional Service 4 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1 flex">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Employer Verification
                </h3>
                <p className="text-gray-600">
                  Specialized tools for companies to quickly verify the work
                  backgrounds of candidates and employees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Plans and Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Flexible solutions tailored to your professional needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Basic Plan
                </h3>
                <p className="text-gray-500 mb-4">
                  For individual professionals
                </p>
                <div className="text-4xl font-bold text-primary mb-1">Free</div>
                <p className="text-gray-500">Essential features</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Storage for 5 documents</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Basic labor history</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    1 blockchain verification
                  </span>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  to="/register"
                  className="inline-block w-full px-6 py-3 bg-gray-100 text-primary font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
                >
                  Start Free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 border-2 border-primary/20 bg-white transform hover:-translate-y-2 relative">
              <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Popular
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Professional Plan
                </h3>
                <p className="text-gray-500 mb-4">For active professionals</p>
                <div className="text-4xl font-bold text-primary mb-1">
                  $9.99<span className="text-lg font-normal">/month</span>
                </div>
                <p className="text-gray-500">Annual billing</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Unlimited storage</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Complete labor history</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    10 blockchain verifications
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">
                    Professional profile analysis
                  </span>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  to="/register"
                  className="inline-block w-full px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300"
                >
                  Subscribe Now
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enterprise Plan
                </h3>
                <p className="text-gray-500 mb-4">
                  For companies and organizations
                </p>
                <div className="text-4xl font-bold text-primary mb-1">
                  Customized
                </div>
                <p className="text-gray-500">Contact for more information</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Custom solution</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">API for integration</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Dedicated support</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-primary mt-0.5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">Unlimited verifications</span>
                </li>
              </ul>
              <div className="text-center">
                <Link
                  to="/contact"
                  className="inline-block w-full px-6 py-3 bg-gray-100 text-primary font-semibold rounded-xl hover:bg-gray-200 transition-colors duration-300"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-dark to-primary text-white border-t border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/20">
            <h2 className="text-3xl font-bold mb-6 hover:text-white/90 transition-colors duration-300">
              Start Managing Your Work History Today
            </h2>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              Choose the plan that best suits your needs and start enjoying the
              benefits of secure and verified professional management.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 text-center hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-primary/20"
              >
                Register Now
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-center transform hover:-translate-y-1 hover:scale-105 hover:shadow-soft"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
