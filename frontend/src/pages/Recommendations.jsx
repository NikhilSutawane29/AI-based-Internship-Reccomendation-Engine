import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRecommendations } from '../utils/mockData';
import InternshipRecommendationModel from '../utils/aiModel';

const RecommendationCard = ({ internship, userSkills = [], navigate }) => {
  const { title, sector, location, description, skills, stipend, duration, matchPercentage, confidence, rank } = internship;
  
  const getSkillMatchStatus = (skill) => {
    const userSkillsLower = userSkills.map(s => s.toLowerCase().trim());
    const skillLower = skill.toLowerCase().trim();
    return userSkillsLower.some(userSkill =>  
      userSkill.includes(skillLower) || skillLower.includes(userSkill)
    );
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
    if (percentage >= 60) return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
    return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence === 'High') return 'bg-green-50 text-green-700 border-green-200';
    if (confidence === 'Medium') return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="glass rounded-2xl shadow-xl card-hover overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{title}</h3>
          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold shadow-lg ${getMatchColor(matchPercentage)}`}>
              {Math.round(matchPercentage)}% Match
            </span>
            {confidence && (
              <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getConfidenceColor(confidence)}`}>
                {confidence} Confidence
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">🏢</span>
            <span className="font-medium">{sector}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">📍</span>
            <span>{location}</span>
          </div>
        </div>
        
        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">{description}</p>
        
        {stipend && (
          <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
            <div className="text-sm font-semibold text-green-800">
              💰 {stipend} • ⏰ {duration}
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {(skills || []).slice(0, 5).map((skill, index) => {
              const isMatched = getSkillMatchStatus(skill);
              return (
                <span 
                  key={index} 
                  className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isMatched 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                      : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  }`}
                >
                  {isMatched && '✓ '}{skill}
                </span>
              );
            })}
            {(skills || []).length > 5 && (
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800">
                +{skills.length - 5} more
              </span>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/apply', { state: { internship } })}
          className="btn-modern w-full py-3 px-4 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          ✨ Apply Now →
        </button>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-4">
            <span className="text-6xl">🤖</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text mb-4">
            AI-Powered Recommendations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI model analyzed your profile and found these personalized internship matches based on your skills, experience, and preferences.
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass p-12 rounded-3xl shadow-2xl max-w-md mx-auto">
              <div className="text-6xl mb-6">😕</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No recommendations found</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">Try updating your profile with more skills and interests to get better matches.</p>
              <Link
                to="/profile"
                className="btn-modern inline-flex items-center px-6 py-3 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                ⚙️ Update Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 animate-slide-up">
            {recommendations.map((internship) => {
              const userSkills = currentUser.skills ? currentUser.skills.split(',').map(s => s.trim()) : [];
              return (
                <RecommendationCard key={internship.id} internship={internship} userSkills={userSkills} navigate={navigate} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;