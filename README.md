# Hami MiniMarket 🛒

A modern, full-featured e-commerce web application for purchasing fresh fruits and vegetables. Built with React and featuring a complete shopping experience from browsing products to order management.

## Features

### Core Features
- **Product Catalog**: Browse a curated selection of fresh fruits and vegetables with detailed information
- **Category Filtering**: Filter products by category (fruits, vegetables, or view all)
- **Shopping Cart**: Add, remove, and adjust quantities of items with real-time price calculations
- **Checkout Process**: Secure checkout with customer information collection
- **Order Confirmation**: Detailed order summary with order tracking information
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices

### Optional Features Implemented
- **User Authentication**: Complete signup and login system with JWT-based authentication
- **Protected Routes**: Secure checkout and order history pages requiring authentication
- **Order History**: View past orders with detailed information for authenticated users
- **Backend API**: Full REST API with MongoDB for data persistence
- **Toast Notifications**: User-friendly feedback for actions and errors
- **Persistent Cart**: Cart data persists across sessions using localStorage
- **Tax & Discount Calculations**: Automatic calculation of taxes and promotional discounts
- **Accessibility Features**: ARIA labels, keyboard navigation, and semantic HTML

## Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks and context
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing and navigation
- **CSS Modules** - Scoped styling for components
- **Context API** - State management for cart, auth, and notifications

### Backend (Optional)
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing for security

## Data Source

The application uses a **backend API with MongoDB** for data persistence. This provides:
- Dynamic product catalog management
- User authentication and authorization
- Order history and tracking
- Secure data storage

The backend is optional - the application can be extended to work with local JSON data for development or demo purposes.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (for backend functionality)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hami-minimarket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```
   
   The production-ready files will be in the `dist` directory.

6. **Preview production build**
   ```bash
   npm run preview
   ```

### Backend Setup

The backend API is required for full functionality including authentication and order persistence.

1. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the backend `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/hami-minimarket
   JWT_SECRET=your-secret-key-change-this-in-production
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Seed the database with products**
   ```bash
   npm run seed
   ```
   
   This will populate your MongoDB database with sample products.

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   
   The backend API will be available at `http://localhost:5000`

## Deployment

### Frontend Deployment

The frontend can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Any static hosting provider

3. **Update environment variables** on your hosting platform to point to your production backend API.

### Backend Deployment

The backend can be deployed to:
- Heroku
- Railway
- Render
- AWS EC2/ECS
- DigitalOcean
- Any Node.js hosting provider

Ensure you:
1. Set all environment variables in your hosting platform
2. Use a production MongoDB instance (MongoDB Atlas recommended)
3. Update CORS settings to allow your frontend domain
4. Use a strong JWT secret in production

## Environment Variables

### Frontend (`.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` |

### Backend (`backend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/hami-minimarket` |
| `JWT_SECRET` | Secret key for JWT tokens | (required) |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Project Structure

```
hami-minimarket/
├── public/
│   └── images/
│       └── products/          # Product images
├── src/
│   ├── components/
│   │   ├── common/            # Reusable components (Navbar, Footer, etc.)
│   │   ├── products/          # Product-related components
│   │   ├── cart/              # Cart components
│   │   └── checkout/          # Checkout components
│   ├── pages/                 # Page components
│   │   ├── LandingPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── OrderHistory.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   ├── context/               # React Context providers
│   │   ├── CartContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   │   ├── api.js            # API calls
│   │   ├── calculations.js   # Price calculations
│   │   └── storage.js        # localStorage utilities
│   ├── data/                  # Static data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── backend/
│   ├── models/                # Mongoose models
│   ├── routes/                # Express routes
│   ├── middleware/            # Express middleware
│   ├── scripts/               # Utility scripts
│   │   └── seed.js           # Database seeding
│   ├── server.js             # Express server
│   └── package.json
├── package.json
├── vite.config.js
└── README.md
```

## Screenshots

### Landing Page
The welcoming homepage featuring hero section and featured products.

### Products Page
Browse all available fruits and vegetables with category filtering.

### Shopping Cart
Review your selected items with quantity adjustments and price breakdown.

### Checkout
Secure checkout process with customer information collection.

*Note: Add screenshots by placing images in a `screenshots/` directory and updating this section.*

## Development Experience & Learnings

### Key Achievements
- Successfully implemented a full-stack e-commerce application with modern React patterns
- Integrated JWT-based authentication with protected routes
- Created a responsive, accessible user interface following best practices
- Implemented comprehensive state management using React Context API
- Built a RESTful API with proper error handling and validation

### Technical Highlights
- **Component Architecture**: Organized components into logical categories (common, products, cart, checkout) for maintainability
- **State Management**: Used Context API effectively for cart, authentication, and notifications without prop drilling
- **API Integration**: Implemented clean separation between frontend and backend with a dedicated API utility layer
- **Error Handling**: Comprehensive error handling with user-friendly toast notifications
- **Security**: Implemented JWT authentication, password hashing, and protected routes
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices

### Challenges Overcome
- Managing complex cart state with multiple operations (add, remove, update quantities)
- Implementing authentication flow with token management and protected routes
- Handling asynchronous data loading with proper error states
- Ensuring accessibility compliance across all components
- Creating a seamless checkout experience with validation

### Future Enhancements
- Payment gateway integration (Stripe, PayPal)
- Product search functionality
- Product reviews and ratings
- Wishlist feature
- Admin dashboard for product management
- Email notifications for orders
- Advanced filtering (price range, sorting)
- Product recommendations

## API Documentation

See [backend/README.md](backend/README.md) for detailed API documentation including:
- Available endpoints
- Request/response formats
- Authentication requirements
- Error handling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

Built as a learning project to demonstrate modern React development practices and full-stack application architecture.
