const db = require('./config/database');

const sampleInternships = [
  {
    title: 'Web Development Intern',
    company: 'Tech Solutions',
    location: 'Delhi',
    area_of_interest: 'tech',
    required_skills: 'JavaScript, React, HTML, CSS',
    required_education: "Bachelor's Degree",
    experience_level: 'beginner',
    duration: '3 months',
    stipend: 15000,
    description: 'Work on modern web applications using React and Node.js'
  },
  {
    title: 'Healthcare Assistant',
    company: 'City Hospital',
    location: 'Mumbai',
    area_of_interest: 'healthcare',
    required_skills: 'First Aid, Communication, Basic Medical Knowledge',
    required_education: 'High School',
    experience_level: 'beginner',
    duration: '2 months',
    stipend: 8000,
    description: 'Assist medical staff and support patient care'
  },
  {
    title: 'Agricultural Research Intern',
    company: 'Farm Innovation Lab',
    location: 'Pune',
    area_of_interest: 'agriculture',
    required_skills: 'Farming, Research, Data Analysis',
    required_education: "Bachelor's Degree",
    experience_level: 'beginner',
    duration: '4 months',
    stipend: 12000,
    description: 'Research sustainable farming practices and crop optimization'
  },
  {
    title: 'Data Analyst Intern',
    company: 'Analytics Corp',
    location: 'Bangalore',
    area_of_interest: 'tech',
    required_skills: 'Python, SQL, Data Analysis, Excel',
    required_education: "Bachelor's Degree",
    experience_level: 'beginner',
    duration: '6 months',
    stipend: 20000,
    description: 'Analyze business data and create insights using Python and SQL'
  },
  {
    title: 'Finance Intern',
    company: 'Investment Bank',
    location: 'Mumbai',
    area_of_interest: 'finance',
    required_skills: 'Accounting, Finance, Excel, Communication',
    required_education: "Bachelor's Degree",
    experience_level: 'beginner',
    duration: '3 months',
    stipend: 18000,
    description: 'Support financial analysis and investment research'
  }
];

async function insertSampleData() {
  try {
    for (const internship of sampleInternships) {
      const { title, company, location, area_of_interest, required_skills, required_education, experience_level, duration, stipend, description } = internship;
      
      await db.execute(
        'INSERT INTO internships (title, company, location, area_of_interest, required_skills, required_education, experience_level, duration, stipend, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, company, location, area_of_interest, required_skills, required_education, experience_level, duration, stipend, description]
      );
    }
    console.log('Sample internships inserted successfully!');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    process.exit();
  }
}

insertSampleData();