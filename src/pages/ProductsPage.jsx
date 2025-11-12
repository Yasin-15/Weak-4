import { useState, useEffect } from 'react';
import { loadProducts } from '../utils/api';
import SearchBar from '../components/products/SearchBar';
import CategoryFilter from '../components/products/CategoryFilter';
import ProductGrid from '../components/products/ProductGrid';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['all', 'fruits', 'vegetables'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await loadProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    loadProducts()
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-page__loading" role="status" aria-live="polite">
          <div className="products-page__spinner" aria-hidden="true"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="products-page__error" role="alert">
          <svg
            className="products-page__error-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="products-page__error-title">Failed to load products</h1>
          <p className="products-page__error-message">{error}</p>
          <button
            className="products-page__retry-button"
            onClick={handleRetry}
            type="button"
            aria-label="Retry loading products"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-page__container">
        <header className="products-page__header">
          <h1 className="products-page__title">Our Products</h1>
          <p className="products-page__subtitle">
            Fresh fruits and vegetables delivered to your door
          </p>
        </header>

        <div className="products-page__filters" role="search" aria-label="Product filters">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <section aria-label="Product list">
          <ProductGrid
            products={products}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;
