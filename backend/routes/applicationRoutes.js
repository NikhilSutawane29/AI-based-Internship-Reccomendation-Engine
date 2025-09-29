const express = require('express');
const db = require('../config/database');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { 
      user_id, 
      internship_id, 
      full_name, 
      email, 
      phone, 
      education, 
      skills, 
      resume_link, 
      cover_letter 
    } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO applications (user_id, internship_id, full_name, email, phone, education, skills, resume_link, cover_letter) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, internship_id, full_name, email, phone, education, skills, resume_link, cover_letter]
    );
    
    res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT a.*, i.title, i.company 
      FROM applications a 
      JOIN internships i ON a.internship_id = i.id 
      WHERE a.user_id = ?
      ORDER BY a.applied_at DESC
    `, [req.params.userId]);
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;