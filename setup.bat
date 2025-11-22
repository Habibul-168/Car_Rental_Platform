@echo off
echo Setting up Car Rental Platform...

echo.
echo Installing Backend Dependencies...
cd /d C:\car-rental-platform\backend
call npm install
if %errorlevel% neq 0 (
    echo Backend installation failed!
    pause
    exit /b 1
)

echo.
echo Installing Frontend Dependencies...
cd /d C:\car-rental-platform\frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend installation failed!
    pause
    exit /b 1
)

echo.
echo Seeding Database...
cd /d C:\car-rental-platform\backend
node seedData.js

echo.
echo Setup completed successfully!
echo.
echo To start the application:
echo 1. Make sure MongoDB is running
echo 2. Run start-dev.bat
echo.
pause