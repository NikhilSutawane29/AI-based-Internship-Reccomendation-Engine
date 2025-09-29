const express = require('express');
const Internship = require('../models/Internship');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

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

  calculateLocationMatch(userLocation, internshipLocation) {
    if (!userLocation) return 50;
    
    const userLoc = userLocation.toLowerCase();
    const intLoc = internshipLocation?.toLowerCase() || '';
    
    if (userLoc === intLoc) return 100;
    if (intLoc.includes(userLoc) || userLoc.includes(intLoc)) return 80;
    return 30;
  }

  calculateRecommendationScore(internship, userProfile) {
    const requiredSkills = internship.required_skills || internship.skills_required || '';
    const internshipSector = internship.area_of_interest || internship.sector || '';
    const requiredEducation = internship.required_education || '';
    
    const skillScore = this.calculateSkillMatch(userProfile.skills, requiredSkills);
    const locationScore = this.calculateLocationMatch(userProfile.location_preference, internship.location);
    
    let areaMatch = 20;
    if (userProfile.area_of_interest && internshipSector) {
      const userInterests = userProfile.area_of_interest.toLowerCase().split(',').map(s => s.trim());
      const sectorLower = internshipSector.toLowerCase();
      
      for (const interest of userInterests) {
        if (interest === 'tech' && (sectorLower.includes('it') || sectorLower.includes('technology'))) {
          areaMatch = 100;
          break;
        } else if (interest === 'healthcare' && sectorLower.includes('health')) {
          areaMatch = 100;
          break;
        } else if (interest === 'agriculture' && sectorLower.includes('agriculture')) {
          areaMatch = 100;
          break;
        } else if (interest === sectorLower) {
          areaMatch = 100;
          break;
        } else if (sectorLower.includes(interest) || interest.includes(sectorLower)) {
          areaMatch = 80;
        }
      }
    }
    
    const educationMatch = userProfile.education === requiredEducation ? 100 : 50;

    return Math.round(
      (skillScore * 0.4) + 
      (locationScore * 0.2) + 
      (areaMatch * 0.3) + 
      (educationMatch * 0.1)
    );
  }
}

const aiRecommender = new AIRecommender();

// Get AI-powered recommendations (must be before /:id route)
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const internships = await Internship.getAll();
    
    const recommendations = internships.map(internship => {
      const matchScore = aiRecommender.calculateRecommendationScore(internship, user);
      const requiredSkills = internship.required_skills || internship.skills_required || '';
      const sector = internship.area_of_interest || internship.sector || 'General';
      
      return {
        ...internship,
        matchPercentage: matchScore,
        confidence: matchScore > 70 ? 'High' : matchScore > 50 ? 'Medium' : 'Low',
        skills: requiredSkills ? requiredSkills.split(',').map(s => s.trim()) : [],
        sector: sector,
        stipend: internship.stipend ? `₹${internship.stipend}/month` : 'Unpaid',
        duration: internship.duration || 'Not specified'
      };
    }).filter(rec => rec.matchPercentage > 0).sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const internships = await Internship.getAll();
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.getById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const internshipId = await Internship.create(req.body);
    const internship = await Internship.getById(internshipId);
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;