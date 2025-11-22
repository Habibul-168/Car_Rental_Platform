@echo off
echo Starting Car Rental Platform Development Servers...

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d C:\car-rental-platform\backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d C:\car-rental-platform\frontend && npm run dev"

echo.
echo Development servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul