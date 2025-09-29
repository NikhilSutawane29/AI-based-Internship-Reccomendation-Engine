// AI-based Recommendation Model
class InternshipRecommendationModel {
  constructor() {
    // Skill similarity matrix for better matching
    this.skillSimilarity = {
      'javascript': ['react', 'node.js', 'web development', 'frontend'],
      'python': ['data analysis', 'machine learning', 'ai', 'backend'],
      'react': ['javascript', 'frontend', 'web development', 'ui/ux'],
      'data analysis': ['python', 'statistics', 'research', 'analytics'],
      'machine learning': ['python', 'ai', 'data science', 'tensorflow'],
      'java': ['backend', 'spring boot', 'enterprise', 'android'],
      'project management': ['leadership', 'coordination', 'planning', 'agile']
    };

    // Sector weights based on market demand
    this.sectorWeights = {
      'Technology': 1.2,
      'Healthcare': 1.1,
      'Finance': 1.0,
      'Education': 0.9,
      'Agriculture': 0.8
    };
  }

  // Calculate skill similarity score
  calculateSkillSimilarity(userSkills, internshipSkills) {
    let totalSimilarity = 0;
    let maxPossibleScore = 0;

    for (const userSkill of userSkills) {
      let bestMatch = 0;
      const userSkillLower = userSkill.toLowerCase().trim();
      
      for (const internshipSkill of internshipSkills) {
        const internshipSkillLower = internshipSkill.toLowerCase().trim();
        
        // Direct match
        if (userSkillLower === internshipSkillLower) {
          bestMatch = Math.max(bestMatch, 1.0);
        }
        // Partial match
        else if (userSkillLower.includes(internshipSkillLower) || internshipSkillLower.includes(userSkillLower)) {
          bestMatch = Math.max(bestMatch, 0.8);
        }
        // Similarity through skill matrix
        else if (this.skillSimilarity[userSkillLower]?.includes(internshipSkillLower)) {
          bestMatch = Math.max(bestMatch, 0.6);
        }
      }
      
      totalSimilarity += bestMatch;
      maxPossibleScore += 1;
    }

    return maxPossibleScore > 0 ? totalSimilarity / maxPossibleScore : 0;
  }

  // Calculate experience level compatibility
  calculateExperienceMatch(userLevel, internshipLevel) {
    const levels = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
    const userLevelNum = levels[userLevel] || 1;
    const internshipLevelNum = levels[internshipLevel] || 1;
    
    const diff = Math.abs(userLevelNum - internshipLevelNum);
    return Math.max(0, 1 - (diff * 0.3)); // Penalty for level mismatch
  }

  // Calculate location preference score
  calculateLocationScore(userLocation, internshipLocation) {
    if (!userLocation || !internshipLocation) return 0.5;
    
    const userLoc = userLocation.toLowerCase().trim();
    const internshipLoc = internshipLocation.toLowerCase().trim();
    
    if (userLoc === internshipLoc) return 1.0;
    if (internshipLoc === 'remote' || userLoc === 'remote') return 0.9;
    if (userLoc.includes(internshipLoc) || internshipLoc.includes(userLoc)) return 0.7;
    
    return 0.3; // Different locations
  }

  // Main recommendation algorithm
  calculateRecommendationScore(internship, userProfile) {
    const weights = {
      skills: 0.5,
      location: 0.25,
      sector: 0.15,
      education: 0.1
    };

    let scores = {};

    // Skills matching (40% weight)
    const userSkills = userProfile.skills || [];
    const internshipSkills = internship.required_skills ? internship.required_skills.split(',').map(s => s.trim()) : [];
    scores.skills = this.calculateSkillSimilarity(userSkills, internshipSkills);

    // Sector interest matching (30% weight)
    const userInterests = userProfile.interests || [];
    const internshipSector = internship.area_of_interest || internship.sector || '';
    const sectorMatch = userInterests.some(interest => 
      interest.toLowerCase().includes(internshipSector.toLowerCase()) ||
      internshipSector.toLowerCase().includes(interest.toLowerCase())
    );
    scores.sector = sectorMatch ? 1.0 : 0.2;

    // Location preference (20% weight)
    scores.location = this.calculateLocationScore(
      userProfile.location, 
      internship.location
    );

    // Education matching (10% weight)
    const userEducation = userProfile.education || '';
    const requiredEducation = internship.required_education || '';
    scores.education = userEducation.toLowerCase().includes(requiredEducation.toLowerCase()) ? 1.0 : 0.5;

    // Calculate weighted final score
    let finalScore = 0;
    for (const [factor, score] of Object.entries(scores)) {
      finalScore += (score * weights[factor]);
    }

    // Convert to percentage
    return Math.max(20, Math.min(100, Math.round(finalScore * 100)));
  }

  // Get personalized recommendations
  getRecommendations(internships, userProfile) {
    console.log('AI Model - Input:', { internships: internships?.length, userProfile });
    
    if (!userProfile || !internships) {
      console.log('AI Model - Missing data:', { userProfile: !!userProfile, internships: !!internships });
      return [];
    }

    const scoredInternships = internships.map(internship => {
      const score = this.calculateRecommendationScore(internship, userProfile);
      console.log(`AI Model - Scoring ${internship.title}:`, score);
      
      return {
        id: internship.id,
        title: internship.title,
        sector: internship.area_of_interest || internship.sector,
        location: internship.location,
        description: internship.description,
        skills: internship.required_skills ? internship.required_skills.split(',').map(s => s.trim()) : [],
        stipend: `₹${internship.stipend}/month`,
        duration: internship.duration,
        company: internship.company,
        apply_link: internship.apply_link,
        last_date: internship.last_date,
        matchPercentage: score,
        aiScore: score,
        confidence: score > 70 ? 'High' : score > 50 ? 'Medium' : 'Low'
      };
    });

    // Sort by AI score and add diversity
    const result = scoredInternships
      .sort((a, b) => b.aiScore - a.aiScore)
      .map((internship, index) => ({
        ...internship,
        rank: index + 1
      }));
      
    console.log('AI Model - Final recommendations:', result);
    return result;
  }
}

export default InternshipRecommendationModel;