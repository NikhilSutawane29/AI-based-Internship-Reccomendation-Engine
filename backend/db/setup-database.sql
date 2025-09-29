-- Complete Database Setup for Original Architecture
DROP DATABASE IF EXISTS project2hackathon_db;
CREATE DATABASE project2hackathon_db;
USE project2hackathon_db;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) DEFAULT 'student',
    phone VARCHAR(15),
    date_of_birth DATE,
    gender VARCHAR(10),
    city VARCHAR(50),
    state VARCHAR(50),
    skills TEXT,
    education VARCHAR(100),
    college_name VARCHAR(200),
    graduation_year INT,
    cgpa DECIMAL(3,2),
    area_of_interest VARCHAR(100),
    experience_level VARCHAR(50) DEFAULT 'beginner',
    location_preference VARCHAR(100),
    languages VARCHAR(200),
    resume_url VARCHAR(500),
    linkedin_url VARCHAR(300),
    github_url VARCHAR(300),
    portfolio_url VARCHAR(300),
    bio TEXT,
    availability VARCHAR(50),
    work_preference VARCHAR(20) DEFAULT 'hybrid',
    profile_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Internships table
CREATE TABLE internships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200),
    location VARCHAR(100),
    area_of_interest VARCHAR(100),
    required_skills TEXT,
    required_education VARCHAR(100),
    experience_level VARCHAR(50),
    duration VARCHAR(50),
    stipend DECIMAL(10,2),
    description TEXT,
    apply_link VARCHAR(500),
    last_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample government internships
INSERT INTO internships (title, company, location, area_of_interest, required_skills, required_education, experience_level, duration, stipend, description, apply_link, last_date) VALUES
('Agriculture Development Intern', 'Ministry of Agriculture', 'Pune', 'Agriculture', 'Farming,Communication,Data Collection', '12th Pass', 'beginner', '3 months', 8000, 'Work with farmers to improve crop yield using modern techniques', 'https://pminternship.gov.in/apply/1', '2024-12-31'),
('Digital India IT Support', 'Ministry of Electronics and IT', 'Delhi', 'IT', 'Computer Skills,Problem Solving,Hindi', 'Undergraduate', 'intermediate', '6 months', 12000, 'Support digital infrastructure in rural areas', 'https://pminternship.gov.in/apply/2', '2024-11-30'),
('Healthcare Assistant', 'Ministry of Health', 'Bengaluru', 'Healthcare', 'First Aid,Communication,Basic Medical Knowledge', '12th Pass', 'beginner', '4 months', 6000, 'Assist in primary healthcare centers and vaccination drives', 'https://pminternship.gov.in/apply/3', '2024-10-31'),
('Education Technology Coordinator', 'Ministry of Education', 'Mumbai', 'Education', 'Teaching,Computer Skills,Project Management', 'Graduate', 'intermediate', '5 months', 10000, 'Implement digital learning in government schools', 'https://pminternship.gov.in/apply/4', '2024-12-15'),
('Rural Development Assistant', 'Ministry of Rural Development', 'Jaipur', 'Rural Development', 'Communication,Data Analysis,Field Work', 'Graduate', 'intermediate', '6 months', 9000, 'Support rural development programs and schemes', 'https://pminternship.gov.in/apply/5', '2024-11-15'),
('Financial Inclusion Intern', 'Ministry of Finance', 'Hyderabad', 'Finance', 'Finance,Communication,Data Entry', 'Graduate', 'intermediate', '4 months', 11000, 'Promote banking services in underserved areas', 'https://pminternship.gov.in/apply/6', '2024-12-20'),
('Environmental Conservation', 'Ministry of Environment', 'Chennai', 'Environment', 'Environmental Science,Research,Communication', 'Graduate', 'intermediate', '3 months', 7000, 'Work on environmental protection and awareness programs', 'https://pminternship.gov.in/apply/7', '2024-10-25'),
('Skill Development Trainer', 'Ministry of Skill Development', 'Kolkata', 'Skill Development', 'Training,Communication,Technical Skills', 'Graduate', 'advanced', '6 months', 13000, 'Train youth in various vocational skills', 'https://pminternship.gov.in/apply/8', '2024-11-30'),
('Women Empowerment Coordinator', 'Ministry of Women and Child Development', 'Lucknow', 'Social Welfare', 'Social Work,Communication,Project Coordination', 'Graduate', 'intermediate', '5 months', 8500, 'Support women empowerment initiatives', 'https://pminternship.gov.in/apply/9', '2024-12-10'),
('Cyber Security Awareness', 'Ministry of Electronics and IT', 'Ahmedabad', 'IT', 'Cyber Security,Communication,Training', 'Graduate', 'advanced', '4 months', 14000, 'Educate citizens about cyber security', 'https://pminternship.gov.in/apply/10', '2024-11-20');

-- Applications table
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    internship_id INT NOT NULL,
    resume_link VARCHAR(500),
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (internship_id) REFERENCES internships(id)
);

-- Sample users
INSERT INTO users (name, email, password, education, skills, area_of_interest, experience_level, location_preference) VALUES
('Rahul Sharma', 'rahul@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Graduate', 'Computer Skills,Communication', 'IT', 'intermediate', 'Delhi'),
('Priya Patel', 'priya@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '12th Pass', 'Farming,Data Collection', 'Agriculture', 'beginner', 'Maharashtra'),
('Amit Kumar', 'amit@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Graduate', 'Finance,Data Analysis', 'Finance', 'intermediate', 'Mumbai');