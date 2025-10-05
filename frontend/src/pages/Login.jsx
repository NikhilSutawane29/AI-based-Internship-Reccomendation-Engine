import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      return setError('Please fill in all fields');
    }

    try {
      setLoading(true);
      const response = await login(email, password);
      
      // Check if admin login
      if (email === 'futureforge@sih.com') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-md w-full">
        <div className="glass p-8 rounded-2xl shadow-2xl animate-fade-in">
          <div className="text-center mb-8">
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold gradient-text">Welcome Back!</h2>
            <p className="mt-3 text-gray-600">
              Or{' '}
              <Link to="/signup" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                create a new account
              </Link>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 animate-slide-up" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">
                  📧 Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  🔒 Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-modern w-full py-3 px-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '🔄 Signing in...' : '✨ Sign in'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;