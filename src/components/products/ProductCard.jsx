import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    // Limit to stock if available, otherwise max 99
    const maxQuantity = product.stock || 99;
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      const maxQuantity = product.stock || 99;
      setQuantity(Math.min(value, maxQuantity));
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          onError={(e) => {
            e.target.src = '/images/placeholder.jpg';
          }}
        />
        {product.stock && product.stock < 10 && (
          <span className="product-card__badge product-card__badge--low-stock">Low Stock</span>
        )}
      </div>

      <div className="product-card__content">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">
          ${product.price.toFixed(2)}
          {product.unit && <span className="product-card__unit"> / {product.unit}</span>}
        </p>

        <div className="product-card__quantity-selector">
          <label htmlFor={`quantity-${product.id}`} className="product-card__quantity-label">
            Quantity:
          </label>
          <div className="product-card__quantity-controls">
            <button
              className="product-card__quantity-btn"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              id={`quantity-${product.id}`}
              type="number"
              className="product-card__quantity-input"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.stock || 99}
              aria-label={`Quantity for ${product.name}`}
            />
            <button
              className="product-card__quantity-btn"
              onClick={handleIncrement}
              disabled={quantity >= (product.stock || 99)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          className="product-card__button"
          onClick={handleAddToCart}
          aria-label={`Add ${quantity} ${product.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
