import React from "react";

const TermsAndConditions = ({ setShowTerms }) => {
  return (
    <div className="fixed  top-[2rem] lg:py-[10rem] py-[2rem] z-[1] from-red-100 via-red-200 to-green-200 bg-gradient-to-br w-full inset-0 h-[90vh] overflow-y-auto tracking-wider">
      <div className="container mx-auto py-8 lg:w-[60%] w-[100%] shadow p-4 bg-gray-200 backdrop-filter backdrop-blur-lg bg-opacity-25 text-gray-600">
        <button
          className="text-red-600 text-2xl font-bold py-1 px-2 h-8 rounded focus:mt-2 float-right"
          onClick={() => setShowTerms(false)}
        >
          <i className="fal fa-times-square"></i>
        </button>
        <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-8">
          Welcome to {" "}
          <span className="font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</span>,
          a multivendor e-commerce website platform. These Terms and Conditions
          outline the rules and regulations for the use of our services. By
          accessing or using our website, you agree to comply with these Terms
          and Conditions. Please read them carefully.
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
          <p>
            a. By accessing or using our website, you acknowledge that you have
            read, understood, and agree to be bound by these Terms and
            Conditions.
          </p>
          <p>
            b. If you do not agree with any part of these Terms and Conditions,
            you may not access or use our website.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">2. General Conditions</h2>
          <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3">
            <li>
              You must be at least 18 years old and have the legal authority to
              enter into agreements to use our services.
            </li>
            <li>
              You are responsible for maintaining the security of your account
              and password. Any activity that occurs under your account is your
              responsibility.
            </li>
            <li>
              You may not use our services for any illegal or unauthorized
              purpose.
            </li>
            <li>
              We reserve the right to modify or terminate our services at any
              time without notice.
            </li>
            <li>
              We reserve the right to refuse service to anyone for any reason at
              any time.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">3. Account Registration</h2>
          <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3">
            <li>
              In order to use our services, you must create an account and
              provide accurate and complete information.
            </li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account information and for all activities that occur under your
              account.
            </li>
            <li>
              You agree to promptly update your account information to keep it
              accurate and complete.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">4. Multivendor Platform</h2>
          <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3">
            <li>
              Our platform allows vendors to sell their products or services to
              customers.
            </li>
            <li>
              Vendors are responsible for the accuracy and quality of the
              products or services they offer.
            </li>
            <li>
              We do not guarantee the availability, accuracy, or completeness of
              any product or service listed on our platform.
            </li>
            <li>
              The inclusion of any product or service on our platform does not
              imply endorsement or recommendation by{" "}
              {process.env.NEXT_PUBLIC_APP_NAME}.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            5. Intellectual Property Rights
          </h2>
          <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3">
            <li>
              Our website and its original content, features, and functionality
              are owned by {process.env.NEXT_PUBLIC_APP_NAME} and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </li>
            <li>
              You may not modify, reproduce, distribute, display, or sell any
              part of our website or its content without our prior written
              consent.
            </li>
            <li>
              You may not use any trademarks or logos belonging to{" "}
              {process.env.NEXT_PUBLIC_APP_NAME} {" "}
              without our prior written consent.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">6. User Conduct</h2>
          <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3">
            <li>
              You agree not to use our website for any unlawful purpose or to
              engage in any activity that violates these Terms and Conditions.
            </li>
            <li>
              You are solely responsible for your interactions with other users,
              vendors, or any third party on our website.
            </li>
            <li>
              You agree not to upload, post, or transmit any content that is
              illegal, offensive, defamatory, or violates the rights of others.
            </li>
            <li>
              You agree not to engage in any fraudulent or deceptive activities
              on our platform.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            7. Payments and Transactions
          </h2>
          <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3">
            <li>
              Payments for products or services purchased through our platform
              are processed securely.
            </li>
            <li>
              We are not responsible for any issues or disputes arising from
              transactions between users and vendors.
            </li>
            <li>
              Any refunds or disputes regarding payments should be resolved
              directly between the parties involved.
            </li>
            <li>
              We may charge fees for certain services or transactions on our
              platform. By using those services, you agree to pay the applicable
              fees.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">8. Privacy Policy</h2>
          <p>
            Our Privacy Policy explains how we collect, use, and disclose your
            personal information. By using our website, you agree to our Privacy
            Policy.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">9. Limitation of Liability</h2>
          <ul role="list" class="marker:text-red-400 list-disc pl-5 space-y-3">
            <li>
              We shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages, including but not limited to
              loss of profits, data, or goodwill.
            </li>
            <li>
              We do not guarantee the continuous, uninterrupted, or secure
              access to our website.
            </li>
            <li>
              You agree to indemnify and hold {process.env.NEXT_PUBLIC_APP_NAME}{" "}
              and its affiliates, officers, directors, agents, and employees
              harmless from any claims, damages, losses, liabilities, or
              expenses arising out of your use of our website or any violation
              of these Terms and Conditions.
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            10. Governing Law and Jurisdiction
          </h2>
          <p>
            a. These Terms and Conditions shall be governed by and construed in
            accordance with the laws of [Jurisdiction].
          </p>
          <p>
            b. Any disputes arising out of these Terms and Conditions shall be
            subject to the exclusive jurisdiction of the courts of
            [Jurisdiction].
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">
            11. Changes to Terms and Conditions
          </h2>
          <p>
            a. We reserve the right to modify or replace these Terms and
            Conditions at any time without prior notice.
          </p>
          <p>
            b. It is your responsibility to review these Terms and Conditions
            periodically for any changes.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">12. Severability</h2>
          <p>
            If any provision of these Terms and Conditions is found to be
            invalid or unenforceable, the remaining provisions shall continue to
            be valid and enforceable to the fullest extent permitted by law.
          </p>
        </div>

        <p>
          If you have any questions or concerns regarding these Terms and
          Conditions, please contact us at{" "}
          <span className="text-blue-500">[contact email]</span>.
        </p>

        <p className="mt-4">Effective Date: [Date]</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
