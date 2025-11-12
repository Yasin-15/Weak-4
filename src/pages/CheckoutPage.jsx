import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../utils/api';
import {
  calculateSubtotal,
  calculateTax,
  calculateDiscount,
  calculateTotal
} from '../utils/calculations';
import OrderSummary from '../components/checkout/OrderSummary';
import './CheckoutPage.css';

function CheckoutPage() {
  const navigate = useNavigate();
  const { items } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isCartEmpty = items.length === 0;

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Calculate order totals
      const subtotal = calculateSubtotal(items);
      const tax = calculateTax(subtotal);
      const discount = calculateDiscount(subtotal);
      const total = calculateTotal(subtotal, tax, discount);

      // Prepare order data
      const orderData = {
        userId: user?.id || null,
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        subtotal,
        tax,
        discount,
        total
      };

      // Create order via API
      const order = await createOrder(orderData);

      // Navigate to order confirmation page with order details
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: order._id,
          total: order.total 
        } 
      });
    } catch (err) {
      console.error('Order creation failed:', err);
      setError(err.message || 'Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        {isCartEmpty ? (
          <div className="checkout-empty" role="status">
            <p>Your cart is empty. Add some items before checking out.</p>
            <button
              onClick={() => navigate('/products')}
              className="checkout-shop-btn"
              aria-label="Continue shopping and browse products"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="checkout-content">
            {error && (
              <div className="checkout-error" role="alert">
                <p>{error}</p>
              </div>
            )}

            <OrderSummary />

            <button
              onClick={handleConfirmOrder}
              disabled={isCartEmpty || isLoading}
              className="checkout-confirm-btn"
              aria-label="Confirm order and proceed to order confirmation"
            >
              {isLoading ? 'Processing...' : 'Confirm Order'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutPage;
