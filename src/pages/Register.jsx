import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Google from "../assets/authLogo/google.svg";
import Github from "../assets/authLogo/github.svg";
import { toast } from "react-toastify";

export default function Register() {
  const { loading, register, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Email validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ Password validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
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
    <div className="main-content px-2 flex items-center justify-center bg-indigo-600">
      <div className="bg-white px-8 py-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />

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
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-3 text-center text-gray-500">OR</div>

        <div className="flex justify-center items-center gap-4">
          <button
            disabled={loading}
            onClick={handleGoogle}
            className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <img src={Google} alt="google" className="w-5 h-5" />
          </button>

          <button
            disabled={loading}
            onClick={handleGithub}
            className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          >
            <img src={Github} alt="github" className="w-5 h-5" />
          </button>
        </div>

        <p
          className="text-center mt-4 text-sm cursor-pointer text-indigo-600 hover:underline"
          onClick={() => navigate("/login")}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}