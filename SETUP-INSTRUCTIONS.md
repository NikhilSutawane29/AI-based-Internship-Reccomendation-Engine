# 🚀 PM Internship AI Recommender - Complete Setup Guide

## 📋 Prerequisites
- Node.js (v16+)
- MySQL Server
- Git

## 🗄️ Database Setup

1. **Create Database:**
```bash
mysql -u root -p < setup-database.sql
```

2. **Verify Database:**
```sql
USE pminternship_recommender;
SHOW TABLES;
SELECT COUNT(*) FROM internships;
```

## 🔧 Backend Setup

1. **Install Dependencies:**
```bash
cd backend
npm install --save express mysql2 cors bcryptjs jsonwebtoken nodemon
```

2. **Start Hybrid Server:**
```bash
node hybrid-server.js
```

3. **Verify Backend:**
- Open: http://localhost:3001
- Should show: "PM Internship AI Recommender API is running!"

## 🎨 Frontend Setup

1. **Install Dependencies:**
```bash
cd frontend
npm install
```

2. **Start Frontend:**
```bash
npm run dev
```

3. **Access Application:**
- Open: http://localhost:5173

## 🧪 Test the System

### 1. Register New User:
- Name: Test User
- Email: test@example.com
- Password: password123
- Skills: Computer Skills, Communication
- Education: Graduate
- Sector: IT
- Location: Delhi

### 2. Login & Get Recommendations:
- Login with above credentials
- View AI-powered government internship recommendations
- See match percentages and confidence levels

## 🔑 Test Credentials
```
Email: rahul@example.com
Password: password
```

## 🏗️ System Architecture

```
Frontend (React) → Backend (Node.js + AI) → MySQL Database
     ↓                    ↓                      ↓
- User Interface    - Authentication        - Government 
- AI Recommendations - AI Matching Algorithm   Internships
- Profile Management - JWT Security         - User Profiles
```

## 🤖 AI Features
- ✅ Skill similarity matching
- ✅ Location preference scoring  
- ✅ Education level compatibility
- ✅ Sector interest alignment
- ✅ Confidence level indicators
- ✅ Personalized ranking

## 🎯 Government Internship Sectors
- Agriculture Development
- Digital India IT Support  
- Healthcare Assistance
- Education Technology
- Rural Development
- Financial Inclusion
- Environmental Conservation
- Skill Development Training
- Women Empowerment
- Cyber Security Awareness

## 🚨 Troubleshooting

**Database Connection Error:**
- Check MySQL is running: `net start mysql`
- Verify password in hybrid-server.js: `password: '2005'`

**Port Already in Use:**
- Kill process: `taskkill /PID <PID> /F`
- Or change port in hybrid-server.js

**Frontend API Error:**
- Ensure backend is running on port 3001
- Check browser console for errors

## 📊 Success Metrics
- ✅ Real government internship data
- ✅ AI-powered matching algorithm
- ✅ User authentication system
- ✅ Responsive UI/UX
- ✅ Match confidence indicators
- ✅ Fallback to mock data if needed

🎉 **Your PM Internship AI Recommender is ready!**