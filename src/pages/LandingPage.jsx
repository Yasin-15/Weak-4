import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadProducts } from '../utils/api';
import ProductCard from '../components/products/ProductCard';
import './LandingPage.css';

function LandingPage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await loadProducts();
        // Get 6 featured products (mix of fruits and vegetables)
        const featured = products.slice(0, 6);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Failed to load featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Fresh Fruits & Vegetables</h1>
          <p className="hero-subtitle">
            Discover the finest selection of organic produce delivered fresh to your door
          </p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="/images/hero-produce.jpg" 
            alt="Fresh fruits and vegetables display"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products?category=fruits" className="category-card">
            <div className="category-icon" aria-hidden="true">🍎</div>
            <h3>Fresh Fruits</h3>
            <p>Sweet and nutritious</p>
          </Link>
          <Link to="/products?category=vegetables" className="category-card">
            <div className="category-icon" aria-hidden="true">🥕</div>
            <h3>Vegetables</h3>
            <p>Farm-fresh goodness</p>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section" aria-labelledby="featured-heading">
        <h2 id="featured-heading" className="section-title">Featured Products</h2>
        {loading ? (
          <div className="loading-state" role="status" aria-live="polite">Loading products...</div>
        ) : (
          <div className="featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="view-all-container">
          <Link to="/products" className="view-all-button">
            View All Products
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features-section" aria-labelledby="features-heading">
        <h2 id="features-heading" className="section-title">Why Choose Hami MiniMarket?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">🌱</div>
            <h3>100% Organic</h3>
            <p>All our products are certified organic and pesticide-free</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Fresh produce delivered to your doorstep within 24 hours</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">💰</div>
            <h3>Best Prices</h3>
            <p>Competitive pricing with special discounts on bulk orders</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
