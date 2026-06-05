import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import api from '../services/api';

export default function Navbar() {
  const { token, refreshToken, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.delete('/authentications', { data: { refreshToken } });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white border-b border-strawberry-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-matcha-600">
              Forum <span className="text-strawberry-500">SAINTEK</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {token && user ? (
              <>
                <span className="text-gray-700 font-medium">Hello, {user.username || user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-strawberry-500 hover:bg-strawberry-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-matcha-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-matcha-600 hover:bg-matcha-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
