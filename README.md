# FlavorLab 🍽️

**FlavorLab** is a full-stack food sharing and recipe management platform. It enables users to create, share, and manage recipes with beautiful UI and robust backend features. The system supports authentication, admin moderation, analytics, and a mobile-friendly experience.

## Features

- **User Authentication**: Register/login via email-password or Google OAuth 2.0
- **Recipe Management**: Create, view, edit, and delete your own recipes
- **User Profiles**: Edit personal details and upload avatars
- **Admin Dashboard**: Admins can manage users and all recipes
- **Responsive Design**: Mobile and desktop friendly

---

## Tech Stack

| Layer     | Tech                                       |
|-----------|--------------------------------------------|
| Frontend  | React
| Backend   | Node.js, Express, MongoDB (Mongoose)       |
| Auth      | JWT, Google OAuth 2.0                      |
| File/Image| Cloudinary                        |
| Others    | Axios, React Query, Helmet, CORS           |


## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Frida7771/Flavor-Lab
cd Flavor-Lab
```
### 2. Install dependencies
```bash
# Backend
cd service
npm install

# Frontend
cd app
npm install
```
### 3. Configure environment variables
Create .env files in both service/ and app/ directories

Example: service/.env

```
PORT=3002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

Example: app/.env

```
VITE_API_BASE_URL=http://localhost:3002
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```
### 4. Start the project

```
# Start backend
cd service
npm start

# Start frontend
cd app
npm run dev
```

### 5. Copyright Notice
This project was developed as a **group coursework project** for INFO 6150, by:

- **Bo Li**
- **Ye Wang**
- **Haodong Lu**
- **Hanyao Yu**

The project is intended for educational purposes only and is not used for commercial distribution.






