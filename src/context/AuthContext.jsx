import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("fireAuthUser")) || null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // 🔹 Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      toast.success("Login Successfully 🎉");
      return res;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Register
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Set display name
      await updateProfile(res.user, {
        displayName: name,
      });

      setUser({ ...res.user, displayName: name });
      toast.success("Account Created Successfully 🎉");
      return res;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Google Login
  const googleLogin = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      setUser(res.user);
      toast.success("Login Successfully 🎉");
      return res;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 GitHub Login
  const githubLogin = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, githubProvider);
      setUser(res.user);
      toast.success("Login Successfully 🎉");
      return res;
    } catch (error) {
      handleAuthError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged Out Successfully 👋");
    } catch (error) {
      handleAuthError(error);
    }
  };

  // 🔹 Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      localStorage.setItem("fireAuthUser", JSON.stringify(currentUser));
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Centralized Error Handler
  const handleAuthError = (error) => {
    console.error("Auth Error:", error);

    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("Email already in use");
        break;
      case "auth/invalid-email":
        toast.error("Invalid email address");
        break;
      case "auth/user-not-found":
        toast.error("User not found");
        break;
      case "auth/wrong-password":
        toast.error("Wrong password");
        break;
      case "auth/weak-password":
        toast.error("Password should be at least 6 characters");
        break;
      case "auth/popup-closed-by-user":
        toast.error("Popup closed before completing sign in");
        break;
      default:
        toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        googleLogin,
        githubLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);