import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  
} from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // const navigator = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
   
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const login = (email, password) => {
    setLoading(true); 
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      toast.success("Login Successfully 🎉" );
      setUser(userCredential.user);
    })
    .catch((error) => {
      setLoading(false);
      toast.error(error.message); 
    }).finally(() => {
      setLoading(false);
    });
  };

  const register = (name,email, password) => {
     setLoading(true);
     createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user.updateProfile({ displayName: name });
    }).then(() => {
      toast.success("Account Created Successfully 🎉");
    }).then(() => {
      setUser(auth.currentUser);
    }).catch((error) => {
      setLoading(false);
      toast.error(error.message); 
    }).finally(() => {
      setLoading(false);
    });
  };

  const googleLogin = () => 
    signInWithPopup(auth, googleProvider).then(() => {
      toast.success("Account Created Successfully 🎉");
    }).then(() => {
      setUser(auth.currentUser);
    }).catch((error) => {
      setLoading(false);
      toast.error(error.message); 
    }).finally(() => {
      setLoading(false);
    });;

  const githubLogin = () => signInWithPopup(auth, githubProvider).then(() => {
      toast.success("Account Created Successfully 🎉");
    }).then(() => {
      setUser(auth.currentUser);
    }).catch((error) => {
      setLoading(false);
      toast.error(error.message); 
    }).finally(() => {
      setLoading(false);
    });;

  const logout = () => signOut(auth).then(() => {
     setUser(null);
  }).catch((error) => {
    console.error("Logout Error:", error);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, googleLogin, githubLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);