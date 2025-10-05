@echo off
echo Adding contributors to GitHub repository...
echo.
echo Replace YOUR_USERNAME with your GitHub username in the commands below:
echo.
echo gh api repos/YOUR_USERNAME/AI-based-Internship-Reccomendation-Engine/collaborators/Harsh110306 -X PUT -f permission=push
echo gh api repos/YOUR_USERNAME/AI-based-Internship-Reccomendation-Engine/collaborators/nisargshah1109 -X PUT -f permission=push
echo gh api repos/YOUR_USERNAME/AI-based-Internship-Reccomendation-Engine/collaborators/Smit8125 -X PUT -f permission=push
echo.
echo Or use GitHub web interface:
echo 1. Go to your repository settings
echo 2. Click Collaborators
echo 3. Add: Harsh110306, nisargshah1109, Smit8125
pause