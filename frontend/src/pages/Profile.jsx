import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PREDEFINED_SKILLS = [
  "React", "JavaScript", "Python", "Java", "SQL", "HTML", "CSS", "Node.js", "Angular", "Vue.js", "C++", "C#", "Go", "Ruby", "PHP", "TypeScript", "Docker", "Kubernetes", "AWS", "Azure", "Google Cloud Platform", "MongoDB", "PostgreSQL", "Git", "TensorFlow", "PyTorch", "Swift", "Kotlin", "Spring Boot", "Django", "Flask",'Development', 'Computer Skills', 'Communication', 'Data Analysis', 'Project Management',
  'Problem Solving', 'Teaching', 'Research', 'Leadership', 'Teamwork',
  'Microsoft Office', 'Programming', 'Web Development', 'Digital Marketing',
  'Content Writing', 'Social Media', 'Customer Service', 'Sales',
  'Accounting', 'Finance', 'Data Entry', 'Graphic Design', 'Photography',
  'Video Editing', 'Public Speaking', 'Event Management', 'Time Management',
  'Critical Thinking', 'Creativity', 'Adaptability', 'First Aid',
  'Basic Medical Knowledge', 'Farming', 'Field Work', 'Training',
  'Cyber Security', 'Technical Skills', 'Hindi', 'English',
  'Environmental Science', 'Social Work', 'Coordination'
];

const Profile = () => {
  const { currentUser, getAuthHeaders } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    education: '',
    skills: [],
    interests: [],
    location: '',
    otherEducation: '',
    otherLocation: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const educationOptions = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD',
    'Other'
  ];

  const locationOptions = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Baroda',
    'Other'
  ];

  const interestOptions = [
    { id: 'tech', label: 'Technology', icon: '💻' },
    { id: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { id: 'finance', label: 'Finance', icon: '💰' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'government', label: 'Government', icon: '🏛️' },
    { id: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { id: 'manufacturing', label: 'Manufacturing', icon: '🏭' },
    { id: 'retail', label: 'Retail', icon: '🛒' }
  ];

  const handleEducationChange = (e) => {
    setFormData({ ...formData, education: e.target.value, otherEducation: e.target.value === 'Other' ? formData.otherEducation : '' });
  };
  
  const handleOtherEducationChange = (e) => {
    setFormData({ ...formData, otherEducation: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFormData({ ...formData, location: e.target.value, otherLocation: e.target.value === 'Other' ? formData.otherLocation : '' });
  };
  
  const handleOtherLocationChange = (e) => {
    setFormData({ ...formData, otherLocation: e.target.value });
  };

  const handleInterestChange = (interestId) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interestId)
        ? formData.interests.filter(id => id !== interestId)
        : [...formData.interests, interestId]
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleSkillToggle = (skill) => {
    const updatedSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.education) {
      return setError('Please select your education level');
    }
    
    if (formData.education === 'Other' && !formData.otherEducation) {
      return setError('Please specify your education');
    }

    if (formData.skills.length === 0) {
      return setError('Please add at least one skill');
    }

    if (formData.interests.length === 0) {
      return setError('Please select at least one sector interest');
    }

    if (!formData.location) {
      return setError('Please select your location preference');
    }
    
    if (formData.location === 'Other' && !formData.otherLocation) {
      return setError('Please specify your location');
    }

    try {
      setLoading(true);
      
      // Prepare profile data
      const profileData = {
        education: formData.education === 'Other' ? formData.otherEducation : formData.education,
        skills: formData.skills.join(', '),
        area_of_interest: formData.interests.join(', '),
        location_preference: formData.location === 'Other' ? formData.otherLocation : formData.location,
        experience_level: 'beginner'
      };
      
      // Save to database
      const response = await fetch('http://localhost:3001/api/users/profile', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(profileData)
      });
      
      if (response.ok) {
        // Also save to localStorage for frontend AI
        localStorage.setItem('userProfile', JSON.stringify(formData));
        navigate('/recommendations');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Complete your profile to get personalized internship recommendations.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mx-4 mb-4 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Education */}
            <div className="sm:col-span-3">
              <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                Education
              </label>
              <div className="mt-1">
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleEducationChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select your highest education</option>
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {formData.education === 'Other' && (
                <div className="mt-2">
                  <input
                    type="text"
                    id="otherEducation"
                    name="otherEducation"
                    value={formData.otherEducation}
                    onChange={handleOtherEducationChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2"
                    placeholder="Please specify your education"
                    required
                  />
                </div>
              )}
            </div>

            {/* Location */}
            <div className="sm:col-span-3">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location Preference
              </label>
              <div className="mt-1">
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Select your preferred location</option>
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {formData.location === 'Other' && (
                <div className="mt-2">
                  <input
                    type="text"
                    id="otherLocation"
                    name="otherLocation"
                    value={formData.otherLocation}
                    onChange={handleOtherLocationChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md px-3 py-2"
                    placeholder="Please specify your location"
                    required
                  />
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              
              {/* Predefined Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Select from common skills:</h4>
                <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {PREDEFINED_SKILLS.slice(0, showAllSkills ? PREDEFINED_SKILLS.length : 12).map((skill) => (
                      <label key={skill} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.skills.includes(skill)}
                          onChange={() => handleSkillToggle(skill)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllSkills(!showAllSkills)}
                    className="mt-2 text-blue-600 hover:text-blue-500 text-sm font-medium"
                  >
                    {showAllSkills ? 'Show Less' : `Show All (${PREDEFINED_SKILLS.length} skills)`}
                  </button>
                </div>
              </div>

              {/* Custom Skill Input */}
              <div className="mb-2">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Add custom skill:</h4>
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="skills"
                    id="skills"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillKeyDown}
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Add a custom skill"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="ml-3 inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Selected Skills Display */}
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex rounded-full items-center py-0.5 pl-2.5 pr-1 text-sm font-medium bg-blue-100 text-blue-700"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                    >
                      <span className="sr-only">Remove {skill}</span>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Sector Interests */}
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sector Interests
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {interestOptions.map((interest) => (
                  <div key={interest.id} className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`interest-${interest.id}`}
                        name={`interest-${interest.id}`}
                        type="checkbox"
                        checked={formData.interests.includes(interest.id)}
                        onChange={() => handleInterestChange(interest.id)}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`interest-${interest.id}`} className="font-medium text-gray-700">
                        {interest.icon} {interest.label}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {loading ? 'Saving...' : 'Save and Continue'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;