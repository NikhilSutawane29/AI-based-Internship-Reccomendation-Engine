const db = require('../config/database');

class Internship {
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM internships ORDER BY created_at DESC');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM internships WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(internshipData) {
    const { title, company, location, area_of_interest, required_skills, required_education, experience_level, duration, stipend, description } = internshipData;
    
    const [result] = await db.execute(
      'INSERT INTO internships (title, company, location, area_of_interest, required_skills, required_education, experience_level, duration, stipend, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, company, location, area_of_interest, required_skills, required_education, experience_level, duration, stipend, description]
    );
    return result.insertId;
  }

  static async getRecommendations(userProfile) {
    const { skills, area_of_interest, experience_level, location_preference } = userProfile;
    
    let query = `
      SELECT *, 
      (
        CASE 
          WHEN area_of_interest = ? THEN 3
          WHEN area_of_interest LIKE ? THEN 2
          ELSE 0
        END +
        CASE 
          WHEN experience_level = ? THEN 2
          ELSE 0
        END +
        CASE 
          WHEN location = ? OR location = 'Remote' THEN 1
          ELSE 0
        END
      ) as match_score
      FROM internships 
      WHERE 1=1
    `;
    
    let params = [area_of_interest, `%${area_of_interest}%`, experience_level, location_preference];
    
    if (skills) {
      const skillArray = skills.split(',');
      const skillConditions = skillArray.map(() => 'required_skills LIKE ?').join(' OR ');
      query += ` AND (${skillConditions})`;
      skillArray.forEach(skill => params.push(`%${skill.trim()}%`));
    }
    
    query += ' ORDER BY match_score DESC, created_at DESC LIMIT 10';
    
    const [rows] = await db.execute(query, params);
    return rows;
  }
}

module.exports = Internship;