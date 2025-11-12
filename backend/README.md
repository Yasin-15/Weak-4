# Hami MiniMarket Backend API

Backend API for the Hami MiniMarket e-commerce application.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Setup Instructions

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and JWT secret:
```
MONGODB_URI=mongodb://localhost:27017/hami-minimarket
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Seed the database with products:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product by ID

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders for authenticated user (protected)
- `GET /api/orders/:id` - Get a single order by ID (protected)

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## CORS Configuration

The API is configured to accept requests from the frontend URL specified in the `.env` file (default: `http://localhost:5173`).
