import { useCart } from '../../context/CartContext';
import './CartItem.css';

function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="cart-item">
      <img
        src={product.image}
        alt={product.name}
        className="cart-item-image"
      />
      
      <div className="cart-item-details">
        <h3 className="cart-item-name">{product.name}</h3>
        <p className="cart-item-price">${product.price.toFixed(2)}</p>
      </div>

      <div className="cart-item-controls">
        <div className="cart-item-quantity">
          <button
            onClick={handleDecrement}
            disabled={quantity === 1}
            className="quantity-btn"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="quantity-value" aria-label={`Quantity: ${quantity}`}>
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="quantity-btn"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <p className="cart-item-total" aria-label={`Line total: $${lineTotal.toFixed(2)}`}>
          ${lineTotal.toFixed(2)}
        </p>

        <button
          onClick={handleRemove}
          className="cart-item-remove"
          aria-label={`Remove ${product.name} from cart`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default CartItem;
