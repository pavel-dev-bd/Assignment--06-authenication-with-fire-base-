import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Google from "../assets/authLogo/google.svg";
import Github from "../assets/authLogo/github.svg";
import { toast } from "react-toastify";

export default function Login() {
  const { loading, login, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Validation
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      await login(email, password);
      navigate(from, { replace: true }); // 🔥 redirect back
    } catch (error) {
      // ❌ No toast here (already handled in context)
      console.error("Login Error:", error);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGithub = async () => {
    try {
      await githubLogin();
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-content h-full flex items-center justify-center bg-indigo-600">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Google */}
        <button
          disabled={loading}
          onClick={handleGoogle}
          className="w-full py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src={Google} alt="google" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Github */}
        <button
          disabled={loading}
          onClick={handleGithub}
          className="w-full mt-4 py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src={Github} alt="github" className="w-5 h-5" />
          Continue with Github
        </button>

        {/* Register Link */}
        <p
          className="text-center mt-4 text-sm cursor-pointer text-indigo-600 hover:underline"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register here
        </p>
      </div>
    </div>
  );
}