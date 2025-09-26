import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PM Internship Recommendation Engine</h1>
          <p className="text-gray-600 mb-8">
            The PM Internship Scheme connects talented individuals with government internship opportunities. 
            Our AI-powered recommendation engine matches your profile with the most suitable positions 
            across various ministries and departments.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <Link
              to={currentUser ? "/profile" : "/login"}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Fill Profile
            </Link>
            <Link
              to={currentUser ? "/recommendations" : "/login"}
              className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-green-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View Recommendations
            </Link>
          </div>
          
          {!currentUser && (
            <div className="pt-4 border-t border-gray-200 mt-4">
              <p className="text-sm text-gray-500 mb-4">Already have an account?</p>
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )
}</div>

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