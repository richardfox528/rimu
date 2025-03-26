import React from "react";

const featuresData = [
  {
    title: "Advanced Security",
    description:
      "Your documents are protected with bank-level encryption and blockchain technology for immutable verification.",
    details: [
      "End-to-end encryption",
      "Blockchain verification",
      "Two-factor authentication",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "Instant Verification",
    description:
      "Employers can verify your work history and credentials instantly with a simple and secure verification process.",
    details: [
      "Real-time validation",
      "Secure document sharing",
      "Digital time stamps",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-success"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Universal Access",
    description:
      "Access your professional documents from any device, anywhere in the world, at any time.",
    details: [
      "Cross-platform compatibility",
      "Cloud synchronization",
      "Offline access",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-info"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
  },
  {
    title: "Simplified Management",
    description:
      "Organize and manage all your work documentation in one place with an intuitive and easy-to-use interface.",
    details: ["Automatic organization", "Smart search", "Update reminders"],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-warning"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-100 hover:border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in p-6 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 border border-transparent hover:border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
            Main Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Our platform offers advanced tools for the secure management of your
            work history.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-soft hover:shadow-medium p-6 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 group relative overflow-hidden"
            >
              <div className="absolute -right-16 -bottom-16 w-32 h-32 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300"></div>
              <div className="flex items-start relative z-10">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 transform group-hover:scale-110 border border-transparent group-hover:border-primary/10">
                    {feature.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-300 p-1 rounded hover:bg-gray-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-success mr-2 group-hover:scale-110 transition-transform duration-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
