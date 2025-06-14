# Simple Node.js Authentication & Authorization API

A robust backend authentication and authorization system built with Node.js, Express, MongoDB, and bcryptjs. This API implements role-based access control with **user** and **admin** roles, featuring secure password hashing and protected routes.

## 🚀 Features

- **User Registration & Login**: Secure user authentication with password hashing
- **Role-Based Access Control**: Two user types - `user` and `admin`
- **Protected Routes**: Authentication required for accessing certain endpoints
- **Admin-Only Access**: Specific routes restricted to admin users only
- **Password Security**: Passwords hashed using bcryptjs before storing in database
- **MongoDB Integration**: User data stored in MongoDB Atlas cloud database
- **RESTful API**: Clean API endpoints for easy integration

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **bcryptjs** - Password hashing
- **JWT (JSON Web Tokens)** - Authentication tokens

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (MongoDB Atlas Cloud)
- Postman (for API testing)

## ⚙️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nodejs-auth-app.git
cd nodejs-auth-app
```

2. Install dependencies:
```bash
npm install
npm install nodemon express bcryptjs jsonwebtoken mongoose
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
PORT=3000
MONGODB_URI= MongoDB atlas cloud connection link
JWT_SECRET=your-super-secret-jwt-key
```

4. Start the application:
```bash
npm run dev
```

The server will start running on `http://localhost:3000`

## 🔐 API Endpoints

### Authentication Routes

#### Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "username": "abcd",
  "email": "abcd@email.com",
  "password": "securepassword123",
  "role": "user"
}
```
- **Description:** Register a new user (default role: user)

#### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "username": "abcd",
  "password": "123456"
}
```
- **Response:**
```json
 "success": true,
    "message": "Logged in successfully",
    "accessToken": "<Token here>"
```

### Protected Routes

#### Home Page (User Access)
- **GET** `/api/home/welcome`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Description:** Accessible to all authenticated users
- **Access:** Requires valid JWT token

#### Admin Page (Admin Only)
- **GET** `/api/admin/welcome`
- **Headers:** `Authorization: Bearer <jwt-token>`
- **Description:** Accessible only to users with admin role
- **Access:** Requires valid JWT token + admin role

## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user')
}
```

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcryptjs before storage
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Authorization**: Different access levels for users and admins
- **Protected Routes**: Middleware to verify authentication and authorization
- **Input Validation**: Server-side validation for user inputs

## 🚦 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created (successful registration)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

**Note**: This is a backend-only application. Use Postman or any API client to interact with the endpoints. Make sure to include the JWT token in the Authorization header for protected routes.
