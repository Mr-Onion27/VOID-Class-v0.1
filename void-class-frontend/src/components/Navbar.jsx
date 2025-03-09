import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Correct import

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="text-lg font-bold">Void Class</Link>
      </div>
      <div className="flex space-x-4">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            {user.role === "teacher" && <Link to="/reservations">Reservations</Link>}
            {user.role === "admin" && <Link to="/dashboard">Admin Panel</Link>}
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
