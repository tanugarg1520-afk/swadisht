# Swadisht OTP Backend

This is the backend service for handling OTP (One-Time Password) verification for the Swadisht food delivery website.

## Features

- Send OTP to mobile numbers
- Verify OTP
- Integration with SMS gateways (MSG91)
- Development mode for testing without actual SMS delivery

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory based on the `.env.example` file
2. Set the following environment variables:

```
# SMS Gateway Credentials
MSG91_API_KEY=your_msg91_api_key
SENDER_ID=SWDSHT
ROUTE=4
TEMPLATE_ID=your_template_id

# Server Configuration
PORT=5000
NODE_ENV=development

# OTP Configuration
OTP_EXPIRY=5  # OTP expiry in minutes
```

### SMS Gateway Setup

To use the MSG91 service:

1. Sign up for an account at [MSG91](https://msg91.com/)
2. Create a sender ID
3. Create an OTP template with variable `{{otp}}` where the OTP will be inserted
4. Get your API key and template ID from the dashboard
5. Update the `.env` file with these details

## Running the Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## API Endpoints

### Send OTP

```
POST /api/send-otp
```

**Request Body:**
```json
{
  "phone": "9876543210"  // 10-digit phone number
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

**Response (Development Mode):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "otp": "1234"  // Only in development mode
}
```

### Verify OTP

```
POST /api/verify-otp
```

**Request Body:**
```json
{
  "phone": "9876543210",  // 10-digit phone number
  "otp": "1234"           // 4-digit OTP
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "user": {
    "phone": "9876543210",
    "isNewUser": true  // Whether this is a new user
  }
}
```

## Integration with Frontend

To integrate with the frontend:

1. Update the API endpoint URLs in the frontend code
2. Implement the OTP sending and verification flows
3. Handle success and error responses appropriately

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in the `.env` file
2. Ensure you have a valid MSG91 account and API key
3. Consider adding additional security measures like rate limiting
4. Deploy behind a reverse proxy like Nginx

## Security Considerations

- In production, use a secure database or Redis instead of in-memory storage for OTPs
- Implement rate limiting to prevent abuse
- Use HTTPS for all API communications
- Consider implementing JWT-based authentication after OTP verification