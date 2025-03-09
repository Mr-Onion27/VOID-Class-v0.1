import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mt-4">Oops! The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Go Home
      </Link>
    </div>
  );
}
