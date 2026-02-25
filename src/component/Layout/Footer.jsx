import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto flex justify-center px-2 py-1 text-center md:flex-row flex-col ">
      <p>© {new Date().getFullYear()} Fire Auth. All rights reserved. </p>
      <Link to="https://www.github.com/pavel-dev-bd" target="_blank" className="text-blue-400 hover:underline">Md Pavel Miah</Link>
      </div>
    </footer>
  );
}