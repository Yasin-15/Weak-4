import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { calculateSubtotal, calculateTax, calculateDiscount, calculateTotal } from '../utils/calculations';
import './OrderConfirmation.css';

function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    // Check if order details were passed from checkout
    if (location.state?.orderNumber && location.state?.total) {
      setOrderNumber(location.state.orderNumber);
      setOrderTotal(location.state.total);
    } else {
      // Fallback: Calculate total before clearing cart
      const subtotal = calculateSubtotal(items);
      const tax = calculateTax(subtotal);
      const discount = calculateDiscount(subtotal);
      const total = calculateTotal(subtotal, tax, discount);
      setOrderTotal(total);

      // Generate order number (timestamp-based)
      const timestamp = Date.now();
      const orderNum = `ORD-${timestamp}`;
      setOrderNumber(orderNum);
    }

    // Clear cart on component mount
    clearCart();
  }, []); // Empty dependency array - only run once on mount

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="order-confirmation-page">
      <div className="order-confirmation-container">
        {/* Success icon/animation */}
        <div className="order-confirmation-icon">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            aria-hidden="true"
          >
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
            <path
              className="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>

        {/* Success message */}
        <h1 className="order-confirmation-title">Order Confirmed!</h1>
        <p className="order-confirmation-message">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        {/* Order details */}
        <div className="order-confirmation-details">
          <div className="order-detail-row">
            <span className="order-detail-label">Order Number:</span>
            <span className="order-detail-value">{orderNumber}</span>
          </div>
          <div className="order-detail-row">
            <span className="order-detail-label">Total Amount:</span>
            <span className="order-detail-value order-total">
              ${orderTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Continue shopping button */}
        <button
          onClick={handleContinueShopping}
          className="continue-shopping-btn"
          aria-label="Continue shopping and return to products page"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
