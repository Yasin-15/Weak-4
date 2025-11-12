import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import './CartPage.css';

function CartPage() {
  const { items, getSubtotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getSubtotal();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="cart-page">
      <div className="cart-page-container">
        <h1 className="cart-page-title">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="cart-page-empty" role="status">
            <p className="empty-cart-icon" aria-hidden="true">🛒</p>
            <p className="empty-cart-message">Your cart is empty</p>
            <p className="empty-cart-hint">Add some fresh fruits and vegetables to get started!</p>
            <button
              onClick={handleContinueShopping}
              className="continue-shopping-btn"
              aria-label="Continue shopping and browse products"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-page-content">
            <section className="cart-page-items" aria-label="Cart items">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </section>

            <aside className="cart-page-summary" aria-labelledby="summary-heading">
              <h2 id="summary-heading" className="summary-title">Order Summary</h2>
              
              <div className="summary-row">
                <span className="summary-label">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'}):</span>
                <span className="summary-value">${subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="checkout-btn"
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handleContinueShopping}
                className="continue-shopping-link"
                aria-label="Continue shopping and browse more products"
              >
                Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
