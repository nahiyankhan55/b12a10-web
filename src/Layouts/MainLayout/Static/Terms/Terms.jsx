import { HeadProvider, Title } from "react-head";
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";

const Terms = () => {
  const { theme } = useContext(WebContext);

  return (
    <div
      className={`w-full min-h-screen px-5 md:px-10 lg:px-20 py-12 ${
        theme === "dark" && "bg-gray-900 text-white"
      }`}
    >
      <HeadProvider>
        <Title>Terms & Conditions || IE Hub</Title>
      </HeadProvider>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold">Terms & Conditions</h1>
          <p className="text-sm md:text-base opacity-80">
            These Terms and Conditions govern your access to and use of the IE
            Hub platform. By using our services, you agree to comply with these
            terms.
          </p>
        </div>

        {/* Sections */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-sm opacity-80">
            By registering or using IE Hub, you acknowledge that you have read,
            understood, and agreed to these Terms & Conditions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. User Accounts</h2>
          <p className="text-sm opacity-80">
            Users must provide accurate and complete information during account
            creation. You are responsible for maintaining the confidentiality of
            your account credentials.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. Platform Usage</h2>
          <ul className="list-disc list-inside text-sm opacity-80 space-y-1">
            <li>
              Use the platform only for lawful import and export activities
            </li>
            <li>Do not submit false or misleading trade information</li>
            <li>Do not attempt unauthorized access or data manipulation</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. Data & Content</h2>
          <p className="text-sm opacity-80">
            All data submitted by users remains their responsibility. IE Hub is
            not liable for inaccuracies or legal consequences arising from
            user-submitted information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">5. Service Availability</h2>
          <p className="text-sm opacity-80">
            We aim to provide uninterrupted service but do not guarantee that
            the platform will always be available or error-free.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">6. Termination</h2>
          <p className="text-sm opacity-80">
            IE Hub reserves the right to suspend or terminate user accounts for
            violations of these terms without prior notice.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
          <p className="text-sm opacity-80">
            We may update these Terms & Conditions at any time. Continued use of
            the platform constitutes acceptance of the revised terms.
          </p>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t text-center space-y-2">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <p className="text-sm opacity-80">
            For any questions regarding these terms, contact us at{" "}
            <span className="font-medium">support@iehub.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
