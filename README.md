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

## Live Endpoint :
https://secure-authentication-and-authorization.onrender.com

## 🙌 Author
**Sanjay Dhodi**  
Aspiring Software Developer
