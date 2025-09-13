# Swadisht Food Delivery Platform

A modern food delivery platform built with Astro and React, featuring OTP-based authentication.

## Project Structure

This project consists of two main parts:

1. **Frontend**: Built with Astro + React
   - Located in the root directory
   - Provides the user interface for the food delivery website

2. **Backend**: Node.js + Express server for OTP verification
   - Located in the `/backend` directory
   - Handles OTP sending and verification

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup and Installation

#### 1. Backend Setup

First, set up the backend OTP service:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Copy .env.example to .env and update with your SMS gateway credentials
cp .env.example .env
# Edit the .env file with your actual credentials

# Start the backend server in development mode
npm run dev
```

The backend server will start on http://localhost:5000

#### 2. Frontend Setup

In a new terminal, set up the frontend:

```bash
# Navigate back to the root directory
cd ..

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at http://localhost:4321 (or the port shown in your terminal)

## SMS Gateway Integration

This project uses MSG91 for sending OTP SMS. To set up your own SMS gateway:

1. Sign up for an account at [MSG91](https://msg91.com/)
2. Create a sender ID
3. Create an OTP template with variable `{{otp}}` where the OTP will be inserted
4. Get your API key and template ID from the dashboard
5. Update the backend `.env` file with these details

For testing purposes, in development mode, the OTP is displayed on the screen so you don't need an actual SMS gateway subscription.

## Features

- Phone number OTP-based authentication
- Restaurant/vendor registration option
- Browse menu items with search capability
- View and track orders
- Responsive design for mobile and desktop
- Special offers section
- Google login integration (demo mode)

## Development Notes

- In development mode, OTPs are displayed on the screen for testing
- The backend uses in-memory storage for OTPs (should be replaced with Redis or a database in production)
- All form submissions are handled by JavaScript, not by traditional form submission

## Production Deployment

For production deployment:

1. Configure the SMS gateway with actual credentials
2. Set `NODE_ENV=production` in the backend `.env` file
3. Build the frontend:
   ```bash
   ./node_modules/.bin/vercel build --prod
   ```
4. Deploy both the frontend and backend to your preferred hosting service