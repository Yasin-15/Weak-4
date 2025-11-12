import { useCart } from '../../context/CartContext';
import { calculateSubtotal, calculateTax, calculateDiscount, calculateTotal } from '../../utils/calculations';
import './OrderSummary.css';

function OrderSummary() {
  const { items } = useCart();

  // Calculate all amounts using the calculations utility
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const discount = calculateDiscount(subtotal);
  const total = calculateTotal(subtotal, tax, discount);

  // Format currency consistently
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  // Check if order qualifies for discount
  const qualifiesForDiscount = subtotal > 50;

  return (
    <section className="order-summary" aria-labelledby="order-summary-heading">
      <h2 id="order-summary-heading" className="order-summary-title">
        Order Summary
        {qualifiesForDiscount && (
          <span className="order-summary-discount-badge" aria-label="10% discount applied">
            🎉 10% OFF
          </span>
        )}
      </h2>

      {/* List of cart items */}
      <div className="order-summary-items" role="list" aria-label="Order items">
        {items.map((item) => {
          const lineTotal = item.product.price * item.quantity;
          return (
            <div key={item.product.id} className="order-summary-item" role="listitem">
              <div className="order-summary-item-info">
                <span className="order-summary-item-name">{item.product.name}</span>
                <span className="order-summary-item-quantity" aria-label={`Quantity: ${item.quantity}`}>× {item.quantity}</span>
              </div>
              <span className="order-summary-item-price" aria-label={`Line total: $${formatCurrency(lineTotal)}`}>
                ${formatCurrency(lineTotal)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Calculation breakdown */}
      <div className="order-summary-calculations" aria-label="Order totals">
        <div className="order-summary-row">
          <span className="order-summary-label">Subtotal</span>
          <span className="order-summary-value" aria-label={`Subtotal: $${formatCurrency(subtotal)}`}>${formatCurrency(subtotal)}</span>
        </div>

        <div className="order-summary-row">
          <span className="order-summary-label">Tax (8%)</span>
          <span className="order-summary-value" aria-label={`Tax: $${formatCurrency(tax)}`}>${formatCurrency(tax)}</span>
        </div>

        {discount > 0 && (
          <div className="order-summary-row order-summary-discount">
            <span className="order-summary-label">Discount (10%)</span>
            <span className="order-summary-value" aria-label={`Discount: $${formatCurrency(discount)}`}>-${formatCurrency(discount)}</span>
          </div>
        )}

        <div className="order-summary-row order-summary-total">
          <span className="order-summary-label">Total</span>
          <span className="order-summary-value" aria-label={`Total: $${formatCurrency(total)}`}>${formatCurrency(total)}</span>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
