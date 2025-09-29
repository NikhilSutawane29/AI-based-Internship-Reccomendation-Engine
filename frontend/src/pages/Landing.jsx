import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  AcademicCapIcon, 
  BuildingOfficeIcon, 
  ChartBarIcon, 
  UserGroupIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Landing = () => {
  const { currentUser } = useAuth();

  const stats = [
    { label: 'Active Internships', value: '2,500+' },
    { label: 'Government Departments', value: '150+' },
    { label: 'Successful Placements', value: '10,000+' },
    { label: 'Partner Universities', value: '500+' }
  ];

  const features = [
    {
      icon: AcademicCapIcon,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match your skills with the most suitable government internship opportunities.'
    },
    {
      icon: BuildingOfficeIcon,
      title: 'Government Partnerships',
      description: 'Direct access to internships across all major ministries and government departments.'
    },
    {
      icon: ChartBarIcon,
      title: 'Career Analytics',
      description: 'Track your application progress and get insights to improve your profile.'
    },
    {
      icon: UserGroupIcon,
      title: 'Mentorship Support',
      description: 'Connect with experienced professionals and get guidance throughout your internship journey.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-4 rounded-full shadow-lg">
                <div className="h-20 w-20 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">🇮🇳</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              PM Internship Scheme
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Empowering India's Youth Through AI-Driven Government Internship Opportunities
            </p>
            <p className="text-lg text-blue-200 mb-12 max-w-4xl mx-auto">
              Join the nation's largest internship program connecting talented individuals with meaningful 
              opportunities across government ministries and departments. Our intelligent recommendation 
              engine ensures the perfect match for your skills and aspirations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={currentUser ? "/recommendations" : "/signup"}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-900 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                Get Started Today
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              {!currentUser && (
                <Link
                  to="/login"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-900 transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose PM Internship Scheme?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of government internships with our comprehensive platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to your dream government internship
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create Your Profile
              </h3>
              <p className="text-gray-600">
                Fill in your educational background, skills, and career preferences to build a comprehensive profile.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get AI Recommendations
              </h3>
              <p className="text-gray-600">
                Our intelligent system analyzes your profile and matches you with the most suitable internship opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Apply & Start Journey
              </h3>
              <p className="text-gray-600">
                Apply directly through our platform and begin your meaningful contribution to nation-building.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Shape India's Future?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have kickstarted their careers through government internships.
          </p>
          <Link
            to={currentUser ? "/profile" : "/signup"}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-900 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-lg"
          >
            Start Your Application
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PM Internship Scheme</h3>
              <p className="text-gray-400">
                A flagship initiative by the Government of India to provide meaningful internship opportunities to the nation's youth.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About the Scheme</a></li>
                <li><a href="#" className="hover:text-white">Eligibility Criteria</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Contact Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Government Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Ministry of Education</a></li>
                <li><a href="#" className="hover:text-white">Digital India</a></li>
                <li><a href="#" className="hover:text-white">Skill India</a></li>
                <li><a href="#" className="hover:text-white">MyGov Portal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Government of India. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;