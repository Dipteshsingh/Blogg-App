# Blog-app
Blog-app (Mern-Stack)
A full-stack blog application built with **React** (frontend) and **Node.js/Express** (backend), with **MongoDB** as the database. Users can register, login, create, update, delete, and view blogs with image upload functionality.

---

## Features

- User registration and login with JWT authentication  
- Create, read, update, and delete blog posts  
- Upload images for blog posts using Multer  
- Responsive UI built with React  
- Protected routes with token verification  
- Filter blogs by category and tags  

---

## Tech Stack

- Frontend: React, React Router, Axios, CSS  
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Multer  
- Database: MongoDB (Atlas or local)  

---

## Installation & Setup

### Backend

1. Navigate to the backend folder (e.g., `server/`)  
2. Install dependencies:  
   ```bash
   npm install
   npm start
3.PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Usage
Register as a new user or login

Create new blog posts with optional images

Edit or delete your posts

Browse all blogs or filter by category/tag

Folder Structure
bash
Copy
Edit
/client    # React frontend
/server    # Node.js backend
API Endpoints (Backend)
POST /api/user/register - Register a new user

POST /api/user/login - Login and receive JWT token

POST /api/blog/create - Create a blog (with image upload)

GET /api/blog/all - Get all blogs

GET /api/blog/:id - Get single blog

PUT /api/blog/update/:id - Update blog

DELETE /api/blog/delete/:id - Delete blog

Environment Variables
Variable	Description
PORT	Backend server port
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for JWT token


Author
Diptesh Kumar Singh
(https://github.com/Dipteshsingh1845
https://www.linkedin.com/in/dipteshkumarsingh/)

