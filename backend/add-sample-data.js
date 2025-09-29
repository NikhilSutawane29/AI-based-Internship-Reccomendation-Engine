const db = require('./config/database');

const sampleInternships = [
  // AI/ML & Data Science
  {
    title: 'AI/ML Engineering Intern',
    company: 'Google',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Python, TensorFlow, Machine Learning, Data Analysis',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '6 months',
    stipend: 80000,
    description: 'Work on cutting-edge AI models and machine learning algorithms'
  },
  {
    title: 'Data Science Intern',
    company: 'Microsoft',
    location: 'Hyderabad',
    area_of_interest: 'IT',
    required_skills: 'Python, R, SQL, Machine Learning, Statistics',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '5 months',
    stipend: 75000,
    description: 'Analyze large datasets and build predictive models'
  },
  {
    title: 'GenAI Research Intern',
    company: 'OpenAI',
    location: 'Delhi',
    area_of_interest: 'IT',
    required_skills: 'Python, PyTorch, NLP, Deep Learning',
    required_education: 'Graduate',
    experience_level: 'advanced',
    duration: '6 months',
    stipend: 90000,
    description: 'Research and develop generative AI models and applications'
  },
  // Cloud & DevOps
  {
    title: 'Cloud Engineering Intern',
    company: 'Amazon',
    location: 'Mumbai',
    area_of_interest: 'IT',
    required_skills: 'AWS, Docker, Kubernetes, Python',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '4 months',
    stipend: 70000,
    description: 'Build and maintain cloud infrastructure on AWS'
  },
  {
    title: 'DevOps Intern',
    company: 'Netflix',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Docker, Kubernetes, CI/CD, Linux',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '5 months',
    stipend: 65000,
    description: 'Automate deployment pipelines and manage containerized applications'
  },
  // Cybersecurity
  {
    title: 'Cybersecurity Analyst Intern',
    company: 'Palo Alto Networks',
    location: 'Pune',
    area_of_interest: 'IT',
    required_skills: 'Cyber Security, Network Security, Python',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '4 months',
    stipend: 60000,
    description: 'Monitor security threats and implement protection measures'
  },
  // Blockchain & Web3
  {
    title: 'Blockchain Developer Intern',
    company: 'Coinbase',
    location: 'Delhi',
    area_of_interest: 'IT',
    required_skills: 'Solidity, Blockchain, Web3, JavaScript',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '6 months',
    stipend: 55000,
    description: 'Develop smart contracts and decentralized applications'
  },
  // Mobile Development
  {
    title: 'iOS Developer Intern',
    company: 'Apple',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Swift, iOS Development, Xcode',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '4 months',
    stipend: 70000,
    description: 'Build native iOS applications using Swift and SwiftUI'
  },
  {
    title: 'Android Developer Intern',
    company: 'Samsung',
    location: 'Noida',
    area_of_interest: 'IT',
    required_skills: 'Kotlin, Android Development, Java',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '5 months',
    stipend: 50000,
    description: 'Develop Android applications using Kotlin and Jetpack Compose'
  },
  // Product & Design
  {
    title: 'Product Management Intern',
    company: 'Meta',
    location: 'Mumbai',
    area_of_interest: 'IT',
    required_skills: 'Product Management, Data Analysis, Communication',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '6 months',
    stipend: 65000,
    description: 'Define product roadmaps and work with engineering teams'
  },
  {
    title: 'UX/UI Design Intern',
    company: 'Adobe',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Figma, UI/UX Design, Prototyping',
    required_education: 'Graduate',
    experience_level: 'beginner',
    duration: '4 months',
    stipend: 45000,
    description: 'Design user interfaces and improve user experience'
  },
  // Fintech
  {
    title: 'Fintech Developer Intern',
    company: 'Paytm',
    location: 'Noida',
    area_of_interest: 'Finance',
    required_skills: 'Java, Spring Boot, Microservices, SQL',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '5 months',
    stipend: 40000,
    description: 'Build payment systems and financial applications'
  },
  {
    title: 'Quantitative Analyst Intern',
    company: 'Goldman Sachs',
    location: 'Mumbai',
    area_of_interest: 'Finance',
    required_skills: 'Python, Statistics, Finance, Mathematics',
    required_education: 'Graduate',
    experience_level: 'advanced',
    duration: '6 months',
    stipend: 85000,
    description: 'Develop quantitative models for trading and risk management'
  },
  // E-commerce
  {
    title: 'Software Engineer Intern',
    company: 'Flipkart',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Java, Spring Boot, React, MySQL',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '6 months',
    stipend: 50000,
    description: 'Build scalable e-commerce platform features'
  },
  {
    title: 'Full Stack Developer Intern',
    company: 'Zomato',
    location: 'Gurgaon',
    area_of_interest: 'IT',
    required_skills: 'React, Node.js, MongoDB, JavaScript',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '4 months',
    stipend: 45000,
    description: 'Develop end-to-end web applications for food delivery platform'
  },
  // Consulting & Analytics
  {
    title: 'Business Analyst Intern',
    company: 'McKinsey & Company',
    location: 'Delhi',
    area_of_interest: 'Finance',
    required_skills: 'Data Analysis, Excel, PowerPoint, Communication',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '3 months',
    stipend: 60000,
    description: 'Analyze business problems and develop strategic solutions'
  },
  {
    title: 'Data Analytics Intern',
    company: 'Deloitte',
    location: 'Mumbai',
    area_of_interest: 'IT',
    required_skills: 'Python, Tableau, SQL, Statistics',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '4 months',
    stipend: 35000,
    description: 'Create data visualizations and business intelligence reports'
  },
  // Automotive & IoT
  {
    title: 'Autonomous Vehicle Intern',
    company: 'Tesla',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Python, Computer Vision, Machine Learning, C++',
    required_education: 'Graduate',
    experience_level: 'advanced',
    duration: '6 months',
    stipend: 75000,
    description: 'Work on self-driving car algorithms and computer vision systems'
  },
  {
    title: 'IoT Developer Intern',
    company: 'Bosch',
    location: 'Chennai',
    area_of_interest: 'IT',
    required_skills: 'C++, IoT, Embedded Systems, Arduino',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '5 months',
    stipend: 35000,
    description: 'Develop IoT solutions for smart devices and industrial applications'
  },
  // Gaming & AR/VR
  {
    title: 'Game Developer Intern',
    company: 'Unity Technologies',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Unity, C#, Game Development, 3D Modeling',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '4 months',
    stipend: 40000,
    description: 'Create immersive gaming experiences using Unity engine'
  },
  {
    title: 'AR/VR Developer Intern',
    company: 'Meta',
    location: 'Hyderabad',
    area_of_interest: 'IT',
    required_skills: 'Unity, Unreal Engine, C#, 3D Graphics',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '5 months',
    stipend: 55000,
    description: 'Build virtual and augmented reality applications'
  },
  // Startups
  {
    title: 'Growth Hacker Intern',
    company: 'Razorpay',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Digital Marketing, Analytics, Python, SQL',
    required_education: 'Graduate',
    experience_level: 'beginner',
    duration: '4 months',
    stipend: 30000,
    description: 'Drive user acquisition and engagement through data-driven strategies'
  },
  {
    title: 'Backend Engineer Intern',
    company: 'Swiggy',
    location: 'Bangalore',
    area_of_interest: 'IT',
    required_skills: 'Java, Spring Boot, Redis, Kafka',
    required_education: 'Graduate',
    experience_level: 'intermediate',
    duration: '6 months',
    stipend: 45000,
    description: 'Build robust backend systems for food delivery platform'
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