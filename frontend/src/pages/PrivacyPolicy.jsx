import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - VoxLyne</title>
        <meta name="description" content="VoxLyne's Privacy Policy - Learn how we protect and manage your data" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Personal identification information (Name, email address, phone number)</li>
              <li>Professional history and employment records</li>
              <li>Documents and files you upload to our platform</li>
              <li>Communication preferences and settings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the collected information for various purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              The security of your data is important to us. We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to our processing of your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@voxlyne.com" className="text-indigo-600 hover:text-indigo-800">
                privacy@voxlyne.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy; 