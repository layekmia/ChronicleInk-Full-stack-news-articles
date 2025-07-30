import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <FaLock className="text-red-500 text-6xl mx-auto" />
        <h1 className="text-4xl font-bold text-gray-800">403 - Unauthorized</h1>
        <p className="text-gray-600">
          Sorry, you don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
