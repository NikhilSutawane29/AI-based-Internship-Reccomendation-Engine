const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection for government internships
const govDbConfig = {
  host: 'localhost',
  user: 'root',
  password: '2005',
  database: 'project2hackathon_db'
};

// User authentication
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey123456789';

// AI Recommendation Algorithm
class AIRecommender {
  calculateSkillMatch(userSkills, requiredSkills) {
    if (!userSkills || !requiredSkills) return 0;
    
    const userSkillsArray = userSkills.toLowerCase().split(',').map(s => s.trim());
    const requiredSkillsArray = requiredSkills.toLowerCase().split(',').map(s => s.trim());
    
    let matches = 0;
    for (const userSkill of userSkillsArray) {
      for (const reqSkill of requiredSkillsArray) {
        if (userSkill.includes(reqSkill) || reqSkill.includes(userSkill)) {
          matches++;
          break;
        }
      }
    }
    
    return (matches / Math.max(userSkillsArray.length, requiredSkillsArray.length)) * 100;
  }

  calculateLocationMatch(userLocation, internshipLocation, internshipState) {
    if (!userLocation) return 50;
    
    const userLoc = userLocation.toLowerCase();
    const intLoc = internshipLocation?.toLowerCase() || '';
    const intState = internshipState?.toLowerCase() || '';
    
    if (userLoc === intLoc || userLoc === intState) return 100;
    if (intLoc.includes(userLoc) || intState.includes(userLoc)) return 80;
    return 30;
  }

  calculateRecommendationScore(internship, userProfile) {
    const skillScore = this.calculateSkillMatch(userProfile.skills, internship.skills_required);
    const locationScore = this.calculateLocationMatch(userProfile.location_preference, internship.location, internship.state);
    const sectorMatch = userProfile.sector_preference === internship.sector ? 100 : 20;
    const educationMatch = userProfile.education === internship.required_education ? 100 : 50;

    // Weighted average
    return Math.round(
      (skillScore * 0.5) + 
      (locationScore * 0.25) + 
      (sectorMatch * 0.15) + 
      (educationMatch * 0.1)
    );
  }
}

const aiRecommender = new AIRecommender();

// User registration
app.post('/api/users/register', async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    const { name, email, password, education, skills, sector, location } = req.body;
    
    const connection = await mysql.createConnection(govDbConfig);
    
    // Check if user exists
    const [existing] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user (only include existing columns)
    console.log('Inserting user with values:', [name, email, 'HASHED_PASSWORD', education || null, skills || null, sector || null, location || null]);
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password, education, skills, area_of_interest, location_preference) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, education || null, skills || null, sector || null, location || null]
    );
    
    // Get user data
    const [users] = await connection.execute('SELECT id, name, email, education, skills, area_of_interest as sector, location_preference as location FROM users WHERE id = ?', [result.insertId]);
    await connection.end();
    
    const token = jwt.sign({ userId: users[0].id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: users[0]
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User login
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const connection = await mysql.createConnection(govDbConfig);
    const [users] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    await connection.end();
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        education: user.education,
        skills: user.skills,
        sector: user.area_of_interest,
        location: user.location_preference
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get AI-powered recommendations (protected route)
app.get('/api/internships/recommendations', authenticateToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(govDbConfig);
    
    // Get user profile
    const [users] = await connection.execute('SELECT * FROM users WHERE id = ?', [req.user.userId]);
    if (users.length === 0) {
      await connection.end();
      return res.status(404).json({ message: 'User not found' });
    }
    
    const userProfile = users[0];
    
    // Get all internships
    const [internships] = await connection.execute('SELECT * FROM internships');
    await connection.end();

    const recommendations = internships.map(internship => {
      const matchScore = aiRecommender.calculateRecommendationScore(internship, userProfile);
      return {
        id: internship.id,
        title: internship.title,
        sector: internship.sector,
        location: internship.location,
        description: internship.description,
        skills: internship.skills_required ? internship.skills_required.split(',') : [],
        stipend: `₹${internship.stipend}/month`,
        duration: internship.duration,
        matchPercentage: matchScore,
        confidence: matchScore > 70 ? 'High' : matchScore > 50 ? 'Medium' : 'Low',
        organization: internship.organization,
        apply_link: internship.apply_link,
        last_date: internship.last_date
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(recommendations);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Get all internships
app.get('/api/internships', async (req, res) => {
  try {
    const connection = await mysql.createConnection(govDbConfig);
    const [internships] = await connection.execute('SELECT * FROM internships');
    await connection.end();
    
    res.json(internships);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch internships' });
  }
});

// Admin routes
app.get('/api/admin/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection(govDbConfig);
    const [users] = await connection.execute('SELECT id, name, email, education, skills, area_of_interest as sector_preference, location_preference, created_at FROM users ORDER BY created_at DESC');
    await connection.end();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/admin/applications', async (req, res) => {
  try {
    const connection = await mysql.createConnection(govDbConfig);
    const [applications] = await connection.execute(`
      SELECT a.id, a.status, a.applied_at, u.name as user_name, i.title as internship_title 
      FROM applications a 
      JOIN users u ON a.user_id = u.id 
      JOIN internships i ON a.internship_id = i.id 
      ORDER BY a.applied_at DESC
    `);
    await connection.end();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Update user profile
app.put('/api/users/profile', authenticateToken, async (req, res) => {
  try {
    const { education, skills, sector_preference, location_preference } = req.body;
    const connection = await mysql.createConnection(govDbConfig);
    
    await connection.execute(
      'UPDATE users SET education = ?, skills = ?, area_of_interest = ?, location_preference = ? WHERE id = ?',
      [education, skills, sector_preference, location_preference, req.user.userId]
    );
    
    const [users] = await connection.execute('SELECT id, name, email, education, skills, area_of_interest as sector_preference, location_preference FROM users WHERE id = ?', [req.user.userId]);
    await connection.end();
    
    res.json({ message: 'Profile updated successfully', user: users[0] });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'PM Internship AI Recommender API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Hybrid AI Server running on port ${PORT}`);
  console.log(`🔗 API: http://localhost:${PORT}`);
});