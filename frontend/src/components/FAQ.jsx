import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does blockchain verification work?",
      answer:
        "Our platform uses blockchain technology to create an immutable record of your work documents. Each verified document receives a unique digital seal that guarantees its authenticity and allows employers to verify your work history instantly and securely.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Absolutely. We implement bank-level encryption and comply with the strictest data protection regulations. Your documents are protected with advanced technology, and only you decide who can access them.",
    },
    {
      question: "How can companies verify my history?",
      answer:
        "Companies can verify your work history through a simple and secure process. You generate a unique verification link that you can share with potential employers, allowing them to access only the information you authorize.",
    },
    {
      question: "Can I access my documents from any device?",
      answer:
        "Yes, our platform is optimized to work on any device with internet access. You can access your documents from your computer, tablet, or smartphone anytime and anywhere.",
    },
    {
      question: "What types of documents can I store?",
      answer:
        "You can store all types of documents related to your work history: contracts, certificates, letters of recommendation, performance evaluations, academic degrees, and any other relevant documents for your professional career.",
    },
    {
      question: "How do I start using the platform?",
      answer:
        "Simply register by creating an account, verify your email, and start uploading your documents. Our system will guide you step by step through the verification and secure storage process of your work history.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100 hover:border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in p-6 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 border border-transparent hover:border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Answers to the most common questions about our platform.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`mb-4 rounded-xl border ${
                activeIndex === index
                  ? "border-primary shadow-medium"
                  : "border-gray-200 shadow-soft"
              } transition-all duration-300 overflow-hidden hover:border-primary/30 hover:shadow-medium transform hover:-translate-y-px`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-5 text-left focus:outline-none bg-white hover:bg-gray-50 transition-colors duration-200 border-b border-transparent hover:border-gray-100"
              >
                <h3
                  className={`text-xl font-medium ${
                    activeIndex === index ? "text-primary" : "text-gray-900"
                  } transition-colors duration-200 hover:text-primary`}
                >
                  {faq.question}
                </h3>
                <span className="ml-6 flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                  <svg
                    className={`h-6 w-6 transform ${
                      activeIndex === index
                        ? "rotate-180 text-primary"
                        : "rotate-0 text-gray-500"
                    } transition-all duration-300 ease-in-out`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activeIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 pt-0 bg-white hover:bg-gray-50/50 transition-colors duration-300 rounded-b-xl">
                  <p className="text-base text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
