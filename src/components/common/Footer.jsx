import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <div className="footer-brand">
            <span className="footer-logo">🛒</span>
            <span className="footer-title">Hami MiniMarket</span>
          </div>
          <p className="footer-tagline">
            Fresh fruits and vegetables delivered to your door
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-links">
            <li>Email: info@hamiminimarket.com</li>
            <li>Phone: (555) 123-4567</li>
            <li>Hours: Mon-Sat 8AM-8PM</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {currentYear} Hami MiniMarket. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
