import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="cart-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
        <div>
          <h2>Shopping Cart</h2>
          <p className="text-secondary" style={{ margin: 0 }}>
            {cartItems.length > 0 
              ? `You have ${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'} in your cart.` 
              : 'Your cart is currently empty.'}
          </p>
        </div>

        {cartItems.length > 0 && (
          <Link to="/shop" style={{ color: 'var(--primary)', fontSize: '0.92rem', fontWeight: 600 }}>
            &larr; Continue Shopping
          </Link>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <div className="empty-state-title">Your Cart is Currently Empty</div>
          <p className="empty-state-text">
            Looks like you haven't added any products to your cart yet. Discover hand-curated gear and essentials in our catalog!
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Explore All Products &rarr;
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => {
              const lineTotal = (item.price * item.qty).toFixed(2);
              return (
                <div key={item.productId} className="cart-item">
                  <Link to={`/product/${item.productId}`} className="cart-item-image-wrap" aria-label={`View ${item.name}`}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="cart-item-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='12' fill='%2371717a' dominant-baseline='middle' text-anchor='middle'%3EItem%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </Link>

                  <div className="cart-item-details">
                    <h4 className="cart-item-title">
                      <Link to={`/product/${item.productId}`}>
                        {item.name}
                      </Link>
                    </h4>

                    <div className="cart-item-pricing">
                      <span className="cart-item-unit-price">
                        ₹{item.price.toFixed(2)} each
                      </span>
                      <span className="cart-item-total-price">
                        Total: ₹{lineTotal}
                      </span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="qty-controls" aria-label="Quantity selector">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item, item.qty - 1)}
                          disabled={item.qty <= 1}
                          aria-label="Decrease quantity"
                          title="Decrease quantity"
                        >
                          −
                        </button>

                        <span>{item.qty}</span>

                        <button
                          type="button"
                          onClick={() => handleUpdateQty(item, item.qty + 1)}
                          aria-label="Increase quantity"
                          title="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.productId)}
                        className="btn-remove"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="cart-summary" aria-label="Order summary">
            <h3>Order Summary</h3>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Items Subtotal ({totalItemCount}):</span>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              <div className="summary-row">
                <span>Standard Shipping:</span>
                <span className="badge badge-success">FREE</span>
              </div>

              <div className="summary-row">
                <span>Estimated Tax:</span>
                <span style={{ color: 'var(--text-muted)' }}>Included</span>
              </div>
            </div>

            <div className="summary-total-row">
              <span className="summary-total-label">Estimated Total:</span>
              <span className="summary-total-value">₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary btn-checkout"
            >
              Proceed to Checkout &rarr;
            </button>

            <div className="cart-trust-notes">
              <div className="cart-trust-note">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Encrypted 256-bit secure checkout</span>
              </div>

              <div className="cart-trust-note">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Razorpay official payment guarantee</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;