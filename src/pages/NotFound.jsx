import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-full  flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-7xl font-bold text-indigo-600">404</h1>
      <p className="text-xl mt-4 mb-6">Page Not Found 😢</p>

      <Link
        to="/"
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}