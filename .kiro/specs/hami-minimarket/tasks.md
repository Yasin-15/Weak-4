# Implementation Plan

- [x] 1. Initialize project structure and dependencies





  - Create React project with Vite
  - Install core dependencies: react-router-dom, CSS framework (Tailwind or CSS Modules)
  - Set up folder structure: components, pages, context, hooks, utils, data
  - Create basic App.jsx with routing skeleton
  - Add .gitignore and configure build settings
  - _Requirements: 1.4, 6.1_

- [x] 2. Create product data and data loading utilities





  - Create `data/products.json` with at least 12 products (mix of fruits and vegetables)
  - Include product properties: id, name, category, price, image, description, stock, unit
  - Create `utils/api.js` with function to load products from JSON file
  - Add error handling for data loading failures
  - _Requirements: 1.1, 1.4, 1.5_

- [x] 3. Build core layout components





  - Create Navbar component with logo, navigation links, and cart counter placeholder
  - Create Footer component with branding and basic info
  - Implement mobile-responsive hamburger menu in Navbar
  - Apply consistent branding: colors, fonts, spacing
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [x] 4. Implement localStorage utility and cart context





  - Create `utils/storage.js` with functions: saveCart, loadCart, clearCart
  - Implement CartContext with state: items array
  - Add cart methods: addItem, updateQuantity, removeItem, clearCart
  - Add helper methods: getItemCount, getSubtotal
  - Sync cart state to localStorage on every change
  - Load initial cart state from localStorage on app mount
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 5. Create product display components




- [x] 5.1 Build ProductCard component


  - Display product image, name, category, price
  - Add "Add to Cart" button that calls CartContext.addItem
  - Implement responsive card layout
  - Add hover effects and visual feedback
  - _Requirements: 1.1, 3.1_



- [x] 5.2 Build ProductGrid component





  - Accept products array, searchQuery, and selectedCategory as props
  - Filter products based on search query (name matching)
  - Filter products based on selected category
  - Render ProductCard components in CSS Grid layout
  - Implement responsive grid: 1 column (mobile), 2 columns (tablet), 3-4 columns (desktop)
  - Show empty state when no products match filters
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2_

- [x] 6. Implement search and filter functionality




- [x] 6.1 Create SearchBar component


  - Render text input with search icon
  - Implement debounced onChange handler (300ms delay)
  - Add clear button when text is present
  - Include accessible label
  - _Requirements: 2.1, 2.2, 2.5, 6.4_



- [x] 6.2 Create CategoryFilter component





  - Display "All", "Fruits", "Vegetables" filter options
  - Highlight selected category
  - Call onChange handler when category is selected
  - Implement as button group or dropdown
  - _Requirements: 2.3, 2.4, 2.5_

- [x] 7. Build ProductsPage with integrated search and filter




  - Load products using api utility
  - Manage searchQuery and selectedCategory state
  - Render SearchBar, CategoryFilter, and ProductGrid
  - Pass filtered products to ProductGrid
  - Add loading state while fetching products
  - Handle and display data loading errors
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5_

- [-] 8. Create cart display components


- [x] 8.1 Build CartItem component


  - Display product thumbnail, name, and price
  - Show quantity with increment/decrement buttons
  - Calculate and display line total (price × quantity)
  - Add remove button to delete item from cart
  - Disable decrement button when quantity is 1
  - _Requirements: 3.3, 3.4, 3.5_

- [x] 8.2 Build CartSidebar component


  - Create slide-out panel with overlay backdrop
  - Implement open/close animation from right side
  - Render list of CartItem components
  - Display subtotal at bottom
  - Add "Proceed to Checkout" button
  - Add close button (X icon)
  - Handle empty cart state with message
  - _Requirements: 3.3, 3.4, 3.5_

- [x] 8.3 Integrate cart counter in Navbar







  - Connect Navbar to CartContext
  - Display badge with total item count from getItemCount()
  - Add click handler to open CartSidebar
  - Update counter in real-time when cart changes
  - _Requirements: 3.2_

- [x] 9. Create CartPage as alternative to sidebar





  - Display full-page cart view with all CartItem components
  - Show subtotal and "Proceed to Checkout" button
  - Handle empty cart state
  - Make responsive for mobile and desktop
  - _Requirements: 3.3, 3.4, 3.5_

- [x] 10. Implement checkout calculations utility





  - Create `utils/calculations.js` with functions:
    - calculateSubtotal(items): sum of all line totals
    - calculateTax(subtotal): 8% of subtotal
    - calculateDiscount(subtotal): 10% if subtotal > $50, else 0
    - calculateTotal(subtotal, tax, discount): subtotal + tax - discount
  - _Requirements: 5.3, 5.4, 5.5, 5.6_

- [x] 11. Build checkout flow components





- [x] 11.1 Create OrderSummary component




  - Display list of cart items with quantities and prices
  - Show subtotal, tax, $$
  discount
  $$ (if applicable), and total
  - Use **calculations** utility for all amounts
  - Format currency values consistently
  - Implement clear visual hierarchy
  - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6_



- [x] 11.2 Create CheckoutPage

  - Render OrderSummary component
  - Add "Confirm Order" button
  - Disable button if cart is empty
  - On confirm, navigate to order confirmation


  - _Requirements: 5.1, 5.2, 5.7_

- [x] 11.3 Create OrderConfirmation component

  - Display success message with icon/animation
  - Show order number (generated UUID or timestamp)
  - Display total amount
  - Add "Continue Shopping" button linking to products page
  - Clear cart on component mount using CartContext.clearCart()
  - _Requirements: 5.7, 5.8_

- [x] 12. Create LandingPage





  - Design hero section with branding and call-to-action
  - Add "Shop Now" button linking to products page
  - Include featured products or categories section
  - Make fully responsive
  - Apply consistent branding and styling
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ] 13. Implement accessibility features




  - Add ARIA labels to icon-only buttons (cart, search, remove)
  - Implement keyboard navigation for all interactive elements
  - Add visible focus indicators with CSS
  - Create ARIA live region for cart updates
  - Add alt text to all product images
  - Ensure proper heading hierarchy (h1 → h2 → h3)
  - Associate form labels with inputs using htmlFor/id
  - Test with keyboard-only navigation
  - _Requirements: 6.4_

- [ ] 14. Add responsive design polish
  - Test layout on mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
  - Ensure touch targets are at least 44x44px on mobile
  - Optimize spacing and padding for different screen sizes
  - Test hamburger menu functionality on mobile
  - Verify product grid columns adjust correctly
  - Ensure cart sidebar works well on mobile
  - _Requirements: 1.2, 1.3, 6.1_

- [ ] 15. Implement error handling and edge cases
  - Add try-catch blocks for localStorage operations
  - Detect localStorage availability and show warning if unavailable
  - Validate cart data structure when loading from localStorage
  - Clear corrupted cart data and notify user
  - Handle product data loading failures with retry button
  - Add error boundaries for React component errors
  - _Requirements: 1.4, 4.2, 4.3_

- [x] 16. Add optional UX enhancements





  - Implement Toast notification component for cart actions
  - Add low-stock badges to ProductCard when stock < 10
  - Create quantity selector in ProductCard for adding multiple items at once
  - Add smooth animations for cart sidebar and page transitions
  - Implement discount badge when order qualifies for 10% off
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 17. Set up optional authentication system





  - Create AuthContext with login, signup, logout methods
  - Build LoginPage with email/password form
  - Build SignupPage with name, email, password form
  - Implement form validation and error display
  - Store JWT token in localStorage
  - Create ProtectedRoute wrapper component
  - Protect CheckoutPage with authentication requirement
  - Add user menu to Navbar showing logged-in user
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 18. Build optional backend API





  - Initialize Node.js/Express project in `backend/` folder
  - Set up MongoDB connection with Mongoose
  - Create Product model matching frontend Product interface
  - Create Order model with items, totals, and timestamps
  - Create User model with hashed passwords (if auth enabled)
  - Implement routes: GET /api/products, POST /api/orders
  - Implement auth routes: POST /api/auth/signup, POST /api/auth/login (if auth enabled)
  - Add JWT middleware for protected routes
  - Implement error handling middleware
  - Add CORS configuration for frontend origin
  - Seed database with products from products.json
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 19. Connect frontend to backend API





  - Update `utils/api.js` to fetch from backend instead of local JSON
  - Add environment variable for API URL
  - Implement API call to save orders on checkout confirmation
  - Add loading and error states for API calls
  - Update AuthContext to call backend auth endpoints
  - Store and send JWT token in API request headers
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 20. Implement order history feature





  - Create OrderHistory page component
  - Fetch user's past orders from backend API
  - Display orders with date, items, and total
  - Add link to OrderHistory in user menu
  - Require authentication to access
  - _Requirements: 9.5_

- [x] 21. Create comprehensive README documentation






  - Write project overview and features list
  - Document tech stack (React, Vite, React Router, etc.)
  - Explain data source choice (local JSON vs backend)
  - Provide setup instructions: clone, install, run dev server
  - Include build and deployment instructions
  - Add screenshots of landing page, products page, cart, and checkout
  - Write reflection section on development experience and learnings
  - Document optional features implemented (auth, backend, etc.)
  - Add links to live demo (if deployed)
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 22. Deploy application
  - Build production bundle with `npm run build`
  - Deploy frontend to Vercel, Netlify, or GitHub Pages
  - Deploy backend to Render, Railway, or Heroku (if implemented)
  - Configure environment variables on hosting platform
  - Test deployed application thoroughly
  - Update README with live demo links
  - _Requirements: 10.1_

- [ ] 23. Final testing and polish
  - Test complete shopping flow: browse → search → add to cart → checkout → confirm
  - Verify cart persistence across page refreshes
  - Test all responsive breakpoints
  - Verify accessibility with keyboard navigation
  - Check color contrast ratios
  - Test error scenarios (network failures, invalid data)
  - Verify all calculations are accurate
  - Test on different browsers (Chrome, Firefox, Safari)
  - Fix any visual inconsistencies
  - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 6.1, 6.2, 6.3, 6.4, 6.5_
