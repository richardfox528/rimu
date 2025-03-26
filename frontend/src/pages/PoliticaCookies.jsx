import React from "react";

/**
 * Cookie Policy Page
 * Provides detailed information about the use of cookies on the site
 */
const PoliticaCookies = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            What are cookies?
          </h2>
          <p>
            Cookies are small text files that are stored on your device
            (computer, tablet, mobile phone) when you visit a website. Cookies
            are widely used to make websites work more efficiently, as well as
            to provide information to site owners.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Types of cookies we use
          </h2>

          <h3 className="text-xl font-semibold mt-6 mb-3">Essential cookies</h3>
          <p>
            These cookies are necessary for the basic functioning of our
            website. They allow you to navigate our site and use its features.
            Without these cookies, we could not provide the services you
            request.
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>
              Session cookies to keep your session active while browsing the
              site
            </li>
            <li>Authentication cookies to remember that you are logged in</li>
            <li>Security cookies to prevent attacks and protect your data</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Preference cookies
          </h3>
          <p>
            These cookies allow us to remember your preferences and customize
            our website accordingly. For example, we can remember your preferred
            language or the region you are in.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            Analytical cookies
          </h3>
          <p>
            We use analytical cookies to understand how visitors interact with
            our website. These cookies help us continuously improve our site and
            your user experience.
          </p>
          <p>
            The information collected is anonymous and statistical, such as the
            number of visitors to our site, where visitors come from, and which
            pages they visit.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Cookie control</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete
            all cookies that are already on your device and can set most
            browsers to prevent them from being placed. However, if you do this,
            you may need to manually adjust some preferences each time you visit
            a site and some services and functionalities may not work.
          </p>
          <p>
            When you first visit our site, we present you with a cookie banner
            where you can choose to accept all cookies or only the essential
            ones. You can change your preferences at any time by visiting this
            page.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">More information</h2>
          <p>
            For more information on how we use cookies and how we protect your
            data, please feel free to contact us.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Changes to our cookie policy
          </h2>
          <p>
            Any changes we may make to our cookie policy in the future will be
            posted on this page. Please check back frequently to see any updates
            or changes to our cookie policy.
          </p>

          <p className="mt-8 text-sm text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default PoliticaCookies;
