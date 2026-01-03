import { HeadProvider, Title } from "react-head";
import { useContext } from "react";
import WebContext from "../../../../Context/WebContext";

const Policy = () => {
  const { theme } = useContext(WebContext);

  return (
    <div
      className={`w-full min-h-screen px-5 md:px-10 lg:px-20 py-12 ${
        theme === "dark" && "bg-gray-900 text-white"
      }`}
    >
      <HeadProvider>
        <Title>Privacy Policy || IE Hub</Title>
      </HeadProvider>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold">Privacy Policy</h1>
          <p className="text-sm md:text-base opacity-80">
            This Privacy Policy explains how IE Hub collects, uses, and protects
            your information when you use our platform.
          </p>
        </div>

        {/* Policy Sections */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="text-sm opacity-80">
            We collect basic user information such as name, email address, and
            profile image during account registration. Product, import, and
            export data are also stored to ensure proper platform functionality.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. How We Use Your Data</h2>
          <ul className="list-disc list-inside text-sm opacity-80 space-y-1">
            <li>To authenticate users securely</li>
            <li>To manage import and export records</li>
            <li>To improve user experience and platform features</li>
            <li>To provide customer and technical support</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. Data Security</h2>
          <p className="text-sm opacity-80">
            IE Hub uses Firebase Authentication and secure backend practices to
            protect user data. We do not sell or share personal information with
            third parties without user consent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">4. Cookies & Tracking</h2>
          <p className="text-sm opacity-80">
            We may use cookies or local storage to maintain login sessions and
            improve application performance. No sensitive data is stored
            insecurely on the client side.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">5. User Responsibilities</h2>
          <p className="text-sm opacity-80">
            Users are responsible for maintaining the confidentiality of their
            login credentials and ensuring the accuracy of submitted product and
            trade information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">6. Policy Updates</h2>
          <p className="text-sm opacity-80">
            IE Hub may update this policy from time to time. Continued use of
            the platform indicates acceptance of any updated terms.
          </p>
        </section>

        {/* Footer */}
        <div className="pt-6 border-t text-center space-y-2">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="text-sm opacity-80">
            If you have questions about this policy, contact us at{" "}
            <span className="font-medium">support@iehub.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
