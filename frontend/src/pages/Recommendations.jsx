import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRecommendations } from '../utils/mockData';
import InternshipRecommendationModel from '../utils/aiModel';

const RecommendationCard = ({ internship, userSkills = [] }) => {
  const { title, sector, location, description, skills, stipend, duration, matchPercentage, confidence, rank } = internship;
  
  const getSkillMatchStatus = (skill) => {
    const userSkillsLower = userSkills.map(s => s.toLowerCase().trim());
    const skillLower = skill.toLowerCase().trim();
    return userSkillsLower.some(userSkill => 
      userSkill.includes(skillLower) || skillLower.includes(userSkill)
    );
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence === 'High') return 'bg-green-50 text-green-700 border-green-200';
    if (confidence === 'Medium') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          <div className="flex flex-col items-end gap-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMatchColor(matchPercentage)}`}>
              {Math.round(matchPercentage)}% Match
            </span>
            {confidence && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getConfidenceColor(confidence)}`}>
                {confidence} Confidence
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2h-.5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5H6v-1h8v1h1.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H15z" clipRule="evenodd" />
          </svg>
          {sector}
        </div>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location}
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        {stipend && (
          <div className="mt-2 text-sm font-medium text-green-600">
            {stipend} • {duration}
          </div>
        )}
        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {(skills || []).slice(0, 5).map((skill, index) => {
              const isMatched = getSkillMatchStatus(skill);
              return (
                <span 
                  key={index} 
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    isMatched 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {isMatched && '✓ '}{skill}
                </span>
              );
            })}
            {(skills || []).length > 5 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                +{skills.length - 5} more
              </span>
            )}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            User Skills: {userSkills.join(', ') || 'None'}
          </div>
        </div>
        <div className="mt-4">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const aiModel = new InternshipRecommendationModel();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchRecommendations = async () => {
      try {
        // Try backend AI recommendations first
        const response = await fetch('http://localhost:5000/api/internships/recommendations', {
          headers: getAuthHeaders()
        });
        
        if (response.ok) {
          const data = await response.json();
          setRecommendations(data);
        } else {
          throw new Error('Backend API failed');
        }
      } catch (err) {
        console.log('Using frontend AI model for recommendations');
        
        // Get user profile from localStorage and currentUser
        const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const userProfile = {
          skills: currentUser.skills ? currentUser.skills.split(',').map(s => s.trim()) : (savedProfile.skills || []),
          interests: savedProfile.interests || (currentUser.sector ? [currentUser.sector] : []),
          location: currentUser.location || savedProfile.location || '',
          education: currentUser.education || savedProfile.education || '',
          experience_level: savedProfile.experience_level || 'beginner'
        };
        
        console.log('User Profile for AI:', userProfile);
        console.log('Current User:', currentUser);
        console.log('Saved Profile:', savedProfile);
        
        // Get internships and use AI model
        const internshipsResponse = await fetch('http://localhost:5000/api/internships');
        if (internshipsResponse.ok) {
          const internships = await internshipsResponse.json();
          console.log('Internships from API:', internships);
          const aiRecommendations = aiModel.getRecommendations(internships, userProfile);
          console.log('AI Recommendations:', aiRecommendations);
          setRecommendations(aiRecommendations);
        } else {
          // Final fallback to mock data
          const mockRecommendations = getRecommendations(userProfile);
          setRecommendations(mockRecommendations);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="text-lg text-gray-500">Loading recommendations...</div>
        </div>
      </div>
    );
  }



  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-b border-gray-200 pb-5">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">AI-Powered Internship Recommendations</h2>
          <p className="mt-2 max-w-4xl text-sm text-gray-500">
            Our AI model analyzed your profile and found these personalized internship matches based on skills, experience, and preferences.
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations found</h3>
            <p className="mt-1 text-sm text-gray-500">Try updating your profile with more skills and interests.</p>
            <div className="mt-6">
              <Link
                to="/profile"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((internship) => {
              const userSkills = currentUser.skills ? currentUser.skills.split(',').map(s => s.trim()) : [];
              return (
                <RecommendationCard key={internship.id} internship={internship} userSkills={userSkills} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;