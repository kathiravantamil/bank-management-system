# Bank Management System

A full-stack web application developed to manage banking operations such as account management, deposits, withdrawals, fund transfers, and transaction history.

## 🚀 Project Overview

The Bank Management System provides a simple web interface for users to interact with banking operations. The backend is developed using Java and Spring Boot, with MySQL for database management, while the frontend uses HTML, CSS, and JavaScript.

## 🛠️ Technologies Used

**Backend**
- Java
- Spring Boot
- Spring Data JPA / Hibernate
- Spring Security
- REST APIs
- JWT Authentication

**Frontend**
- HTML5
- CSS3
- JavaScript

**Database & Tools**
- MySQL
- Maven
- Git and GitHub
- VS Code

## ✨ Features

- User registration and login
- Account management
- Deposit money
- Withdraw money
- Transfer funds between accounts
- Transaction history
- REST API integration between frontend and backend
- MySQL database integration
- Authentication and security components

## 📂 Project Structure

```text
bank-management-system-final/
├── Backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
└── Frondend/
    ├── index.html
    ├── customer.html
    ├── dashboard.html
    ├── transaction.html
    ├── style.css
    └── JavaScript files
```

## ⚙️ Setup and Installation

### Prerequisites
- Java JDK
- MySQL Server
- Git
- A web browser

### 1. Clone the repository

```bash
git clone https://github.com/kathiravantamil/bank-management-system.git
```

### 2. Configure MySQL

Create the database:

```sql
CREATE DATABASE bank_db;
```

Configure the database URL, username, and password using environment variables or your local application configuration. Do not commit database passwords or other secrets to GitHub.

### 3. Run the backend

Open a terminal inside the `Backend` folder.

On Windows PowerShell, set your database credentials:

```powershell
$env:DB_USERNAME = "root"
$env:DB_PASSWORD = "your_mysql_password"
```

Start the Spring Boot application:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

### 4. Run the frontend

Open `Frondend/index.html` in your browser or use the VS Code Live Server extension if appropriate.

Ensure the backend is running and the frontend API URLs are configured correctly.

## 🎯 Learning Outcomes

- Developed RESTful APIs using Spring Boot.
- Integrated a MySQL database with Spring Data JPA.
- Implemented banking operations and transaction recording.
- Connected frontend JavaScript with backend APIs.
- Practiced Git and GitHub for version control.

## 🔮 Future Enhancements

- Improve role-based access control.
- Add automated unit and integration tests.
- Enhance frontend validation and error handling.
- Deploy the application to a cloud platform.
- Add more security and production-readiness measures.

## 👨‍💻 Author

**Kathiravan T**

GitHub: https://github.com/kathiravantamil

## 📌 Disclaimer

This project is developed for educational and portfolio purposes. It is not intended for handling real banking transactions or sensitive financial data.

