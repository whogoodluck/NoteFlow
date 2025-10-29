# 📱 Scalable Web App with Authentication & Dashboard

> A full-stack web application demonstrating modern frontend development practices with secure authentication and CRUD operations.

## 🎯 Project Overview

This project is a scalable web application featuring user authentication, protected routes, and a fully functional dashboard with CRUD operations. Built as part of the Frontend Developer Intern assignment, it showcases integration between a modern React frontend and a secure backend API.

## 🚀 Live Demo

[See Live](https://noteflow-0hej.onrender.com)

## ✨ Features

### 🔐 Authentication System

- User registration with validation
- Secure login/logout flow
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes requiring authentication

### 📊 Dashboard

- User profile display and management
- CRUD operations on [sample entity: posts]
- Search and filter functionality
- Responsive design for all devices
- Real-time data synchronization

### 🛡️ Security Features

- Password hashing
- JWT token validation
- Server-side and client-side validation
- Secure API endpoints
- Error handling and input sanitization

## 🚀 Tech Stack

### Frontend

- **Framework**: React.js
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios

### Backend

- **Runtime/Framework**: Node.js with Express
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Database**: PostgreSQL
- **Validation**: Zod

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/whogoodluck/NoteFlow.git
cd NoteFlow
```

2. **Install Backend Dependencies**

```bash
npm install
```

3. **Install Frontend Dependencies**

```bash
cd web
npm install
```

4. **Environment Setup**

Create `.env` file in the root directory:

```env
PORT = 3000
DATABASE_URL="postgresql://username:password@localhost:3306/yourdb"
DEV_DATABASE_URL="postgresql://username:password@localhost:3306/yourdb"
JWT_SECRET = "YOUR_SECRET_KEY"
```

5. **Database Setup**

```bash
npx prisma migrate deploy
npx prisma generate
```

## 📝 Key Features Implemented

- ✅ Responsive UI with modern design
- ✅ Form validation (client + server)
- ✅ JWT authentication with refresh tokens
- ✅ Protected routes
- ✅ CRUD operations with real-time updates
- ✅ Search and filter functionality
- ✅ Error handling and user feedback
- ✅ Secure password storage
