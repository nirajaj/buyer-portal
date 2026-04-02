# Buyer Portal – Auth + Favourites Dashboard

A full-stack buyer portal built as part of the **TechKraft Inc. Junior Full-Stack Engineer take-home assessment**.

This application allows users to:

- register with email and password
- log in securely using JWT authentication
- view their profile information
- browse available properties
- add and remove favourite properties
- access only their own saved favourites

---

## Features

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

## Tech Stack

### Frontend
- HTML
- CSS
- Vanilla JavaScript

### Backend
- Node.js
- Express.js

### Database
- SQLite

### Authentication & Security
- JWT
- bcryptjs

---

## Project Structure

```bash
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