# Authentication & Authorization System

A backend authentication project built to understand how login systems, authorization, and error handling work in real-world applications.

## 🎯 Purpose
This project was created to practice backend authentication concepts and learn how APIs are secured and structured.

## 🚀 Features
- User registration, login, and logout
- JWT-based authentication
- Access token and refresh token rotation
- Basic role-based access control
- Ownership check for protected resources
- User CRUD operations
- Secure authentication using HttpOnly cookies
- Request validation using Zod
- Rate limiting and basic CORS configuration
- Custom error classes
- Centralized error handling using middleware
- Async error handler for cleaner controllers

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT
- Zod

## 🔁 Request Flow
Each request passes through a structured middleware flow:

Authentication → Role Check → Ownership Check → Validation → Controller

## 📘 What I Learned
- Implementing JWT authentication with access and refresh token rotation
- Basics of role-based and ownership-based authorization
- Writing reusable middleware for authentication and validation
- Creating custom error class and centralized error handler
- Structuring backend code for better maintainability
- Protecting Auth APIs using rate limiting

## ⚠️ Notes
- This is a learning-focused backend project
- Security implementation is basic and can be improved further
- No advanced monitoring or logging is implemented

## 📂 Project Status
Completed (learning project).

## 📡 API Access

### 🌐 Base URL
https://secure-authentication-and-authorization.onrender.com

### ❤️ Health Check
GET /health

### 🔐 Authentication Endpoints

POST /api/auth/register 

**Body Format**

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

POST /api/auth/login  

{  "email": "john@example.com","password": "password123"}


POST /api/auth/logout  
POST /api/auth/refresh  

### 👤 User Endpoints
GET /api/user/alluser  
GET /api/user/singleuser/:id  
PATCH /api/user/update/:id  
DELETE /api/user/delete/:id  

⚠️ Note:  
This API uses **HttpOnly cookies** for authentication.  
Protected routes require login and can be tested using **Postman**  


## 🙌 Author
**Sanjay Dhodi**  
Aspiring Software Developer
