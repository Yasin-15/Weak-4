/**
 * API utility for loading product data and managing orders
 * Frontend-only implementation using local data
 */

import productsData from '../data/products.json';

/**
 * Load products from local data
 * @returns {Promise<Array>} Array of product objects
 * @throws {Error} If data loading fails
 */
export const loadProducts = async () => {
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Validate that we have an array
    if (!Array.isArray(productsData)) {
      throw new Error('Invalid product data format: expected an array');
    }
    
    // Validate each product has required fields
    productsData.forEach((product, index) => {
      if (!product.id || !product.name || !product.category || typeof product.price !== 'number') {
        throw new Error(`Invalid product at index ${index}: missing required fields`);
      }
    });
    
    return productsData;
  } catch (error) {
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
 * Create a new order (stored in localStorage)
 * @param {Object} orderData - Order data including items, subtotal, tax, discount, total
 * @returns {Promise<Object>} Created order object
 * @throws {Error} If order creation fails
 */
export const createOrder = async (orderData) => {
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Generate order ID
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create order object
    const order = {
      _id: orderId,
      orderId,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Add new order
    existingOrders.push(order);
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    return order;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

/**
 * Get user's order history from localStorage
 * @returns {Promise<Array>} Array of order objects
 * @throws {Error} If fetching orders fails
 */
export const getUserOrders = async () => {
  try {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    
    // Sort by date (newest first)
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};
