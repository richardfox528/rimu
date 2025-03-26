import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-red-600">403</h1>
          <h2 className="text-4xl font-semibold text-gray-800 mt-4">Access Forbidden</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-md mx-auto">
            You don't have permission to access this resource.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forbidden;