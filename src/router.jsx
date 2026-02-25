import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./component/Layout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAuth from "./routes/ProtectedAuth";

// 🔥 Lazy Import Pages
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 🔄 Loading Component
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },

      {
        element: <ProtectedRoute />,
        children: [{ path: "profile", element: <Profile /> }],
      },

      {
        element: <ProtectedAuth />,
        children: [{ path: "login", element: <Login /> }],
      },
      {
        element: <ProtectedAuth />,
        children: [{ path: "register", element: <Register /> }],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);
