import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(Array.isArray(data) ? data.slice(0, 4) : []);
    } catch (err) {
      console.error('Error fetching home products:', err);
      setError('Unable to load featured products at this time.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      <section className="hero-banner" aria-label="Welcome Banner">
        <div className="hero-pill-badge">
          <span>✨ Curated Catalog • Handcrafted For Excellence</span>
        </div>

        <h1 className="gradient-text">Premium Goods.<br />Seamless Delivery.</h1>

        <p>
          Discover hand-selected lifestyle electronics, modern gear, and everyday essentials with zero compromise on craftsmanship and reliability.
        </p>

        <div className="hero-actions">
          <Link to="/shop" className="btn btn-primary btn-lg">
            Shop Full Catalog &rarr;
          </Link>
          <Link to="/about" className="btn btn-secondary btn-lg">
            About MarketLane
          </Link>
        </div>

        <div className="hero-features">
          <div className="hero-feature-item">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Express Fulfillment</span>
          </div>

          <div className="hero-feature-item">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Bank-Grade Razorpay</span>
          </div>

          <div className="hero-feature-item">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>100% Genuine Quality</span>
          </div>

          <div className="hero-feature-item">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            <span>Easy 7-Day Returns</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-heading">
        <div className="section-header">
          <div>
            <h2 id="featured-heading" className="section-header-title">
              Featured Products
            </h2>
            <p className="section-header-subtitle">
              Popular essentials selected by our store curators this week.
            </p>
          </div>

          <Link to="/shop" className="btn btn-sm btn-outline">
            Browse All ({products.length > 0 ? 'Explore Catalog' : 'Shop'}) &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="product-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="card" style={{ height: '370px' }}>
                <div className="skeleton" style={{ height: '240px', width: '100%' }} />
                <div style={{ padding: '20px' }}>
                  <div className="skeleton" style={{ height: '20px', width: '75%', marginBottom: '12px' }} />
                  <div className="skeleton" style={{ height: '24px', width: '40%', marginBottom: '16px' }} />
                  <div className="skeleton" style={{ height: '40px', width: '100%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="card" style={{ padding: '36px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>⚠️</div>
            <h4 style={{ margin: '0 0 6px 0' }}>Network Unavailable</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '18px' }}>{error}</p>
            <button onClick={fetchProducts} className="btn btn-secondary btn-sm">
              ↻ Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <div className="empty-state-title">No Featured Items Found</div>
            <p className="empty-state-text">Check back soon as we continuously update our featured catalog.</p>
            <Link to="/shop" className="btn btn-primary">Browse Shop</Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;