@echo off
echo ========================================
echo GrowExam - Git Push Script
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo Initializing Git repository...
    git init
    git branch -M main
)

REM Add all files
echo Adding files to git...
git add .

REM Get commit message
set /p message="Enter commit message: "
if "%message%"=="" set message="Update project"

REM Commit changes
echo Committing changes...
git commit -m "%message%"

REM Check if remote exists
git remote | findstr origin >nul
if errorlevel 1 (
    set /p repo="Enter GitHub repository URL: "
    git remote add origin !repo!
)

REM Push to GitHub
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo Push completed successfully!
echo ========================================
pause
