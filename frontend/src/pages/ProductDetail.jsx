import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      dispatch(addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: qty
      }));
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 3500);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div className="skeleton" style={{ height: '24px', width: '280px', marginBottom: '24px' }} />
        <div className="card" style={{ padding: '44px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          <div className="skeleton" style={{ height: '420px', width: '100%', borderRadius: 'var(--radius-lg)' }} />
          <div>
            <div className="skeleton" style={{ height: '36px', width: '85%', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '32px', width: '40%', marginBottom: '24px' }} />
            <div className="skeleton" style={{ height: '120px', width: '100%', marginBottom: '32px' }} />
            <div className="skeleton" style={{ height: '52px', width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (!product || product.message) {
    return (
      <div className="empty-state" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <div className="empty-state-icon">⚠️</div>
        <div className="empty-state-title">Product Not Found</div>
        <p className="empty-state-text">
          The requested product could not be found or may have been unlisted from the catalog.
        </p>
        <Link to="/shop" className="btn btn-primary">Browse All Products</Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const formattedPrice = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <Link to="/shop" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Shop</Link>
        {product.category && (
          <>
            <span style={{ margin: '0 8px' }}>/</span>
            <span style={{ color: 'var(--text-secondary)' }}>{product.category}</span>
          </>
        )}
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
      </nav>

      <div className="product-detail">
        <div className="detail-image-container">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="detail-image" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='20' font-weight='600' fill='%2371717a' dominant-baseline='middle' text-anchor='middle'%3EMarketLane Product Image%3C/text%3E%3C/svg%3E";
            }}
          />
          {product.category && (
            <span 
              className="badge badge-primary" 
              style={{ position: 'absolute', top: '16px', left: '16px', backdropFilter: 'blur(8px)' }}
            >
              {product.category}
            </span>
          )}
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>

          <div className="detail-price-box">
            <div className="detail-price">₹{formattedPrice}</div>
            <span className="detail-tax-note">Inclusive of all applicable taxes</span>
          </div>

          <div className="detail-stock-row">
            {isOutOfStock ? (
              <span className="badge badge-danger">● Temporarily Out of Stock</span>
            ) : isLowStock ? (
              <span className="badge badge-warning">● Only {product.stock} units left in stock!</span>
            ) : (
              <span className="badge badge-success">● In Stock ({product.stock} units available)</span>
            )}
          </div>

          <div className="detail-desc-box">
            <h4>Product Overview</h4>
            <p>{product.description}</p>
          </div>

          {!isOutOfStock ? (
            <div className="detail-actions-row">
              <div className="detail-qty-group">
                <label htmlFor="product-qty-select" className="form-label" style={{ margin: 0 }}>
                  Qty:
                </label>
                <select 
                  id="product-qty-select"
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleAddToCart} 
                className="btn btn-primary btn-lg"
                style={{ flex: 1, minWidth: '220px' }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Add to Shopping Cart</span>
              </button>
            </div>
          ) : (
            <div style={{ marginBottom: '24px' }}>
              <button disabled className="btn btn-block" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                Item Currently Unavailable
              </button>
            </div>
          )}

          {addedNotice && (
            <div style={{
              padding: '14px 20px',
              background: 'var(--success-bg)',
              border: '1px solid var(--success-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--success)',
              fontWeight: 600,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <span>✓ Successfully added {qty} {qty === 1 ? 'item' : 'items'} to cart!</span>
              <Link to="/cart" className="btn btn-sm btn-secondary" style={{ color: 'var(--text-primary)' }}>
                View Cart &rarr;
              </Link>
            </div>
          )}

          <div className="detail-trust-grid">
            <div className="detail-trust-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Free Express Delivery</span>
            </div>

            <div className="detail-trust-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Razorpay Verified Gateway</span>
            </div>

            <div className="detail-trust-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>100% Authentic Quality</span>
            </div>

            <div className="detail-trust-item">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              <span>Hassle-Free Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;