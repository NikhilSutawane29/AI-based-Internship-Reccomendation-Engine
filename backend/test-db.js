const mysql = require('mysql2/promise');

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '2005',
      database: 'project2hackathon_db'
    });
    
    console.log('✅ Database connection successful');
    
    // Test users table
    const [result] = await connection.execute('DESCRIBE users');
    console.log('✅ Users table structure:', result.map(r => r.Field));
    
    await connection.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
};

testConnection();