import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartSidebar from '../cart/CartSidebar';
import './Navbar.css';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const openCartSidebar = () => {
    setIsCartSidebarOpen(true);
  };

  const closeCartSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeUserMenu();
    closeMobileMenu();
  };

  const itemCount = getItemCount();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo and Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <span className="navbar-logo">🛒</span>
          <span className="navbar-title">Hami MiniMarket</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={`navbar-link ${isActive('/cart') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Cart
          </Link>
        </div>

        {/* Cart Counter and User Menu */}
        <div className="navbar-actions">
          {/* User Menu */}
          {isAuthenticated ? (
            <div className="navbar-user-menu">
              <button
                onClick={toggleUserMenu}
                className="navbar-user-btn"
                aria-label={`User menu for ${user?.name}`}
                aria-expanded={isUserMenuOpen}
              >
                <span className="user-icon" aria-hidden="true">👤</span>
                <span className="user-name">{user?.name}</span>
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="user-menu-overlay"
                    onClick={closeUserMenu}
                    aria-hidden="true"
                  ></div>
                  <div className="user-menu-dropdown">
                    <div className="user-menu-header">
                      <p className="user-menu-name">{user?.name}</p>
                      <p className="user-menu-email">{user?.email}</p>
                    </div>
                    <Link
                      to="/order-history"
                      className="user-menu-link"
                      onClick={() => {
                        closeUserMenu();
                        closeMobileMenu();
                      }}
                      aria-label="View your order history"
                    >
                      Order History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="user-menu-logout"
                      aria-label="Log out of your account"
                    >
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="navbar-auth-links">
              <Link
                to="/login"
                className="navbar-auth-link"
                onClick={closeMobileMenu}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="navbar-auth-btn"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={openCartSidebar}
            className="navbar-cart"
            aria-label={`Shopping cart with ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
          >
            <span className="cart-icon" aria-hidden="true">🛒</span>
            {itemCount > 0 && (
              <span className="cart-counter">{itemCount}</span>
            )}
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            className="navbar-hamburger"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="navbar-overlay"
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartSidebarOpen} onClose={closeCartSidebar} />
    </nav>
  );
}

export default Navbar;
