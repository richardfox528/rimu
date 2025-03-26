import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary py-20 overflow-hidden border-b border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6 hover:text-white/90 transition-colors duration-300">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              We are here to answer your questions and assist you with your
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send Us a Message
                  </h2>
                  <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="Subject of your message"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-medium"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <div className="p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Address
                        </h3>
                        <p className="text-gray-600">
                          123 Business Ave, Suite 100
                          <br />
                          Madrid, Spain 28001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Phone
                        </h3>
                        <p className="text-gray-600">
                          <a
                            href="tel:+34911234567"
                            className="hover:text-primary transition-colors"
                          >
                            +34 911 234 567
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Email
                        </h3>
                        <p className="text-gray-600">
                          <a
                            href="mailto:info@laboralhistory.com"
                            className="hover:text-primary transition-colors"
                          >
                            info@laboralhistory.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Business Hours
                        </h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday: 10:00 AM - 2:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Location
            </h2>
            <p className="text-xl text-gray-600">
              Visit our headquarters in Madrid
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white overflow-hidden">
              {/* Placeholder for map - in a real implementation, this would be an actual map component */}
              <div className="bg-gray-200 w-full h-96 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg
                    className="w-16 h-16 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-gray-600 text-lg font-medium">
                    Location map - Integration with Google Maps
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Answers to the most common inquiries about our services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How long does it take to process a verification?
              </h3>
              <p className="text-gray-600">
                Standard verifications are processed within 24-48 hours. For
                urgent verifications, we offer a premium service with a response
                time of 4-6 business hours.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                How can I share my work history with an employer?
              </h3>
              <p className="text-gray-600">
                Our platform allows you to generate a secure and temporary link
                that you can share with potential employers. This link will only
                give them access to the information you authorize to share.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                What security measures do you use to protect my data?
              </h3>
              <p className="text-gray-600">
                We implement end-to-end encryption, two-factor authentication,
                and blockchain technology to ensure the maximum security of your
                personal and professional information. Additionally, we comply
                with all applicable data protection regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-dark to-primary text-white border-t border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/20">
            <h2 className="text-3xl font-bold mb-6 hover:text-white/90 transition-colors duration-300">
              Do You Have Any Other Questions?
            </h2>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              Our customer service team is available to assist you with any
              additional inquiries you may have.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 text-center hover:bg-gray-100 transform hover:-translate-y-1 hover:scale-105 border border-transparent hover:border-primary/20"
              >
                Register Now
              </Link>
              <a
                href="mailto:info@laboralhistory.com"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-center transform hover:-translate-y-1 hover:scale-105 hover:shadow-soft"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
