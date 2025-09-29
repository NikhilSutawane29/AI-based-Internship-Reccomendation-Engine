-- Complete Database Setup using Team's Structure
DROP DATABASE IF EXISTS pminternship_recommender;
CREATE DATABASE pminternship_recommender;
USE pminternship_recommender;

-- Users table (based on team's Sample_Users.sql)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    password VARCHAR(255) NOT NULL,
    education VARCHAR(100),
    skills TEXT,
    sector_preference VARCHAR(100),
    location_preference VARCHAR(100),
    state_preference VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Internships table (based on team's Sample_Internships.sql)
CREATE TABLE internships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    sector VARCHAR(100),
    required_education VARCHAR(100),
    skills_required TEXT,
    location VARCHAR(100),
    state VARCHAR(100),
    duration VARCHAR(50),
    stipend DECIMAL(10,2),
    apply_link VARCHAR(500),
    last_date DATE,
    organization VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample users (from team's data + password hashes)
INSERT INTO users (name, email, phone, password, education, skills, sector_preference, location_preference, state_preference) VALUES
('Smit Thakkar', 'smit@example.com', '9876543210', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Undergraduate', 'Python,Communication', 'IT', 'Mumbai', 'Maharashtra'),
('Priya Sharma', 'priya@example.com', '9876512345', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '12th Pass', 'Farming,Communication', 'Agriculture', 'Pune', 'Maharashtra'),
('Rahul Kumar', 'rahul@example.com', '9876512346', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Graduate', 'Computer Skills,Problem Solving', 'IT', 'Delhi', 'Delhi');

-- Government internships (enhanced from team's data)
INSERT INTO internships (title, description, sector, required_education, skills_required, location, state, duration, stipend, apply_link, last_date, organization) VALUES
('Agriculture Development Intern', 'Work with local farmers to improve crop yield and sustainability using modern techniques', 'Agriculture', '12th Pass', 'Farming,Communication,Data Collection', 'Pune', 'Maharashtra', '3 months', 8000, 'https://pminternship.mca.gov.in/apply/1', '2024-12-31', 'Ministry of Agriculture'),
('Digital India IT Support', 'Assist with tech support and troubleshooting for government IT systems in rural areas', 'IT', 'Undergraduate', 'Computer Skills,Problem Solving,Hindi', 'Delhi', 'Delhi', '6 months', 12000, 'https://pminternship.mca.gov.in/apply/2', '2024-11-30', 'Ministry of Electronics and IT'),
('Healthcare Assistant Program', 'Support local clinics and health camps in rural areas, assist with vaccination drives', 'Healthcare', '12th Pass', 'First Aid,Communication,Basic Medical Knowledge', 'Bengaluru', 'Karnataka', '4 months', 6000, 'https://pminternship.mca.gov.in/apply/3', '2024-10-31', 'Ministry of Health'),
('Education Technology Coordinator', 'Implement digital learning solutions in government schools and train teachers', 'Education', 'Graduate', 'Teaching,Computer Skills,Project Management', 'Mumbai', 'Maharashtra', '5 months', 10000, 'https://pminternship.mca.gov.in/apply/4', '2024-12-15', 'Ministry of Education'),
('Rural Development Assistant', 'Support rural development programs and government schemes implementation', 'Rural Development', 'Graduate', 'Communication,Data Analysis,Field Work', 'Jaipur', 'Rajasthan', '6 months', 9000, 'https://pminternship.mca.gov.in/apply/5', '2024-11-15', 'Ministry of Rural Development'),
('Financial Inclusion Intern', 'Promote banking services and financial literacy in underserved areas', 'Finance', 'Graduate', 'Finance,Communication,Data Entry', 'Hyderabad', 'Telangana', '4 months', 11000, 'https://pminternship.mca.gov.in/apply/6', '2024-12-20', 'Ministry of Finance'),
('Environmental Conservation Program', 'Work on environmental protection and awareness programs in local communities', 'Environment', 'Graduate', 'Environmental Science,Research,Communication', 'Chennai', 'Tamil Nadu', '3 months', 7000, 'https://pminternship.mca.gov.in/apply/7', '2024-10-25', 'Ministry of Environment'),
('Skill Development Trainer', 'Train youth in various vocational skills and employment readiness', 'Skill Development', 'Graduate', 'Training,Communication,Technical Skills', 'Kolkata', 'West Bengal', '6 months', 13000, 'https://pminternship.mca.gov.in/apply/8', '2024-11-30', 'Ministry of Skill Development'),
('Women Empowerment Coordinator', 'Support women empowerment initiatives and self-help group programs', 'Social Welfare', 'Graduate', 'Social Work,Communication,Project Coordination', 'Lucknow', 'Uttar Pradesh', '5 months', 8500, 'https://pminternship.mca.gov.in/apply/9', '2024-12-10', 'Ministry of Women and Child Development'),
('Cyber Security Awareness Program', 'Educate citizens about cyber security and digital safety measures', 'IT', 'Graduate', 'Cyber Security,Communication,Training', 'Ahmedabad', 'Gujarat', '4 months', 14000, 'https://pminternship.mca.gov.in/apply/10', '2024-11-20', 'Ministry of Electronics and IT');