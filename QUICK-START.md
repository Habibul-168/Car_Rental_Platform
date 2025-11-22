# Quick Start Guide

## Step 1: Navigate to Project Directory
```cmd
cd C:\car-rental-platform
```

## Step 2: Install Dependencies
```cmd
cd backend
npm install
cd ..\frontend
npm install
```

## Step 3: Start MongoDB
Make sure MongoDB is running on your system

## Step 4: Seed Database
```cmd
cd C:\car-rental-platform\backend
node seedData.js
```

## Step 5: Start Development Servers

**Terminal 1 (Backend):**
```cmd
cd C:\car-rental-platform\backend
npm run dev
```

**Terminal 2 (Frontend):**
```cmd
cd C:\car-rental-platform\frontend
npm run dev
```

## Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Alternative: Use Batch Scripts
1. Run `setup.bat` for installation
2. Run `start-dev.bat` to start both servers