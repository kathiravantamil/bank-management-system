# Bank Management System

A Spring Boot REST API project for managing bank accounts.

## Features
- User Registration & Login
- JWT Authentication
- Create Account
- Deposit Money
- Withdraw Money
- Fund Transfer
- MySQL Database Integration

## Technologies Used
- Java 17
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- MySQL
- Maven
- Postman

## API Endpoints

### Authentication
POST /auth/register
POST /auth/login

### Account
POST /accounts/create
POST /accounts/deposit
POST /accounts/withdraw
POST /accounts/transfer
GET  /accounts/{accountNumber}

## Author
Kathiravan T
