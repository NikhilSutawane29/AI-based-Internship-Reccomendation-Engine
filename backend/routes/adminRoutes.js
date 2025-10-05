const express = require('express');
const router = express.Router();
const db = require('../config/database');

const jwt = require('jsonwebtoken');

// Admin authentication middleware
const adminAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ error: 'Admin access required' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Apply admin auth to all routes
router.use(adminAuth);

// Get all users
router.get('/users', async (req, res) => {
  try {
    console.log('Fetching users from database...');
    const [users] = await db.execute(`
      SELECT id, name, email, education, skills, location_preference, 
             sector_preference, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);
    console.log('Found users:', users.length);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

// Get all applications
router.get('/applications', async (req, res) => {
  try {
    const [applications] = await db.execute(`
      SELECT a.id, a.user_id, a.internship_id, a.status, a.applied_at,
             u.name as user_name, u.email as user_email,
             i.title as internship_title, i.company as internship_company
      FROM applications a
      JOIN users u ON a.user_id = u.id
      JOIN internships i ON a.internship_id = i.id
      ORDER BY a.applied_at DESC
    `);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Get active users (last 7 days)
router.get('/active-users', async (req, res) => {
  try {
    const [activeUsers] = await db.execute(`
      SELECT u.id, u.name, u.email, u.skills, u.location_preference, 
             u.last_login, COUNT(a.id) as application_count
      FROM users u
      LEFT JOIN applications a ON u.id = a.user_id
      WHERE u.last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
         OR u.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY u.id
      ORDER BY u.last_login DESC
    `);
    res.json(activeUsers);
  } catch (error) {
    console.error('Error fetching active users:', error);
    res.status(500).json({ error: 'Failed to fetch active users' });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [userCount] = await db.execute('SELECT COUNT(*) as count FROM users');
    const [appCount] = await db.execute('SELECT COUNT(*) as count FROM applications');
    const [internshipCount] = await db.execute('SELECT COUNT(*) as count FROM internships');
    
    res.json({
      users: userCount[0].count,
      applications: appCount[0].count,
      internships: internshipCount[0].count
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;