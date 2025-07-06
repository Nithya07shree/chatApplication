<<<<<<< HEAD
# chatApp
=======
# Chat Application

A full-stack real-time chat application with authentication, user profiles, and voice control features.

- User authentication (Sign up, Login)
- Real-time messaging
- User profiles and settings
- Voice command navigation (e.g., open chats, profile, settings)
- Responsive UI with Tailwind CSS
- Modern frontend (React + Vite)
- Node.js/Express backend

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone the repository
```sh
git clone <repo-url>
cd chatAppln
```

### 2. Install dependencies
#### Backend
```sh
cd backend
npm install
```
#### Frontend
```sh
cd ../frontend
npm install
```

### 3. Environment Variables
Create a `.env` file in `backend/` and add required environment variables (e.g., database URI, JWT secret, Cloudinary keys).

### 4. Run the Application
#### Start Backend
```sh
cd backend
npm start
```
#### Start Frontend
```sh
cd ../frontend
npm run dev
```

### 5. Open in Browser
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).

## Voice Commands
- "Open chats" — Go to chat page
- "Open profile" — Go to profile page
- "Open settings" — Go to settings page

## Folder Details
- `backend/` — Express server, API routes, models, controllers
- `frontend/` — React app, components, pages, store
>>>>>>> 9da9d04 (First commit)
