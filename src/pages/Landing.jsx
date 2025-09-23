import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PM Internship Scheme</h1>
          <h2 className="text-2xl font-semibold text-blue-600 mb-6">AI-Based Recommendation Engine</h2>
          <p className="text-gray-600 mb-8">
            Find the perfect internship opportunity tailored to your skills, education, and interests.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          {currentUser ? (
            <div className="space-y-4">
              <Link
                to="/profile"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Complete Your Profile
              </Link>
              <Link
                to="/recommendations"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Recommendations
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            A Government initiative to connect talented individuals with meaningful internship opportunities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;