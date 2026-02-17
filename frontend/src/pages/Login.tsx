import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.post("token/", { username, password });

      login(res.data.access);
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black">
      
      {/* Card */}
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10">

        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white tracking-wide">
            DevConnect
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Connect your GitHub. Build smarter.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            {error}
          </div>
        )}

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-gray-400 text-sm mt-6">
                Don't have an account?{" "}
            <span onClick={() => navigate("/register")}className="text-indigo-400 cursor-pointer hover:underline">
                    Register
                </span>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Powered by Django + React + TypeScript
        </p>

      </div>
    </div>
  );
}