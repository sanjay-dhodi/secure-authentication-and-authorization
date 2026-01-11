# Auth & User Management API

## Features
- Authentication (JWT)
- Role-based access control
- Ownership middleware
- Token refresh & logout

## Auth Flow
- Login
- Access token
- Refresh token
- Logout

## Middleware Order
auth → role → ownership → validation → controller

## Ownership Logic
- Admin: full access
- User: own resource only
