-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 26, 2025 at 06:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

DROP DATABASE IF EXISTS project2hackathon_db;
CREATE DATABASE project2hackathon_db;
USE project2hackathon_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project2hackathon_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `internship_id` int(11) NOT NULL,
  `resume_link` varchar(255) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `applied_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_form`
--

CREATE TABLE `contact_form` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `submitted_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `internships`
--

CREATE TABLE `internships` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `company` varchar(100) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `area_of_interest` varchar(100) DEFAULT NULL,
  `required_skills` text DEFAULT NULL,
  `required_education` varchar(100) DEFAULT NULL,
  `experience_level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `duration` varchar(50) DEFAULT NULL,
  `stipend` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sample internship data
--
INSERT INTO `internships` (`id`, `title`, `company`, `location`, `area_of_interest`, `required_skills`, `required_education`, `experience_level`, `duration`, `stipend`, `description`) VALUES
(1, 'Frontend Developer Intern', 'TechCorp', 'Remote', 'Web Development', 'JavaScript,React,HTML,CSS', 'Computer Science', 'beginner', '3 months', '₹15000/month', 'Work on modern web applications using React and JavaScript'),
(2, 'Data Science Intern', 'DataTech Solutions', 'Bangalore', 'AI/ML', 'Python,Machine Learning,Pandas,NumPy', 'Data Science', 'beginner', '6 months', '₹20000/month', 'Analyze large datasets and build ML models'),
(3, 'Backend Developer Intern', 'CloudSoft', 'Pune', 'Backend Development', 'Java,Spring Boot,MySQL,REST APIs', 'Software Engineering', 'intermediate', '4 months', '₹18000/month', 'Develop scalable backend services and APIs'),
(4, 'Mobile App Developer Intern', 'AppVentures', 'Hyderabad', 'Mobile Development', 'React Native,JavaScript,Firebase', 'Computer Science', 'beginner', '3 months', '₹16000/month', 'Build cross-platform mobile applications'),
(5, 'DevOps Intern', 'InfraTech', 'Chennai', 'DevOps', 'Docker,Kubernetes,AWS,Linux', 'Computer Science', 'intermediate', '5 months', '₹22000/month', 'Manage cloud infrastructure and deployment pipelines'),
(6, 'UI/UX Design Intern', 'DesignHub', 'Mumbai', 'Design', 'Figma,Adobe XD,Photoshop,User Research', 'Design', 'beginner', '3 months', '₹12000/month', 'Create user-friendly interfaces and conduct user research'),
(7, 'Cybersecurity Intern', 'SecureNet', 'Delhi', 'Cybersecurity', 'Network Security,Ethical Hacking,Python', 'Cybersecurity', 'intermediate', '6 months', '₹25000/month', 'Identify vulnerabilities and implement security measures'),
(8, 'AI Research Intern', 'AI Labs', 'Bangalore', 'AI/ML', 'Python,TensorFlow,PyTorch,Deep Learning', 'AI/ML', 'advanced', '6 months', '₹30000/month', 'Research and develop cutting-edge AI algorithms'),
(9, 'Full Stack Developer Intern', 'WebSolutions', 'Gurgaon', 'Web Development', 'JavaScript,React,Node.js,MongoDB', 'Computer Science', 'intermediate', '4 months', '₹20000/month', 'Build complete web applications from frontend to backend'),
(10, 'Game Developer Intern', 'GameStudio', 'Pune', 'Game Development', 'Unity,C#,3D Modeling,Game Design', 'Game Development', 'beginner', '4 months', '₹17000/month', 'Develop engaging mobile and PC games');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('student','admin') DEFAULT 'student',
  `skills` text DEFAULT NULL,
  `education` varchar(100) DEFAULT NULL,
  `area_of_interest` varchar(100) DEFAULT NULL,
  `experience_level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `location_preference` varchar(100) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Sample user data
--
INSERT INTO `users` (`id`, `name`, `email`, `password`, `skills`, `education`, `area_of_interest`, `experience_level`, `location_preference`) VALUES
(1, 'John Doe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'JavaScript,React,Node.js', 'Computer Science', 'Web Development', 'intermediate', 'Remote'),
(2, 'Jane Smith', 'jane@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Python,Machine Learning,Data Analysis', 'Data Science', 'AI/ML', 'beginner', 'New York'),
(3, 'Mike Johnson', 'mike@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Java,Spring Boot,MySQL', 'Software Engineering', 'Backend Development', 'advanced', 'California');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `internship_id` (`internship_id`);

--
-- Indexes for table `contact_form`
--
ALTER TABLE `contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `internships`
--
ALTER TABLE `internships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `contact_form`
--
ALTER TABLE `contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `internships`
--
ALTER TABLE `internships`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applications`
--
ALTER TABLE `applications`
  ADD CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`internship_id`) REFERENCES `internships` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
