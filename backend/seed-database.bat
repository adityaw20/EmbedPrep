@echo off
chcp 65001 >nul
title EmbedPrep Database Seeder
color 0A

echo ==========================================
echo   🚀 EmbedPrep Database Seeder
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ ERROR: Please run this script from the backend folder!
    echo    Current folder: %CD%
    pause
    exit /b 1
)

echo 📝 Please enter your MongoDB connection string
echo    (Find it in MongoDB Atlas: Database =^> Connect =^> Drivers =^> Node.js)
echo.
set /p MONGODB_URI="MongoDB URI: "

if "%MONGODB_URI%"=="" (
    echo.
    echo ❌ ERROR: MongoDB URI cannot be empty!
    pause
    exit /b 1
)

echo.
echo ⏳ Seeding database... Please wait...
set MONGODB_URI=%MONGODB_URI%

npm run seed

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================
    echo   ✅ SUCCESS! Database seeded successfully!
    echo ==========================================
    echo.
    echo 🎉 Your questions are now in the database!
    echo 🌐 You can now visit your Netlify site.
) else (
    echo.
    echo ==========================================
    echo   ❌ FAILED! Something went wrong.
    echo ==========================================
    echo.
    echo Possible issues:
    echo   • Wrong MongoDB URI (check username/password)
    echo   • Network connection problem
    echo   • IP not whitelisted in MongoDB Atlas
    echo.
    echo Go to MongoDB Atlas =^> Network Access =^> Add IP Address
    echo Select "Allow Access from Anywhere" (0.0.0.0/0)
)

echo.
pause
