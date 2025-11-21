# Twine —  Backend (Node.js + Express + MongoDB)

The Twine backend is built to provide a secure, scalable, and efficient API for managing posts, users, and real-time interactions. It follows a clean MVC architecture and integrates modern authentication, database modeling, and RESTful API design principles.

- Live Link: (https://twinewere.netlify.app/)
- Front-end github: (https://github.com/Md-Siyam94/twine-client)

## 🚀 Tech Stack

- Node.js – Server-side JavaScript runtime
- Express.js – Lightweight web framework for building APIs
- MongoDB – NoSQL database for flexible data management
- Mongoose – ODM for schema modeling and database queries
- JWT (JSON Web Token) – Secure authentication and authorization

## 🔧 Features

- User Authentication (Register/Login) using JWT
- Secure Routes with middleware-based token verification
- Post Management (Create, Read, Update, Delete)
- Nested Data Handling using Mongoose
- Error Handling Middleware for improved API reliability
- Environment-based configuration with .env
- Scalable Folder Structure following MVC pattern


## 🔐 Authentication Flow

- User signs up or logs in
- Server generates a JWT token
- Token must be sent in headers for protected routes
- Middleware verifies and authorizes the user