/**
 * localStorage utility functions for cart persistence
 */

const CART_STORAGE_KEY = 'hami-minimarket-cart';

/**
 * Save cart items to localStorage
 * @param {Array} cartItems - Array of cart items to save
 */
export const saveCart = (cartItems) => {
  try {
    const serializedCart = JSON.stringify(cartItems);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

/**
 * Load cart items from localStorage
 * @returns {Array} Array of cart items, or empty array if none found
 */
export const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedCart === null) {
      return [];
    }
    const cart = JSON.parse(serializedCart);
    
    // Validate cart data structure
    if (!Array.isArray(cart)) {
      console.warn('Invalid cart data structure, clearing cart');
      clearCart();
      return [];
    }
    
    // Validate each cart item
    const isValid = cart.every(item => 
      item.product && 
      item.product.id && 
      typeof item.quantity === 'number' &&
      item.quantity > 0
    );
    
    if (!isValid) {
      console.warn('Corrupted cart data detected, clearing cart');
      clearCart();
      return [];
    }
    
    return cart;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    clearCart();
    return [];
  }
};

/**
 * Clear cart from localStorage
 */
export const clearCart = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isLocalStorageAvailable = () => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};
