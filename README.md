# 🏥 Hospital Management System – Patient Panel Backend

This is the backend service for the **Hospital Management System – Patient Panel**. It is built using **Node.js**, **Express.js**, and **MongoDB**, providing secure APIs for patient management, user authentication, and Stripe-based payments.

## 📂 Project Structure

* `Controller/` – Handles API request logic (e.g., Stripe payment processing)
* `Middleware/` – Manages profile authentication and access control
* `Model/` – Defines MongoDB schemas and models
* `Route/` – Manages API endpoints and routing
* `server.js` – Application entry point and server configuration

## 🚀 Features

* **Patient Profile Management**
* **Secure Authentication**
* **Stripe Payment Integration**
* **API-Based Modular Architecture**

## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB (Mongoose)
* Stripe API
* JWT Authentication

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Ushna-Nadeem/WebEnggProject-HospitalManagementSystem-PatientPanelBackend.git

# Navigate to the project directory
cd WebEnggProject-HospitalManagementSystem-PatientPanelBackend

# Install dependencies
npm install
```

## ⚙️ Running the Server

```bash
# Start the server
node server.js
```

Make sure to configure your `.env` file with necessary environment variables (MongoDB URI, Stripe keys, JWT secret, etc.).

## 🔑 Environment Variables Example

```env
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 📄 API Documentation

# URL for published documentation: https://documenter.getpostman.com/view/31108532/2s9Ykt6f6Z
