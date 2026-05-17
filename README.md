# 🚀 JanSamasya – Civic Issue Reporting Platform

JanSamasya is a full-stack MERN application that allows users to report, track, and manage civic/public issues digitally. The platform provides secure authentication, complaint management, contact support, and an admin dashboard for issue resolution.

---

## 🌟 Features

### 👤 User Features

* User Registration & Login
* Secure authentication using JWT
* Password encryption using bcrypt
* Report civic/public issues
* Track issue status
* View issue details
* User profile and settings
* Contact support form

### 🛠️ Admin Features

* Admin dashboard
* View all reported issues
* Mark issues as resolved/reopen
* Delete complaints
* View contact messages
* Notification-style message management

---

## 🏗️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcryptjs

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 🔄 Project Workflow

React Frontend
↓
Axios API Request
↓
Express Routes
↓
Controllers
↓
Mongoose Models
↓
MongoDB Atlas
↓
Response to Frontend

---

## 📁 Folder Structure

```bash
jansamasya/
│
├── client/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── config/
│   └── server.js
```

---

## ⚙️ Installation

### Clone repository

```bash
git clone YOUR_GITHUB_LINK
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside `server/`

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000
```

---

## ▶️ Run Project

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

---

## 🌍 Deployment

Frontend:
Vercel

Backend:
Render

Database:
MongoDB Atlas

---

## 📷 Screenshots

Add screenshots here:

* Login Page
* Dashboard
* Admin Panel
* Report Issue Page

---

## 👨‍💻 Author

Sri Charan N
B.Tech Cyber Security
email:- nagandla.sricharan@gmail.com
Amrita School of Computing
