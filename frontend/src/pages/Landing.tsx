import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-black text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[700px] h-[700px] bg-indigo-600/20 blur-[150px] rounded-full top-[-200px] left-[-200px]" />
        <div className="absolute w-[600px] h-[600px] bg-purple-600/20 blur-[150px] rounded-full bottom-[-200px] right-[-200px]" />
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-indigo-400">DevConnect</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 border border-gray-800 rounded-lg hover:bg-gray-900"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <section className="text-center mt-32 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold max-w-4xl mx-auto"
        >
          The Smartest Way to
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {" "}Understand Your Code
          </span>
        </motion.h2>

        <p className="mt-8 text-gray-400 text-xl max-w-2xl mx-auto">
          DevConnect connects your GitHub repositories with AI,
          giving you insights, improvements, and collaboration tools instantly.
        </p>

        <div className="mt-10">
          <button
            onClick={() => navigate("/register")}
            className="px-8 py-4 bg-indigo-600 rounded-xl text-lg hover:bg-indigo-500 shadow-lg shadow-indigo-600/40"
          >
            Start Free
          </button>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="mt-40 max-w-5xl mx-auto px-6 text-center">
        <h3 className="text-4xl font-bold mb-6">
          Managing Repositories is Hard.
        </h3>
        <p className="text-gray-400 text-lg">
          Developers struggle to analyze large codebases,
          understand project structure, and collaborate effectively.
          Manual reviews waste time.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-32 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
        {[
          "Connect your GitHub account",
          "Import repositories securely",
          "Let AI analyze & improve your project",
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900/70 p-8 rounded-2xl border border-gray-800"
          >
            <h4 className="text-indigo-400 text-lg font-semibold mb-4">
              Step {index + 1}
            </h4>
            <p className="text-gray-300">{step}</p>
          </motion.div>
        ))}
      </section>

      {/* PRODUCT PREVIEW MOCK */}
      <section className="mt-40 max-w-6xl mx-auto px-6">
        <h3 className="text-4xl font-bold text-center mb-12">
          Built for Developers
        </h3>

        <div className="bg-gray-900/60 border border-gray-800 rounded-3xl p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-indigo-400 text-xl mb-4">
                Repository Insights
              </h4>
              <p className="text-gray-400">
                Get automated summaries, architectural suggestions,
                and potential improvements instantly.
              </p>
            </div>

            <div className="bg-black rounded-2xl p-6 border border-gray-800">
              <pre className="text-sm text-gray-400">
{`AI Suggestion:
- Refactor service layer
- Add caching mechanism
- Improve folder structure`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* AI SECTION */}
      <section className="mt-40 text-center max-w-4xl mx-auto px-6">
        <h3 className="text-4xl font-bold mb-6">
          Powered by Large Language Models
        </h3>
        <p className="text-gray-400 text-lg">
          DevConnect integrates AI to help you:
        </p>

        <ul className="mt-8 space-y-4 text-gray-300">
          <li>✔ Detect code smells</li>
          <li>✔ Suggest performance optimizations</li>
          <li>✔ Generate documentation</li>
          <li>✔ Provide architecture feedback</li>
        </ul>
      </section>

      {/* FINAL CTA */}
      <section className="mt-40 text-center pb-32">
        <h3 className="text-4xl font-bold mb-6">
          Ready to level up your development?
        </h3>

        <button
          onClick={() => navigate("/register")}
          className="px-10 py-4 bg-indigo-600 rounded-xl text-lg hover:bg-indigo-500 shadow-lg shadow-indigo-600/40"
        >
          Create Free Account
        </button>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-600 text-sm pb-10">
        © 2026 DevConnect — Built with Django + React + AI
      </footer>
    </div>
  );
}