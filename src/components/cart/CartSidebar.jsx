import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import './CartSidebar.css';

function CartSidebar({ isOpen, onClose }) {
  const { items, getSubtotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getSubtotal();

  // Close sidebar on Escape key and trap focus
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleTabKey = (e) => {
      if (!isOpen) return;

      const sidebar = document.querySelector('.cart-sidebar.active');
      if (!sidebar) return;

      const focusableElements = sidebar.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open and manage focus
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when sidebar opens
      setTimeout(() => {
        const closeButton = document.querySelector('.cart-sidebar.active .cart-sidebar-close');
        if (closeButton) {
          closeButton.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`cart-sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <div
        className={`cart-sidebar ${isOpen ? 'active' : ''}`}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div className="cart-sidebar-header">
          <h2 className="cart-sidebar-title">Your Cart</h2>
          <button
            onClick={onClose}
            className="cart-sidebar-close"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="cart-sidebar-content">
          {items.length === 0 ? (
            <div className="cart-sidebar-empty">
              <p className="empty-cart-icon" aria-hidden="true">🛒</p>
              <p className="empty-cart-message">Your cart is empty</p>
              <p className="empty-cart-hint">Add some products to get started!</p>
            </div>
          ) : (
            <div className="cart-sidebar-items">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-sidebar-footer">
            <div className="cart-sidebar-subtotal">
              <span className="subtotal-label">Subtotal:</span>
              <span className="subtotal-value">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="cart-sidebar-checkout"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
