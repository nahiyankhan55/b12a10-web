const Career = () => {
  const openings = [
    {
      id: 1,
      title: "Support Executive",
      type: "Full Time",
      location: "Remote",
      description:
        "Handle customer queries, assist users with import/export processes, and ensure smooth platform usage.",
      requirements: [
        "Good communication skills",
        "Basic understanding of web platforms",
        "Problem-solving mindset",
      ],
    },
    {
      id: 2,
      title: "Technical Engineer",
      type: "Full Time",
      location: "Hybrid",
      description:
        "Maintain and improve system performance, assist with backend operations, and support feature upgrades.",
      requirements: [
        "Knowledge of JavaScript & Node.js",
        "Basic MongoDB understanding",
        "Ability to debug and fix issues",
      ],
    },
    {
      id: 3,
      title: "Frontend Developer (React)",
      type: "Internship",
      location: "Remote",
      description:
        "Work with the UI team to build responsive interfaces and improve user experience across the platform.",
      requirements: [
        "React & Tailwind CSS",
        "Understanding of component-based design",
        "Git & GitHub basics",
      ],
    },
  ];

  return (
    <section className="min-h-screen px-4 md:px-8 lg:px-16 py-12 bg-base-100 text-base-content">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Careers at IE Hub</h1>
          <p className="max-w-3xl mx-auto text-sm md:text-base opacity-80">
            Join IE Hub and be part of a growing platform focused on simplifying
            global import and export operations through technology.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="grid md:grid-cols-3 gap-6">
          <div
            data-aos="fade-up-right"
            className="p-6 rounded-xl border bg-base-200 space-y-2 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
          >
            <h2 className="text-xl font-semibold">Growth Focused</h2>
            <p className="text-sm opacity-80">
              We encourage learning, skill development, and real-world project
              experience.
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="p-6 rounded-xl border bg-base-200 space-y-2 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
          >
            <h2 className="text-xl font-semibold">Flexible Work</h2>
            <p className="text-sm opacity-80">
              Remote and hybrid opportunities to support work-life balance.
            </p>
          </div>
          <div
            data-aos="fade-up-left"
            className="p-6 rounded-xl border bg-base-200 space-y-2 shadow-sm hover:shadow-md duration-300 shadow-gray-400"
          >
            <h2 className="text-xl font-semibold">Impactful Work</h2>
            <p className="text-sm opacity-80">
              Build solutions that directly help businesses manage trade
              operations efficiently.
            </p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center">
            Current Open Positions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openings.map((job) => (
              <div
                data-aos="fade-up"
                key={job.id}
                className="p-6 rounded-xl border bg-base-200 space-y-4 shadow-gray-400 shadow-sm hover:shadow-md duration-300"
              >
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm opacity-80">{job.description}</p>

                  <div className="text-xs opacity-70">
                    <p>Type: {job.type}</p>
                    <p>Location: {job.location}</p>
                  </div>

                  <ul className="list-disc list-inside text-sm opacity-80 space-y-1">
                    {job.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <p className="text-sm font-medium text-center opacity-90">
                  Mail your CV to:{" "}
                  <span className="font-semibold">hr@iehub.com</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold">Didn't find a role?</h2>
          <p className="max-w-3xl mx-auto text-sm opacity-80">
            Send your CV to <span className="font-semibold">hr@iehub.com</span>{" "}
            and we'll contact you when a suitable opportunity becomes available.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Career;
