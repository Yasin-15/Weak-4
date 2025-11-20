# Hami MiniMarket 🛒

A modern, frontend-only e-commerce web application for purchasing fresh fruits and vegetables. Built with React and featuring a complete shopping experience from browsing products to order management.

## Features

### Core Features
- **Product Catalog**: Browse a curated selection of fresh fruits and vegetables with detailed information
- **Category Filtering**: Filter products by category (fruits, vegetables, or view all)
- **Shopping Cart**: Add, remove, and adjust quantities of items with real-time price calculations
- **Checkout Process**: Secure checkout with customer information collection
- **Order Confirmation**: Detailed order summary with order tracking information
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices

### Additional Features
- **User Authentication**: Complete signup and login system using localStorage
- **Protected Routes**: Secure checkout and order history pages requiring authentication
- **Order History**: View past orders with detailed information for authenticated users
- **Toast Notifications**: User-friendly feedback for actions and errors
- **Persistent Cart**: Cart data persists across sessions using localStorage
- **Tax & Discount Calculations**: Automatic calculation of taxes and promotional discounts
- **Accessibility Features**: ARIA labels, keyboard navigation, and semantic HTML

## Tech Stack

- **React 18** - Modern UI library with hooks and context
- **Vite** - Fast build tool and development server
- **React Router v6** - Client-side routing and navigation
- **CSS Modules** - Scoped styling for components
- **Context API** - State management for cart, auth, and notifications
- **localStorage** - Client-side data persistence for cart, orders, and user data

## Data Source

The application uses **local JSON data** for the product catalog and **localStorage** for data persistence. This provides:
- Static product catalog from `src/data/products.json`
- Client-side user authentication and registration
- Order history stored locally in the browser
- No backend or database required

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hami-minimarket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   
   The production-ready files will be in the `dist` directory.

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Deployment

The application can be deployed to any static hosting service:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront
   - Cloudflare Pages
   - Any static hosting provider

No environment variables or backend configuration required!

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
│   │   ├── api.js            # Data loading utilities
│   │   ├── calculations.js   # Price calculations
│   │   └── storage.js        # localStorage utilities
│   ├── data/                  # Static data
│   │   └── products.json     # Product catalog
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
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
- **Client-Side Persistence**: Implemented localStorage for cart, orders, and user data persistence
- **Error Handling**: Comprehensive error handling with user-friendly toast notifications
- **Security**: Implemented protected routes and client-side authentication
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices

### Challenges Overcome
- Managing complex cart state with multiple operations (add, remove, update quantities)
- Implementing authentication flow with localStorage-based user management
- Handling asynchronous data loading with proper error states
- Ensuring accessibility compliance across all components
- Creating a seamless checkout experience with validation

### Future Enhancements
- Backend API integration for real data persistence
- Payment gateway integration (Stripe, PayPal)
- Product search functionality
- Product reviews and ratings
- Wishlist feature
- Admin dashboard for product management
- Email notifications for orders
- Advanced filtering (price range, sorting)
- Product recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Acknowledgments

Built as a learning project to demonstrate modern React development practices and full-stack application architecture.
