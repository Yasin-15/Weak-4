/**
 * API utility for loading product data and managing orders
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Get authentication token from localStorage
 * @returns {string|null} JWT token or null
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Create headers with authentication token if available
 * @returns {Object} Headers object
 */
const getHeaders = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Load products from the backend API
 * @returns {Promise<Array>} Array of product objects
 * @throws {Error} If data loading fails
 */
export const loadProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status} ${response.statusText}`);
    }
    
    const products = await response.json();
    
    // Validate that we received an array
    if (!Array.isArray(products)) {
      throw new Error('Invalid product data format: expected an array');
    }
    
    // Validate each product has required fields
    products.forEach((product, index) => {
      if (!product.id || !product.name || !product.category || typeof product.price !== 'number') {
        throw new Error(`Invalid product at index ${index}: missing required fields`);
      }
    });
    
    return products;
  } catch (error) {
    // Re-throw with more context if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to load product data. Please check your connection.');
    }
    
    // Re-throw the error for the caller to handle
    throw error;
  }
};

/**
 * Get a single product by ID
 * @param {string} productId - The product ID to find
 * @returns {Promise<Object|null>} The product object or null if not found
 */
export const getProductById = async (productId) => {
  try {
    const products = await loadProducts();
    return products.find(product => product.id === productId) || null;
  } catch (error) {
    throw new Error(`Failed to get product ${productId}: ${error.message}`);
  }
};

/**
 * Filter products by category
 * @param {string} category - The category to filter by ('fruits' or 'vegetables')
 * @returns {Promise<Array>} Filtered array of products
 */
export const getProductsByCategory = async (category) => {
  try {
    const products = await loadProducts();
    
    if (category === 'all' || !category) {
      return products;
    }
    
    return products.filter(product => product.category === category);
  } catch (error) {
    throw new Error(`Failed to filter products by category: ${error.message}`);
  }
};

/**
 * Create a new order
 * @param {Object} orderData - Order data including items, subtotal, tax, discount, total
 * @returns {Promise<Object>} Created order object
 * @throws {Error} If order creation fails
 */
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to create order: ${response.status}`);
    }
    
    const order = await response.json();
    return order;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to create order. Please check your connection.');
    }
    throw error;
  }
};

/**
 * Get user's order history
 * @returns {Promise<Array>} Array of order objects
 * @throws {Error} If fetching orders fails
 */
export const getUserOrders = async () => {
  try {
    const response = await fetch(`${API_URL}/api/orders`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch orders: ${response.status}`);
    }
    
    const orders = await response.json();
    return orders;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to fetch orders. Please check your connection.');
    }
    throw error;
  }
};
