import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
    if (!repoUrl) {
      alert("Please enter a repository URL");
      return;
    }

    try {
      setLoadingAI(true);

      const res = await API.post("ai/analyze/", {
        repo_url: repoUrl,
        provider: provider,
      });

      setAnalysis(res.data.analysis);
    } catch (err: any) {
      alert(err?.response?.data?.error || "Analysis failed");
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
        </div>
      </div>

      {/* ANALYSIS MODAL */}
      {analysis && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
          <div className="bg-gray-900 max-w-3xl w-full p-8 rounded-2xl border border-gray-800 shadow-2xl max-h-[85vh] overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-indigo-400">
                AI Analysis Result
              </h3>
              <button
                onClick={() => setAnalysis("")}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
              {analysis}
            </pre>
          </div>
        </div>
      )}

    </div>
  );
}