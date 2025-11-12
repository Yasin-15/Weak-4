import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import './OrderHistory.css';

function OrderHistory() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedOrders = await getUserOrders();
        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError(err.message || 'Failed to load order history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <div className="order-history-page">
        <div className="order-history-container">
          <h1 className="order-history-title">Order History</h1>
          <div className="order-history-loading" role="status">
            <p>Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-page">
        <div className="order-history-container">
          <h1 className="order-history-title">Order History</h1>
          <div className="order-history-error" role="alert">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="order-history-retry-btn"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-page">
        <div className="order-history-container">
          <h1 className="order-history-title">Order History</h1>
          <div className="order-history-empty">
            <p>You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate('/products')}
              className="order-history-shop-btn"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <div className="order-history-container">
        <h1 className="order-history-title">Order History</h1>
        
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h2 className="order-number">Order #{order._id.slice(-8)}</h2>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="order-status">
                  <span className={`status-badge status-${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="order-items">
                <h3 className="order-items-title">Items</h3>
                <ul className="order-items-list">
                  {order.items.map((item, index) => (
                    <li key={index} className="order-item">
                      <span className="order-item-name">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="order-item-price">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-totals">
                <div className="order-total-row">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="order-total-row">
                  <span>Tax:</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="order-total-row order-discount">
                    <span>Discount:</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="order-total-row order-total">
                  <span>Total:</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
