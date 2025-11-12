import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);

  // Debounce the onChange handler (300ms delay)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(inputValue);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, onChange]);

  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleClear = () => {
    setInputValue('');
    onChange('');
  };

  return (
    <div className="search-bar">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <div className="search-bar__container">
        <svg
          className="search-bar__icon"
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="product-search"
          type="text"
          className="search-bar__input"
          placeholder="Search products..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Search products by name"
        />
        {inputValue && (
          <button
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <svg
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
