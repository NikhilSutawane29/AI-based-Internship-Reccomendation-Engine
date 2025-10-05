import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full blur-3xl animate-bounce-slow"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center animate-fade-in">
          <div className="mb-6">
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Built for Smart India Hackathon 2025</span>
            </span>
          </div>
          <h1 className="text-5xl tracking-tight font-extrabold text-gray-900 sm:text-6xl md:text-7xl animate-slide-up">
            <span className="block gradient-text mb-2">PM Internship Scheme</span>
            <div className="flex items-center justify-center space-x-3 text-3xl sm:text-4xl md:text-5xl text-gray-700 font-medium">
              <span>Powered by AI</span>
              <svg className="w-12 h-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </h1>
          <h2 className="mt-6 text-xl font-semibold text-gray-600 sm:text-2xl max-w-4xl mx-auto leading-relaxed">
            Empowering India's Youth Through AI-Driven Government Internship Opportunities
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
            Revolutionary AI-powered platform that analyzes your skills and recommends personalized internships across Indian ministries and departments.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="btn-modern inline-flex items-center space-x-2 px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Get Started Today</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <button className="inline-flex items-center space-x-2 px-8 py-4 text-lg font-semibold rounded-xl text-gray-700 glass hover:bg-white/30 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white/80 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold gradient-text mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple steps to find your perfect government internship</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Upload Resume</h3>
              <p className="text-gray-600 leading-relaxed">Upload your resume or fill out your profile with skills and experience</p>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. AI Extracts Skills</h3>
              <p className="text-gray-600 leading-relaxed">Our AI analyzes your profile to understand your capabilities and interests</p>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Smart Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">Get personalized recommendations from government ministries and departments</p>
            </div>
            <div className="text-center group">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">4. Apply Seamlessly</h3>
              <p className="text-gray-600 leading-relaxed">Direct application links to official government internship portals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold gradient-text mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful tools to accelerate your government career</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-2xl shadow-xl card-hover">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 float">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600 leading-relaxed">Uses machine learning & NLP to match users to relevant internships</p>
            </div>
            <div className="glass p-8 rounded-2xl shadow-xl card-hover">
              <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 float">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Resume Parsing</h3>
              <p className="text-gray-600 leading-relaxed">Automatically extracts skills and experience from uploaded resumes</p>
            </div>
            <div className="glass p-8 rounded-2xl shadow-xl card-hover">
              <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 float">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Govt-Specific Roles</h3>
              <p className="text-gray-600 leading-relaxed">Focused on opportunities from government ministries/departments</p>
            </div>
            <div className="glass p-8 rounded-2xl shadow-xl card-hover">
              <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 float">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">Clean interface to view, save, and apply to matched roles</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Ready to Start Your Government Career?
            </h2>
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of students finding their perfect internship match with our AI-powered platform
          </p>
          <Link
            to="/signup"
            className="btn-modern inline-flex items-center space-x-2 px-10 py-4 text-xl font-bold rounded-2xl text-blue-600 bg-white hover:bg-gray-50 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <span>Get Started Now</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center justify-center space-x-2 text-blue-100 text-sm">
              <span>© 2025 | Built for Smart India Hackathon | Team FutureForge</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;