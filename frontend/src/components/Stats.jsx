import React from "react";

const Stats = () => {
  const stats = [
    {
      value: "10,000+",
      label: "Active Users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      value: "50,000+",
      label: "Verified Documents",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 1118 0z"
          />
        </svg>
      ),
    },
    {
      value: "1,000+",
      label: "Partner Companies",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-info"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      value: "98%",
      label: "Customer Satisfaction",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-warning"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100 hover:border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in p-6 rounded-2xl hover:bg-white/50 transition-all duration-300 border border-transparent hover:border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
            Empowering Professional Careers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Our numbers demonstrate the impact we are having on the management
            of work histories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-soft p-8 transform transition-all duration-300 hover:shadow-medium hover:-translate-y-2 border border-transparent hover:border-primary/10 overflow-hidden relative group"
            >
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300"></div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 relative z-10 border border-transparent group-hover:border-primary/10 transform group-hover:scale-110">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-2 group-hover:text-primary transition-colors duration-300">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
