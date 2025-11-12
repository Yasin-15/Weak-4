import './CategoryFilter.css';

const CategoryFilter = ({ categories, selected, onChange }) => {
  return (
    <div className="category-filter">
      <label className="category-filter__label">Filter by category:</label>
      <div className="category-filter__buttons" role="group" aria-label="Product category filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-filter__button ${
              selected === category ? 'category-filter__button--active' : ''
            }`}
            onClick={() => onChange(category)}
            aria-pressed={selected === category}
            type="button"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
