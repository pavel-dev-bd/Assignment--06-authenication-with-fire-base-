import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Google from "../assets/authLogo/google.svg";
import Github from "../assets/authLogo/github.svg";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const { loading, register, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ Password validation
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 Validation
    if (name.trim() === "") {
      toast.error("Name is required for registration");
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

    if (password !== comfirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGithub = async () => {
    try {
      await githubLogin();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-full flex items-center justify-center  bg-indigo-600">
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
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={comfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              required
            />

            {/* 👁 Show Password Button */}
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
            className="w-full cursor-pointer py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-1 text-center text-gray-500">OR</div>
        <div className="flex justify-center items-center gap-3">
          {/* Google */}
          <button
            disabled={loading}
            onClick={handleGoogle}
            className="w-10 h-10 cursor-pointer py-2 border rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img src={Google} alt="google" className="w-5 h-5" />
          </button>

          {/* Github */}
          <button
            disabled={loading}
            onClick={handleGithub}
            className="w-10 h-10 cursor-pointer  py-2 border rounded-full flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            <img src={Github} alt="github" className="w-5 h-5" />
          </button>
        </div>
        {/* Toggle Login/Register */}
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
