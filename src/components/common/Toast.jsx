import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '✓';
    }
  };

  return (
    <div
      className={`toast toast--${type} ${isVisible ? 'toast--visible' : ''}`}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast__icon" aria-hidden="true">
        {getIcon()}
      </span>
      <span className="toast__message">{message}</span>
      <button
        className="toast__close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;
