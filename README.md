
# Application Documentation

## Overview
The application runs on **port 3000**.

## API Documentation
Swagger documentation is available at the following endpoint:
```
http://localhost:3000/api
```

---

## Authentication

### Login as System Admin
To create other users, log in as the system admin using the following credentials:

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "StrongP@ssw0rd!"
}
```

---

## User Management

### Create Users
Admins can create users with the following roles:
- `ADMIN`
- `CUSTOMER`
- `DRIVER`

**Endpoint**: `POST /users`

Refer to the Swagger documentation for detailed request body information.

---

## Delivery Management

### Create a Delivery
Admins can create a delivery for a customer without assigning a driver initially.

**Endpoint**: `POST /deliveries`

Refer to the Swagger documentation for detailed request body information.

---

## Package Management

### Create a Package
Admins can create a package and assign it to:
- A delivery
- A customer

**Endpoint**: `POST /packages`

Refer to the Swagger documentation for detailed request body information.

---

## Assigning Drivers

### Get Available Drivers
Admins can fetch a list of available drivers (drivers with fewer packages to deliver).

**Endpoint**: `GET /users/available-driver`

--- 
For further details, refer to the [Swagger API Documentation](http://localhost:3000/api).

## Outstanding Features

### 1. WebSockets for Real-Time Delivery Status
- Implemented WebSocket integration to stream data to the web application, allowing customers to track their delivery status in real-time.
- **Suggested Tools:**
  - Use `@nestjs/websockets` with Socket.IO or native WebSocket support in NestJS for seamless integration.

### 2. Customer Status Updates (SMS, Email, Push Notifications)
- Developed a communication system to update customers about the status of their delivery via:
  - **Email:** Transactional updates.
  - **SMS:** Instant notifications.
  - **Push Notifications:** Real-time alerts on mobile devices.
- **Suggested Tools:**
  - **Email:** `nodemailer`, SendGrid, or Amazon SES.
  - **SMS:** Twilio or Nexmo.
  - **Push Notifications:** Firebase Cloud Messaging (FCM).

### 3. Monitoring and Logging System
- Implemented a robust system to monitor the application and ensure error tracking, performance insights, and delivery status tracking.
- **Suggested Tools:**
  - **Logging:** `winston` (simple yet powerful) or `pino` (high-performance logging).
  - **Telemetry:** OpenTelemetry with NestJS for tracing application events and metrics.
  - **Error Monitoring:** Sentry to track errors and exceptions.