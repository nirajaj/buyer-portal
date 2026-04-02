# Buyer Portal – Auth + Favourites Dashboard

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-lightgrey.svg)](https://www.sqlite.org/)

A full-stack buyer portal built as part of the **TechKraft Inc. Junior Full-Stack Engineer take-home assessment**.

This application allows users to:

- 🔐 Register with email and password
- 🔑 Log in securely using JWT authentication
- 👤 View their profile information
- 🏠 Browse available properties
- ❤️ Add and remove favourite properties
- 🔒 Access only their own saved favourites

---

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## ✨ Features

### Authentication
- User registration with validation
- Secure login using email and password
- Password hashing using **bcrypt**
- JWT-based authentication for protected routes

### Buyer Dashboard
- Displays authenticated user information
- Shows user name, email, and role
- Lists all available properties
- Allows users to add/remove favourites
- Restricts access so users can only manage **their own** favourites

### Backend
- REST API built with **Node.js** and **Express**
- SQLite database for lightweight local storage
- Server-side validation and error handling
- Protected routes with authentication middleware

### Frontend
- Clean and responsive UI
- Login page
- Register page
- Premium buyer dashboard
- Property cards with favourite actions

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Registration Page
![Registration Page](screenshots/register.png)

### Dashboard Overview
![Dashboard](screenshots/dashboard.png)

### Properties List
![Properties](screenshots/properties.png)

### Favourites Management
![Favourites](screenshots/favourites.png)

---

## 🛠 Tech Stack

### Frontend
- **HTML5** - Markup structure
- **CSS3** - Styling and responsive design
- **Vanilla JavaScript** - Client-side interactivity

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework

### Database
- **SQLite** - Lightweight database

### Authentication & Security
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
buyer-portal/
├── client/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── login.js
│   │   ├── register.js
│   │   └── dashboard.js
│   ├── dashboard.html
│   ├── login.html
│   └── register.html
│
├── server/
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── favourites.js
│   │   └── properties.js
│   ├── database.sqlite
│   ├── db.js
│   └── index.js
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   ├── properties.png
│   └── favourites.png
│
├── .env
├── package.json
└── README.md
```

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd buyer-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory
   - Add your JWT secret:
     ```
     JWT_SECRET=your-secret-key-here
     ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000` (or your configured port)

---

## 📖 Usage

1. **Register** a new account on the registration page
2. **Login** with your credentials
3. **Browse properties** on the dashboard
4. **Add/remove favourites** by clicking the heart icon
5. **View your favourites** in the dedicated section

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Properties
- `GET /api/properties` - Get all properties

### Favourites
- `GET /api/favourites` - Get user's favourites
- `POST /api/favourites` - Add property to favourites
- `DELETE /api/favourites/:id` - Remove property from favourites

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## � Security Considerations

✅ **Password Security**
- Passwords are hashed using **bcrypt** (never stored in plain text)
- Salt rounds configured for optimal security

✅ **Authentication**
- JWT tokens for stateless session management
- Protected routes require valid token verification
- Tokens expire for enhanced security

✅ **Authorization**
- Users can only access and modify **their own** favourites
- Server-side validation prevents unauthorized access
- Role-based access control implemented

✅ **Data Validation**
- Input validation on all endpoints
- Server-side error handling
- SQL injection prevention

---

## 📊 Database Design

### `users` Table
```sql
- id (PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR UNIQUE)
- password_hash (VARCHAR)
- role (VARCHAR)
- created_at (TIMESTAMP)
```

### `properties` Table
```sql
- id (PRIMARY KEY)
- title (VARCHAR)
- location (VARCHAR)
- price (DECIMAL)
- description (TEXT)
- created_at (TIMESTAMP)
```

### `favourites` Table
```sql
- id (PRIMARY KEY)
- user_id (FOREIGN KEY → users.id)
- property_id (FOREIGN KEY → properties.id)
- created_at (TIMESTAMP)
```

---

## 📝 Notes

- ✨ Sample properties are **seeded automatically** on initial startup
- 📦 SQLite is used for simplicity and lightweight local deployment
- 🎨 The UI is designed to be **clean, modern, and fully responsive**
- 🔄 All API responses follow consistent JSON format
- 🚀 Easy to scale and migrate to production databases (PostgreSQL, MySQL)

---

## 👨‍💻 Author

**Niraj Yadav**

Submitted for: **Junior Full-Stack Engineer Take-Home Assessment** @ **TechKraft Inc.**

---

## 📄 License

This project is part of a take-home assessment and is not licensed for public use.

---

**Last Updated:** April 2026 | **Status:** Active Development ✨