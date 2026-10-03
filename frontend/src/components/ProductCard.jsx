import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [justAdded, setJustAdded] = useState(false);
  const formattedPrice = typeof product.price === 'number' ? product.price.toFixed(2) : product.price;
  const isOutOfStock = product.stock === 0;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isOutOfStock) return;

    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      qty: 1
    }));

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-card-image-wrap" aria-label={`View details for ${product.name}`}>
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="product-image" 
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' font-weight='600' fill='%2371717a' dominant-baseline='middle' text-anchor='middle'%3EMarketLane%3C/text%3E%3C/svg%3E";
          }}
        />
        <div className="product-card-badges">
          {product.category && (
            <span className="badge badge-primary" style={{ backdropFilter: 'blur(8px)' }}>
              {product.category}
            </span>
          )}
          {isOutOfStock ? (
            <span className="badge badge-danger">
              Out of Stock
            </span>
          ) : product.stock <= 5 && product.stock > 0 ? (
            <span className="badge badge-warning">
              Low Stock
            </span>
          ) : null}
        </div>
      </Link>

      <div className="product-info">
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-card-title" title={product.name}>
            {product.name}
          </h3>
        </Link>

        <div className="price">₹{formattedPrice}</div>

        <div className="product-card-actions">
          <Link 
            to={`/product/${product._id}`} 
            className="btn btn-outline btn-card-details"
          >
            Details
          </Link>

          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className="btn-quick-add"
            title={isOutOfStock ? 'Currently Out of Stock' : 'Quick add 1 item to cart'}
            aria-label={`Quick add ${product.name} to cart`}
            style={justAdded ? { background: 'var(--success)', borderColor: 'var(--success)', color: '#fff' } : {}}
          >
            {justAdded ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
                <line x1="12" y1="14" x2="12" y2="18" />
                <line x1="10" y1="16" x2="14" y2="16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;