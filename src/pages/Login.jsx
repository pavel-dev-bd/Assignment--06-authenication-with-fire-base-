import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Google from "../assets/authLogo/google.svg";
import Github from "../assets/authLogo/github.svg";
import { toast } from "react-toastify";

export default function Login() {
  const { loading, login, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();
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
    if ( password.trim() === "") {
      toast.error("Password is required for Login");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
        await login( email, password);
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
    <div className="h-full  flex items-center justify-center  bg-indigo-600">
      <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
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
            {/* 👁 Show Password Button */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          {/* Submit Button */}
          <button type="submit"
            disabled={loading}
            className="w-full cursor-pointer py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {loading
              ? "Loading...": "Login"}
          </button>
        </form>
          

        {/* Divider */}
        <div className="my-4 text-center text-gray-500">OR</div>

        {/* Google */}
        <button
          disabled={loading}
          onClick={handleGoogle}
          className="w-full cursor-pointer py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src={Google} alt="google" className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Github */}
        <button
          disabled={loading}
          onClick={handleGithub}
          className="w-full cursor-pointer mt-4 py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img src={Github} alt="github" className="w-5 h-5" />
          Continue with Github
        </button>

        {/* Toggle Login/Register */}
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