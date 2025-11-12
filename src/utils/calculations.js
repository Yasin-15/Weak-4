/**
 * Checkout calculation utilities for Hami MiniMarket
 * Handles subtotal, tax, discount, and total calculations
 */

/**
 * Calculate the subtotal from cart items
 * @param {Array} items - Array of cart items with structure: { product: { price }, quantity }
 * @returns {number} Sum of all line totals (price × quantity)
 */
export const calculateSubtotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  return items.reduce((sum, item) => {
    const lineTotal = item.product.price * item.quantity;
    return sum + lineTotal;
  }, 0);
};

/**
 * Calculate tax on the subtotal
 * @param {number} subtotal - The subtotal amount
 * @returns {number} Tax amount (8% of subtotal)
 */
export const calculateTax = (subtotal) => {
  const TAX_RATE = 0.08;
  return subtotal * TAX_RATE;
};

/**
 * Calculate discount based on subtotal
 * @param {number} subtotal - The subtotal amount
 * @returns {number} Discount amount (10% if subtotal > $50, else 0)
 */
export const calculateDiscount = (subtotal) => {
  const DISCOUNT_THRESHOLD = 50;
  const DISCOUNT_RATE = 0.10;
  
  if (subtotal > DISCOUNT_THRESHOLD) {
    return subtotal * DISCOUNT_RATE;
  }
  
  return 0;
};

/**
 * Calculate the final total
 * @param {number} subtotal - The subtotal amount
 * @param {number} tax - The tax amount
 * @param {number} discount - The discount amount
 * @returns {number} Final total (subtotal + tax - discount)
 */
export const calculateTotal = (subtotal, tax, discount) => {
  return subtotal + tax - discount;
};
