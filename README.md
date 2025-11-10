⦁	Project Overview
This is a full-stack Sales Dashboard application with React frontend and Node.js backend.

⦁	Project Structure
sales-dashboard-app/
├── frontend/                 # React frontend application
├── backend/                  # Node.js backend API
├── README.md                 # This file


⦁	Tech Stack
- Frontend : React, Redux Toolkit, Vite
- Backend  : Node.js, Express, MongoDB

⦁	Quick start
Step 1: Clone and Setup Project
git clone <sales-dashboard-url> // repository url
cd sales-dashboard-app

cd backend
npm install

cd sales-dashboard-frontend
npm install

Step 2: .env file setup
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sales-dashboard

Step 3: Run Application
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
cd frontend
npm run dev