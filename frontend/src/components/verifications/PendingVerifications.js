import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const PendingVerifications = () => {
  return (
    <DashboardLayout userType="company">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Pending Verifications
        </h1>
        {/* Content of pending verifications */}
      </div>
    </DashboardLayout>
  );
};

export default PendingVerifications;
