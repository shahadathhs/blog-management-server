```markdown
# Blog Project - Backend Assignment

## Overview

This project is a backend implementation for a blogging platform where users can write, update, and delete their blogs. The system has two main roles: **Admin** and **User**. The Admin has special permissions to manage users and their blogs, while regular users can perform CRUD operations on their own blogs. The backend also includes secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Live URL

You can access the live project [here](https://blog-management-beta.vercel.app/).

## Features

- **Authentication & Authorization**: Secure login, role-based access control with Admin and User roles.
- **Blog Management**: Admins can manage users and blogs, while users can manage their own blogs.
- **Public Blog API**: Fetch blogs with search, sort, and filter functionalities.
- **Error Handling**: Comprehensive error handling for smooth user experience.
- **Winston Logging**: Logs request and response information for better debugging and tracking.

## Technologies Used

- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**
- **Zod** for data validation
- **Winston** for logging API request and response data
- **JWT** for authentication

## API Endpoints

### 1. Authentication

#### 1.1 Register User
- **POST** `/api/auth/register`  
  Register a new user with email and password.

#### 1.2 Login User
- **POST** `/api/auth/login`  
  Login with email and password and generate a JWT token.

### 2. Blog Management

#### 2.1 Create Blog
- **POST** `/api/blogs`  
  Create a new blog (requires authentication).

#### 2.2 Update Blog
- **PATCH** `/api/blogs/:id`  
  Update an existing blog (only the author can update it).

#### 2.3 Delete Blog
- **DELETE** `/api/blogs/:id`  
  Delete an existing blog (only the author can delete it).

#### 2.4 Get All Blogs (Public)
- **GET** `/api/blogs`  
  Fetch all blogs with support for search, sorting, and filtering.

### 3. Admin Actions

#### 3.1 Block User
- **PATCH** `/api/admin/users/:userId/block`  
  Admin can block a user.

#### 3.2 Delete Blog
- **DELETE** `/api/admin/blogs/:id`  
  Admin can delete any blog.

## Error Handling

Standard error response format for API errors:

```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,  
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
```

## Models

### User Model

- **name**: Full name of the user.
- **email**: User's email for authentication.
- **password**: Encrypted password.
- **role**: Either "admin" or "user".
- **isBlocked**: Flag indicating whether the user is blocked.
- **createdAt**: Timestamp when the user was created.
- **updatedAt**: Timestamp when the user was last updated.

### Blog Model

- **title**: Title of the blog.
- **content**: Content of the blog.
- **author**: Author's ID (reference to User model).
- **isPublished**: Flag indicating whether the blog is published.
- **createdAt**: Timestamp when the blog was created.
- **updatedAt**: Timestamp when the blog was last updated.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:shahadathhs/blog-management-server.git
   cd blog-management-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and configure the environment variables for MongoDB, JWT secret, etc. Check `.env.example` for reference.

4. Run the server:
   ```bash
   npm run start:dev
   ```

5. The backend will be running on `http://localhost:3000`.

## Admin Login Credentials

- **Email**: admin@gmail.com
- **Password**: 123456

## Bonus: Presentation Video

  
[Presentation Video URL](<INSERT_VIDEO_URL_HERE>)
