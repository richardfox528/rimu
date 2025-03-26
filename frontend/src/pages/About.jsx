import React from "react";
import { Link } from "react-router-dom";

const getInitials = (name) => {
  const names = name.split(" ");
  return names
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-dark to-primary py-20 overflow-hidden border-b border-white/10 hover:border-white/20 transition-all duration-300">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6 hover:text-white/90 transition-colors duration-300">
              About Us
            </h1>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              Learn about our mission, vision, and the team behind Laboral
              History.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  At Laboral History, our mission is to transform the way people
                  manage and verify their work history. We use blockchain
                  technology to provide a secure, transparent, and reliable
                  system that benefits both employees and employers.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We are committed to simplifying the verification processes,
                  reducing fraud in documentation, and empowering professionals
                  with complete control over their work information.
                </p>
              </div>

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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Vision
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We aspire to be the world's leading platform for managing and
                  verifying work histories, creating a global standard for the
                  authentication of professional documents through blockchain.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  We envision a future where hiring processes are more
                  efficient, transparent, and secure, eliminating traditional
                  barriers in background verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">
              Meet the passionate professionals who are transforming the
              management of work histories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:rotate-1 border border-gray-100 hover:border-primary/20">
              <div className="p-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {getInitials("Ricardo Muñoz")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                  Ricardo Muñoz
                </h3>
                <p className="text-gray-500 text-center mb-4">CEO & Founder</p>
                <p className="text-gray-600 text-center">
                  Blockchain expert with over 10 years of experience in emerging
                  technologies and digital security.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:rotate-1 border border-gray-100 hover:border-primary/20">
              <div className="p-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {getInitials("Tatiana López")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                  Tatiana López
                </h3>
                <p className="text-gray-500 text-center mb-4">CTO</p>
                <p className="text-gray-600 text-center">
                  Software engineer specializing in blockchain development and
                  distributed systems architecture.
                </p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden transform hover:-translate-y-1 hover:rotate-1 border border-gray-100 hover:border-primary/20">
              <div className="p-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {getInitials("Esteban Muñoz")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
                  Esteban Muñoz
                </h3>
                <p className="text-gray-500 text-center mb-4">
                  Operations Director
                </p>
                <p className="text-gray-600 text-center">
                  Specialist in human resources management with extensive
                  experience in labor verification processes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide our decisions and define our culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Value 1 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Security</h3>
              <p className="text-gray-600">
                We protect our users' information with the highest standards of
                digital security.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Transparency
              </h3>
              <p className="text-gray-600">
                We believe in clear and verifiable processes that build trust
                among all our users.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We work alongside employees and employers to create solutions
                that benefit all parties.
              </p>
            </div>

            {/* Value 4 */}
            <div className="p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 border border-gray-100 hover:border-primary/20 bg-white transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We constantly seek new ways to improve our services and adapt to
                the changing needs of the labor market.
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
              Join Our Community
            </h2>
            <p className="text-xl text-white/90 mb-8 hover:text-white transition-colors duration-300">
              Discover how Laboral History is transforming the management of
              work histories and be part of this revolution.
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
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
