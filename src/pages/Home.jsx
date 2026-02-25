import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserAvater from '../assets/avatar/user.svg';
export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // =========================
  // USER NOT LOGGED IN
  // =========================
  if (!user) {
    return (
      <div className="h-full  bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to Fire Auth 🚀
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Build, manage and grow your projects with a modern dashboard
            experience.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:scale-105 transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 border border-white rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // USER LOGGED IN
  // =========================
  return (
    <div className="  bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Welcome back, {user.displayName || user.email?.split("@")[0]} 👋
            </h1>
            <p className="mt-2 opacity-90">
              Here's your personalized dashboard overview.
            </p>
          </div>

          <img
            src={user.photoURL || UserAvater}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-white mt-4 md:mt-0 shadow-lg"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-gray-500 text-sm">Projects</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">12</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-gray-500 text-sm">Messages</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">8</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-gray-500 text-sm">Tasks</h3>
            <p className="text-3xl font-bold text-pink-600 mt-2">24</p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 bg-white p-8 rounded-3xl shadow-lg flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            View Profile
          </button>

          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}