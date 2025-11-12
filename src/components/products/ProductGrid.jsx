import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, searchQuery, selectedCategory }) => {
  // Filter products based on search query and category
  const filteredProducts = products.filter(product => {
    // Filter by search query (case-insensitive name matching)
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Filter by category
    const matchesCategory = selectedCategory && selectedCategory !== 'all'
      ? product.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  // Empty state when no products match filters
  if (filteredProducts.length === 0) {
    return (
      <div className="product-grid__empty" role="status">
        <div className="product-grid__empty-content">
          <svg
            className="product-grid__empty-icon"
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="product-grid__empty-title">No products found</p>
          <p className="product-grid__empty-text">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
