import { HeadProvider, Title } from "react-head";

const About = () => {
  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 py-12 bg-base-100 text-base-content">
      <HeadProvider>
        <Title>About || IE Hub</Title>
      </HeadProvider>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">About IE Hub</h1>
          <p className="max-w-3xl mx-auto text-sm md:text-base opacity-80">
            IE Hub is a modern Import-Export management platform designed to
            simplify product tracking, stock management, and trade operations
            for businesses and individuals.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8">
          <div
            data-aos="fade-up-right"
            className="p-6 rounded-xl border bg-base-200 space-y-3 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
          >
            <h2 className="text-xl font-semibold">Our Mission</h2>
            <p className="text-sm opacity-80">
              Our mission is to make import and export operations transparent,
              efficient, and easy to manage by providing a centralized digital
              platform with real-time data and secure access.
            </p>
          </div>

          <div
            data-aos="fade-up-left"
            className="p-6 rounded-xl border bg-base-200 space-y-3 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
          >
            <h2 className="text-xl font-semibold">Our Vision</h2>
            <p className="text-sm opacity-80">
              We envision IE Hub as a reliable global trade assistant where
              users can confidently manage products, imports, and exports
              without manual complexity or data inconsistency.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">
            What IE Hub Offers
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              data-aos="zoom-in"
              className="p-5 rounded-xl border bg-base-200 space-y-2 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
            >
              <h3 className="font-medium">Product Management</h3>
              <p className="text-sm opacity-80">
                Add, update, and track products with automatic stock updates
                after imports and exports.
              </p>
            </div>

            <div
              data-aos="zoom-in"
              className="p-5 rounded-xl border bg-base-200 space-y-2 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
            >
              <h3 className="font-medium">Import & Export Tracking</h3>
              <p className="text-sm opacity-80">
                Maintain detailed records of imports and exports with real-time
                UI updates.
              </p>
            </div>

            <div
              data-aos="zoom-in"
              className="p-5 rounded-xl border bg-base-200 space-y-2 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
            >
              <h3 className="font-medium">Secure Dashboard</h3>
              <p className="text-sm opacity-80">
                Role-based private dashboard with protected routes and user
                authentication.
              </p>
            </div>

            <div
              data-aos="zoom-in"
              className="p-5 rounded-xl border bg-base-200 space-y-2 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
            >
              <h3 className="font-medium">Modern UX</h3>
              <p className="text-sm opacity-80">
                Responsive design, dark/light mode, smooth animations, and
                optimized data fetching.
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div
          data-aos="fade-up"
          className="p-6 rounded-xl border bg-base-200 space-y-4 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
        >
          <h2 className="text-xl font-semibold">Technology Stack</h2>
          <p className="text-sm opacity-80">
            IE Hub is built using a modern and scalable technology stack to
            ensure performance, security, and maintainability.
          </p>
          <ul className="list-disc list-inside text-sm opacity-80 space-y-1">
            <li>Frontend: React, Tailwind CSS, TanStack Query</li>
            <li>Backend: Node.js, Express.js, MongoDB</li>
            <li>Authentication: Firebase Authentication</li>
            <li>UI Enhancements: AOS, SweetAlert2, MUI Components</li>
          </ul>
        </div>

        {/* Closing */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold">Why IE Hub?</h2>
          <p className="max-w-3xl mx-auto text-sm opacity-80">
            IE Hub is built as a real-world, production-ready application
            focusing on clean UI, proper UX, and scalable backend architecture.
            It is suitable for portfolio showcase and future commercial
            extension.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
