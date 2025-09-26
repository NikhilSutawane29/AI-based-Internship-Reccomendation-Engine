// Mock data for internships
const internships = [
  {
    id: 1,
    title: 'Software Development Intern',
    sector: 'Technology',
    location: 'Bangalore',
    description: 'Join our engineering team to develop innovative solutions for government digital services. Work on real projects that impact citizens.',
    skills: ['JavaScript', 'React', 'Node.js', 'API Development'],
    duration: '3 months',
    stipend: '₹20,000 per month',
    applicationDeadline: '2023-12-15'
  },
  {
    id: 2,
    title: 'Healthcare Data Analyst',
    sector: 'Healthcare',
    location: 'Delhi',
    description: 'Analyze healthcare data to improve public health initiatives. Work with government health departments to drive data-informed decisions.',
    skills: ['Data Analysis', 'Python', 'Statistics', 'Healthcare Knowledge'],
    duration: '6 months',
    stipend: '₹25,000 per month',
    applicationDeadline: '2023-11-30'
  },
  {
    id: 3,
    title: 'Financial Policy Research Assistant',
    sector: 'Finance',
    location: 'Mumbai',
    description: 'Support research on financial inclusion policies. Help analyze the impact of government financial schemes on underserved communities.',
    skills: ['Research', 'Economics', 'Data Analysis', 'Report Writing'],
    duration: '4 months',
    stipend: '₹22,000 per month',
    applicationDeadline: '2023-12-10'
  },
  {
    id: 4,
    title: 'Education Technology Coordinator',
    sector: 'Education',
    location: 'Hyderabad',
    description: 'Assist in implementing education technology solutions in government schools. Train teachers and evaluate the effectiveness of digital learning tools.',
    skills: ['EdTech', 'Training', 'Project Management', 'Education'],
    duration: '5 months',
    stipend: '₹18,000 per month',
    applicationDeadline: '2023-11-25'
  },
  {
    id: 5,
    title: 'Agricultural Innovation Intern',
    sector: 'Agriculture',
    location: 'Pune',
    description: 'Work on innovative agricultural technology projects to support farmers. Collaborate with agricultural extension services to improve crop yields.',
    skills: ['Agriculture', 'Sustainability', 'Project Management', 'Research'],
    duration: '6 months',
    stipend: '₹21,000 per month',
    applicationDeadline: '2023-12-05'
  }
];

// Function to calculate match percentage based on user profile
export const calculateMatchPercentage = (internship, userProfile) => {
  let score = 0;
  let totalPoints = 0;

  // Match skills (50% weight)
  if (userProfile.skills && userProfile.skills.length > 0) {
    const skillMatches = internship.skills.filter(skill =>
      userProfile.skills.some(userSkill =>
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    score += (skillMatches.length / internship.skills.length) * 50;
    totalPoints += 50;
  }

  // Match sector interests (30% weight)
  if (userProfile.interests && userProfile.interests.length > 0) {
    const sectorMap = {
      'tech': 'Technology',
      'healthcare': 'Healthcare',
      'finance': 'Finance',
      'education': 'Education',
      'government': 'Government',
      'agriculture': 'Agriculture',
      'manufacturing': 'Manufacturing',
      'retail': 'Retail'
    };

    const userSectors = userProfile.interests.map(interest => sectorMap[interest]);
    if (userSectors.includes(internship.sector)) {
      score += 30;
    }
    totalPoints += 30;
  }

  // Match location (20% weight)
  if (userProfile.location && internship.location === userProfile.location) {
    score += 20;
    totalPoints += 20;
  }

  // Calculate percentage
  return totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
};

// Function to get recommendations based on user profile
export const getRecommendations = (userProfile) => {
  if (!userProfile) return [];

  return internships.map(internship => ({
    ...internship,
    matchPercentage: calculateMatchPercentage(internship, userProfile)
  })).sort((a, b) => b.matchPercentage - a.matchPercentage);
};

export default internships;