import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const CompletedVerifications = () => {
  return (
    <DashboardLayout userType="company">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Completed Verifications
        </h1>
        {/* Content of completed verifications */}
      </div>
    </DashboardLayout>
  );
};

export default CompletedVerifications;
