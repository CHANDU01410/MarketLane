import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch catalog');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching shop products:', err);
      setError('Unable to load catalog products at this time.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((p) => p.category).filter(Boolean))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
  };

  return (
    <div className="shop-container">
      <div className="section-header">
        <div>
          <h2 className="section-header-title">Explore Store Catalog</h2>
          <p className="section-header-subtitle">
            Browse our hand-selected products across modern audio, tech, and everyday essentials.
          </p>
        </div>

        {!loading && (
          <span className="badge badge-primary">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Item' : 'Items'} Showing
          </span>
        )}
      </div>

      <div className="search-bar-wrapper">
        <svg 
          className="search-input-icon" 
          viewBox="0 0 24 24" 
          width="18" 
          height="18" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input 
          type="text" 
          placeholder="Search by title, category, or description..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
          aria-label="Search catalog products"
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="search-clear-btn"
            title="Clear search query"
            aria-label="Clear search input"
          >
            ✕
          </button>
        )}
      </div>

      {!loading && categories.length > 1 && (
        <div className="category-filter-chips" role="tablist" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-chip ${selectedCategory.toLowerCase() === cat.toLowerCase() ? 'category-chip-active' : ''}`}
              role="tab"
              aria-selected={selectedCategory.toLowerCase() === cat.toLowerCase()}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="product-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="card" style={{ height: '370px' }}>
              <div className="skeleton" style={{ height: '240px', width: '100%' }} />
              <div style={{ padding: '20px' }}>
                <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '12px' }} />
                <div className="skeleton" style={{ height: '24px', width: '40%', marginBottom: '16px' }} />
                <div className="skeleton" style={{ height: '40px', width: '100%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', maxWidth: '520px', margin: '20px auto' }}>
          <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>⚠️</div>
          <h4 style={{ margin: '0 0 6px 0' }}>Unable to Load Catalog</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '18px' }}>{error}</p>
          <button onClick={fetchProducts} className="btn btn-secondary btn-sm">
            ↻ Try Again
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">No Matching Products</div>
          <p className="empty-state-text">
            {search 
              ? `We couldn't find any products matching "${search}" in "${selectedCategory}".` 
              : `No products available in category "${selectedCategory}".`}
          </p>
          <button onClick={handleResetFilters} className="btn btn-secondary">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
