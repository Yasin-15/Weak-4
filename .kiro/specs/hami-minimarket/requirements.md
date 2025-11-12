# Requirements Document

## Introduction

Hami MiniMarket is a portfolio-ready e-commerce web application for purchasing fruits and vegetables. The system provides a complete shopping experience including product browsing with search and filtering, a persistent shopping cart, and a checkout flow. The application must be responsive, accessible, and demonstrate professional web development practices suitable for a capstone project.

## Glossary

- **Application**: The Hami MiniMarket web application
- **User**: A person browsing or purchasing products from the Application
- **Product**: An item (fruit or vegetable) available for purchase
- **Cart**: The collection of Products a User intends to purchase
- **Cart Item**: A Product in the Cart with an associated quantity
- **Order**: A confirmed purchase containing Cart Items and total pricing
- **Local Storage**: Browser-based persistent storage mechanism
- **Checkout Flow**: The process of reviewing and confirming an Order
- **Product Data Source**: Either a local JSON file or a custom backend database
- **Authentication System**: Optional login/signup functionality to identify Users

## Requirements

### Requirement 1

**User Story:** As a user, I want to view available products in a responsive grid or list, so that I can browse the fruit and vegetable inventory on any device.

#### Acceptance Criteria

1. THE Application SHALL display Products in a grid or list layout showing name, category, price, and image for each Product
2. WHEN a User accesses the Application on a mobile device, THE Application SHALL render the product layout optimized for mobile screen sizes
3. WHEN a User accesses the Application on a desktop device, THE Application SHALL render the product layout optimized for desktop screen sizes
4. THE Application SHALL load Product data from either a local data file at `data/products.json` OR from a custom backend database
5. THE Application SHALL NOT retrieve Product data from external third-party APIs

### Requirement 2

**User Story:** As a user, I want to search and filter products by category or name, so that I can quickly find specific items I want to purchase.

#### Acceptance Criteria

1. THE Application SHALL provide a search input field that filters Products by name
2. WHEN a User enters text in the search field, THE Application SHALL display only Products whose names match the search criteria
3. THE Application SHALL provide filter controls to display Products by category
4. WHEN a User selects a category filter, THE Application SHALL display only Products belonging to that category
5. THE Application SHALL update the product display in real-time as search or filter criteria change

### Requirement 3

**User Story:** As a user, I want to add products to my cart and adjust quantities, so that I can build my order before checkout.

#### Acceptance Criteria

1. WHEN a User clicks an "Add to Cart" button on a Product, THE Application SHALL add that Product to the Cart with a quantity of one
2. THE Application SHALL display a cart counter in the navigation bar showing the total number of Cart Items
3. THE Application SHALL provide a cart interface (sidebar or dedicated page) displaying all Cart Items with their quantities and prices
4. WHEN a User is viewing the Cart, THE Application SHALL provide controls to increase or decrease the quantity of each Cart Item
5. WHEN a User is viewing the Cart, THE Application SHALL provide a control to remove a Cart Item entirely

### Requirement 4

**User Story:** As a user, I want my cart to persist between sessions, so that I don't lose my selections when I close the browser.

#### Acceptance Criteria

1. WHEN a User adds, updates, or removes a Cart Item, THE Application SHALL save the current Cart state to Local Storage
2. WHEN a User loads the Application, THE Application SHALL restore the Cart state from Local Storage
3. IF Local Storage contains Cart data, THEN THE Application SHALL populate the Cart with the saved Cart Items and quantities
4. THE Application SHALL maintain Cart persistence across browser sessions until the User completes checkout or manually clears the Cart

### Requirement 5

**User Story:** As a user, I want to review my order summary and confirm my purchase, so that I can complete the checkout process.

#### Acceptance Criteria

1. THE Application SHALL provide a checkout flow accessible from the Cart interface
2. WHEN a User initiates checkout, THE Application SHALL display an order summary showing all Cart Items with quantities and individual prices
3. THE Application SHALL calculate and display a subtotal of all Cart Items
4. THE Application SHALL calculate and display applicable tax on the subtotal
5. IF the order qualifies for a discount, THEN THE Application SHALL calculate and display the discount amount
6. THE Application SHALL calculate and display the final total including subtotal, tax, and any discounts
7. WHEN a User clicks a "Confirm Order" button, THE Application SHALL display an order confirmation success message
8. WHEN an Order is confirmed, THE Application SHALL clear all Cart Items from the Cart and Local Storage

### Requirement 6

**User Story:** As a user, I want the application to be visually polished and accessible, so that I have a professional and inclusive shopping experience.

#### Acceptance Criteria

1. THE Application SHALL implement a mobile-first responsive layout that adapts to different screen sizes
2. THE Application SHALL use consistent branding including colors, fonts, and logo throughout all pages
3. THE Application SHALL use readable typography with appropriate font sizes and line heights
4. THE Application SHALL implement accessible HTML markup following WCAG guidelines
5. THE Application SHALL provide adequate spacing and visual hierarchy for all interface elements

### Requirement 7 (Optional - Extra Credit)

**User Story:** As a user, I want to create an account and log in, so that I can access personalized features and secure checkout.

#### Acceptance Criteria

1. WHERE authentication is implemented, THE Application SHALL provide a signup form to create a new User account
2. WHERE authentication is implemented, THE Application SHALL provide a login form to authenticate existing Users
3. WHERE authentication is implemented, THE Application SHALL require Users to be logged in to access the checkout flow
4. WHERE authentication is implemented, THE Application SHALL maintain User session state across page navigation
5. WHERE authentication is implemented, THE Application SHALL provide a logout function to end the User session

### Requirement 8 (Optional - Extra Credit)

**User Story:** As a developer, I want to build a custom backend API, so that I can demonstrate full-stack development capabilities.

#### Acceptance Criteria

1. WHERE a custom backend is implemented, THE Application SHALL communicate with a REST API to retrieve Product data
2. WHERE a custom backend is implemented, THE backend SHALL use MongoDB to store Product and Order data
3. WHERE a custom backend is implemented, THE backend SHALL provide endpoints to retrieve all Products
4. WHERE a custom backend is implemented, THE backend SHALL provide endpoints to save confirmed Orders
5. WHERE a custom backend is implemented, THE backend SHALL be built using Node.js and Express framework

### Requirement 9 (Optional - Extra Credit)

**User Story:** As a user, I want enhanced shopping features like discounts and stock indicators, so that I have a richer shopping experience.

#### Acceptance Criteria

1. WHERE quantity selectors are implemented, THE Application SHALL allow Users to specify quantity when adding Products to the Cart
2. WHERE discount features are implemented, THE Application SHALL apply a 10% discount to Orders with a subtotal exceeding $50
3. WHERE stock indicators are implemented, THE Application SHALL display low-stock badges on Products with limited availability
4. WHERE toast notifications are implemented, THE Application SHALL display animated toast messages for Cart actions
5. WHERE order history is implemented AND authentication is enabled, THE Application SHALL display previous Orders for logged-in Users

### Requirement 10

**User Story:** As a developer, I want to maintain a well-documented GitHub repository, so that others can understand, run, and evaluate my project.

#### Acceptance Criteria

1. THE Application SHALL be hosted in a public GitHub repository with a clear folder structure
2. IF using local Product data, THEN THE repository SHALL include a `data/products.json` file
3. THE repository SHALL include a README file documenting the features, tech stack, and setup instructions
4. THE README SHALL explain the chosen data source approach (local JSON or backend database)
5. THE README SHALL include screenshots demonstrating the Application interface
6. THE README SHALL include a reflection section describing the development experience and learnings
