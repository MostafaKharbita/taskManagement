# Task Management System

A full-stack Task Management System built with Angular and Spring Boot. The application allows users to register, authenticate using JWT, and manage their personal tasks through a simple and responsive interface.

## Features

- User Registration
- User Login
- JWT Authentication
- Secure Logout
- Create Task
- View Tasks
- Update Task
- Delete Task
- Each user can only access their own tasks

## Tech Stack

### Frontend

- Angular 19
- TypeScript
- Bootstrap 5
- Reactive Forms
- Angular Router
- HttpClient

### Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Lombok

## Project Structure

```
task-management
│
├── frontend
│   ├── src
│   ├── package.json
│   ├── angular.json
│   └── ...
│
├── backend
│   ├── src
│   ├── pom.xml
│   ├── mvnw
│   └── ...
│
└── README.md
```

## API Endpoints

### Authentication

| Method | Endpoint |
|--------|----------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |

### Tasks

| Method | Endpoint |
|--------|----------|
| GET | `/api/tasks` |
| GET | `/api/tasks/{id}` |
| POST | `/api/tasks` |
| PUT | `/api/tasks/{id}` |
| DELETE | `/api/tasks/{id}` |

## Authentication

The application uses JSON Web Token (JWT) authentication.

After a successful login:

- The backend returns a JWT token.
- The token is stored in Local Storage.
- Every authenticated request includes:

```http
Authorization: Bearer <token>
```

## Installation

### Clone the repository

```bash
git clone https://github.com/MostafaKharbita/task-management.git
```

## Backend

Navigate to the backend folder:

```bash
cd backend
```

Configure your database in `application.properties`:

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

Run the backend:

```bash
mvn spring-boot:run
```

The backend runs on:

```
http://localhost:8080
```

## Frontend

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the Angular application:

```bash
npm start
```

The frontend runs on:

```
http://localhost:4200
```

## Screenshots

You can add screenshots of:

- Login Page
- Register Page
- Tasks Dashboard
- Create Task
- Edit Task

## Future Improvements

- Route Guards
- Search Tasks
- Filter by Status
- Pagination
- Toast Notifications
- Dark Mode
- User Profile

## Author

**Mostafa Abdelrahman**

Faculty of Computers and Information  
Ain Shams University

GitHub: https://github.com/MostafaKharbita
