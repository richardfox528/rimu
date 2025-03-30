import React from 'react';
import { Helmet } from 'react-helmet';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - VoxLyne</title>
        <meta name="description" content="VoxLyne's Terms of Service - Understanding our service agreement" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using VoxLyne's services, you accept and agree to be bound by the terms and conditions outlined in this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              VoxLyne provides a platform for secure document management and professional history verification. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Document storage and management</li>
              <li>Employment history verification</li>
              <li>Professional profile management</li>
              <li>Secure data sharing between authorized parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              As a user of our service, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Provide accurate and truthful information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Not share your account access with unauthorized users</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              All content and materials available on VoxLyne, including but not limited to text, graphics, website name, code, images, and logos are the intellectual property of VoxLyne and are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              VoxLyne shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform. Continued use of our service after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:legal@voxlyne.com" className="text-indigo-600 hover:text-indigo-800">
                legal@voxlyne.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfService; 