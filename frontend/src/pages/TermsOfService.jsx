import React from 'react';
import { Helmet } from 'react-helmet';
import appConfig from '../config/appConfig';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - {appConfig.APP_NAME}</title>
        <meta name="description" content={`${appConfig.APP_NAME}'s Terms of Service - Understanding our service agreement`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using {appConfig.APP_NAME}'s services, you accept and agree to be bound by the terms and conditions outlined in this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-4">
              {appConfig.APP_NAME} provides a platform for secure document management and professional history verification. Our services include:
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
              All content and materials available on {appConfig.APP_NAME}, including but not limited to text, graphics, website name, code, images, and logos are the intellectual property of {appConfig.APP_NAME} and are protected by applicable copyright and trademark law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              {appConfig.APP_NAME} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
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
              <a href={`mailto:${appConfig.LEGAL_EMAIL}`} className="text-indigo-600 hover:text-indigo-800">
                {appConfig.LEGAL_EMAIL}
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfService; 