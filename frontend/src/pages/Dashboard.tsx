import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [provider, setProvider] = useState<string>("openai");
  const [apiKey, setApiKey] = useState<string>("");
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [analysis, setAnalysis] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [savingKey, setSavingKey] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveKey = async () => {
    try {
      setSavingKey(true);

      await API.post("save-keys/", {
        provider: provider,
        api_key: apiKey,
      });

      setApiKey("");
      alert("API Key saved securely ✅");
    } catch {
      alert("Failed to save API key");
    } finally {
      setSavingKey(false);
    }
  };

  const handleAnalyze = async () => {
  try {
    setLoadingAI(true);

    const res = await API.post("ai/analyze/", {
      repo_url: repoUrl,
      provider: provider,
    });

    console.log("Analyze Response:", res.data);
    console.log("")
    const sessionId = res.data.session_id;

    if (!sessionId) {
      console.error("No session ID returned!");
      return;
    }

    navigate(`/chat/${sessionId}`);

  } catch (err) {
    console.error(err);
  } finally {
    setLoadingAI(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-6 border-b border-gray-800 backdrop-blur-lg">
        <h1 className="text-2xl font-bold text-indigo-400 tracking-wide">
          DevConnect
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm border border-gray-700 rounded-lg hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            AI Repository Analysis
          </h2>
          <p className="text-gray-400">
            Connect your preferred LLM and analyze any GitHub repository instantly.
          </p>
        </div>

        {/* PROVIDER SECTION */}
        <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-xl mb-12">

          <h3 className="text-xl font-semibold mb-6 text-indigo-400">
            LLM Configuration
          </h3>

          {/* Provider */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              Select Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="openai">OpenAI</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>

          {/* API Key */}
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              {provider} API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter API key"
            />
          </div>

          <button
            onClick={handleSaveKey}
            disabled={savingKey}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {savingKey ? "Saving..." : "Save API Key"}
          </button>
        </div>

        {/* ANALYZE SECTION */}
        <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-xl">

          <h3 className="text-xl font-semibold mb-6 text-purple-400">
            Analyze Repository
          </h3>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2">
              GitHub Repository URL
            </label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="https://github.com/user/repo"
            />
          </div>

          <button
              onClick={handleAnalyze}
              disabled={loadingAI}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition shadow-lg shadow-purple-600/30 disabled:opacity-50"
            >
              {loadingAI ? "Analyzing..." : "Analyze with AI"}
            </button>
            {loadingAI && (
              <div className="mt-6 animate-pulse space-y-4">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="h-4 bg-gray-800 rounded w-2/3"></div>
              </div>
            )}
        </div>
      </div>

    

    </div>
  );
}