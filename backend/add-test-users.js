const db = require('./config/database');

async function addTestUsers() {
  try {
    const testUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        skills: 'JavaScript, React, Node.js',
        education: 'Computer Science'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        skills: 'Python, Data Science, ML',
        education: 'Data Science'
      },
      {
        name: 'Raj Kumar',
        email: 'raj@example.com',
        password: 'password123',
        skills: 'Java, Spring Boot, AWS',
        education: 'Engineering'
      }
    ];

    for (const user of testUsers) {
      await db.execute(`
        INSERT INTO users (name, email, password, skills, education)
        VALUES (?, ?, ?, ?, ?)
      `, [user.name, user.email, user.password, user.skills, user.education]);
    }

    console.log('Test users added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error adding test users:', error);
    process.exit(1);
  }
}

addTestUsers();