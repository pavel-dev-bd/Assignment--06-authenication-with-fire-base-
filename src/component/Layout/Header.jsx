import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import UserAvater from '../../assets/avatar/user.svg';
export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkStyle =
    "px-3 py-2 rounded-lg transition hover:bg-white/20";

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Fire Auth
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navLinkStyle} ${isActive ? "bg-white/30" : ""}`
            }
          >
            Home
          </NavLink>

          {user && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${navLinkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              Profile
            </NavLink>
          )}

          {!user ? (<>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${navLinkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `${navLinkStyle} ${isActive ? "bg-white/30" : ""}`
              }
            >
              Register
            </NavLink>
          </>) : (
            <>
              {/* Avatar */}
              <img
                src={user.photoURL || UserAvater}
                alt="avatar"
                className="w-9 h-9 rounded-full border-2 border-white"
              />

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 pb-4 space-y-2">
          <Link to="/" className="block py-2">Home</Link>

          {user && (
            <Link to="/profile" className="block py-2">
              Profile
            </Link>
          )}

          {!user ? (
            <>
            <Link to="/login" className="block py-2">
              Login
            </Link>
            <Link to="/register" className="block py-2">
              Register
            </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className=" block py-2 text-left w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}