const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, user_type = 'student', skills, education, area_of_interest, experience_level = 'beginner', location_preference } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, user_type, skills, education, area_of_interest, experience_level, location_preference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, user_type, skills, education, area_of_interest, experience_level, location_preference]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT id, name, email, user_type, skills, education, area_of_interest, experience_level, location_preference, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateProfile(id, profileData) {
    const { skills, education, area_of_interest, experience_level, location_preference } = profileData;
    await db.execute(
      'UPDATE users SET skills = ?, education = ?, area_of_interest = ?, experience_level = ?, location_preference = ? WHERE id = ?',
      [skills, education, area_of_interest, experience_level, location_preference, id]
    );
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;