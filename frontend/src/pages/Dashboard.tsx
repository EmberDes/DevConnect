import { useEffect, useState } from "react";
import API from "../services/api";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  github_url?: string;
}

interface PaginatedResponse {
  results: Repository[];
}

export default function Dashboard() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [githubToken, setGithubToken] = useState<string>("");
  const [manualUrl, setManualUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRepos = async () => {
    try {
      const res = await API.get<PaginatedResponse | Repository[]>(
        "repositories/"
      );

      if (Array.isArray(res.data)) {
        setRepos(res.data);
      } else {
        setRepos(res.data.results);
      }
    } catch {
      console.error("Failed to fetch repositories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleImport = async () => {
    await API.post("github/import/", {
      github_token: githubToken,
    });

    setGithubToken("");
    fetchRepos();
  };

  const handleManualSubmit = async () => {
    // For now just log it
    console.log("Manual repo URL submitted:", manualUrl);
    alert("LLM integration coming soon 🚀");
    setManualUrl("");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-indigo-400">
          DevConnect Dashboard
        </h1>
      </div>

      <div className="p-8">

        {/* Import Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* GitHub Import */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">
              Import from GitHub
            </h2>
            <input
              type="text"
              placeholder="Enter GitHub Personal Access Token"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleImport}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition"
            >
              Import Repositories
            </button>
          </div>

          {/* Manual URL for LLM */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">
              Analyze Repository (LLM)
            </h2>
            <input
              type="text"
              placeholder="Paste GitHub repository URL"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleManualSubmit}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition"
            >
              Analyze with AI
            </button>
          </div>

        </div>

        {/* Repository Grid */}
        <h2 className="text-xl font-semibold mb-4">
          Your Repositories
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : repos.length === 0 ? (
          <p className="text-gray-400">No repositories yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:border-indigo-500 transition"
              >
                <h3 className="text-lg font-bold mb-2">
                  {repo.name}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {repo.description || "No description provided."}
                </p>

                <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}