import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="glass backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-3 text-xl font-bold text-gray-800 hover:text-primary-600 transition-colors">
                <div className="h-10 w-14 rounded-lg shadow-md overflow-hidden">
                  <div className="h-full w-full flex flex-col">
                    <div className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
                    <div className="flex-1 bg-white flex items-center justify-center">
                      <div className="w-3 h-3 border border-blue-800 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-800 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-green-600 to-green-700"></div>
                  </div>
                </div>
                <span>PM Internship Portal</span>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
              <Link
                to="/"
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white/50 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white/50 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </Link>
              <Link
                to="/recommendations"
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white/50 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <span>Recommendations</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white/50 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Admin</span>
              </Link>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 ml-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-white/50 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-modern px-6 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;