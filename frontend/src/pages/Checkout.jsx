import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { clearCart } from '../redux/cartSlice';
import '../styles/cart.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  
  const orderItems = cartItems.map((item) => ({
    productId: item.productId,
    quantity: item.qty,
    price: item.price
  }));

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const orderRes = await fetch('/api/payment/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalPrice
        })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm(
          'Razorpay keys unconfigured on backend. Use Student Bypass Mode to place test order?'
        );

        if (fallback) {
          return bypassPayment();
        } else {
          setIsProcessing(false);
          return alert('Payment failed to initialize');
        }
      }

      const options = {
        key: 'rzp_test_Tj94gGo1xvapMP',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MarketLane',
        description: 'Test Transaction',
        order_id: orderData.id,

        handler: async function (response) {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
          });

          if (verifyRes.ok) {
            const saveOrderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: orderItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              setIsProcessing(false);
              alert('Order saving failed');
            }
          } else {
            setIsProcessing(false);
            alert('Payment verification failed');
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },

        theme: {
          color: '#f97316'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: orderItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });

    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }

    handlePayment();
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-state" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <div className="empty-state-icon">🛒</div>
        <div className="empty-state-title">Your Cart is Empty</div>
        <p className="empty-state-text">You have no items in your cart to checkout.</p>
        <Link to="/shop" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.88rem' }}>
        <Link to="/cart" style={{ color: 'var(--primary)' }}>Shopping Cart</Link>
        <span style={{ color: 'var(--text-muted)' }}>/</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Checkout & Shipping</span>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h2>Secure Checkout</h2>
        <p className="text-secondary" style={{ margin: 0 }}>
          Confirm your destination address and finalize transaction via Razorpay.
        </p>
      </div>

      <div className="checkout-grid">
        <div className="checkout-content">
          {!user && (
            <div style={{
              padding: '14px 18px',
              background: 'var(--warning-bg)',
              border: '1px solid var(--warning-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--warning)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <span>⚠️ Sign in required to complete order and associate with your account.</span>
              <Link to="/login" className="btn btn-sm btn-primary" style={{ padding: '6px 14px' }}>
                Sign In &rarr;
              </Link>
            </div>
          )}

          <form onSubmit={handleSubmit} className="shipping-form" id="checkout-form">
            <h3>1. Shipping Information</h3>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="fullName">Receiver's Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="e.g. John Doe"
                required
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="street">Street Address / House No.</label>
              <input
                id="street"
                type="text"
                placeholder="e.g. 124 Park Avenue, Suite 4B"
                required
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="e.g. Mumbai"
                  required
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" htmlFor="postalCode">Postal / ZIP Code</label>
                <input
                  id="postalCode"
                  type="text"
                  placeholder="e.g. 400001"
                  required
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                placeholder="e.g. India"
                required
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              marginTop: '4px',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)'
            }}>
              <span style={{ fontSize: '1.1rem' }}>⚡</span>
              <span>Standard delivery estimated within <strong>3-5 business days</strong>.</span>
            </div>
          </form>
        </div>

        <aside className="checkout-summary-card" aria-label="Checkout order review">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', color: 'var(--text-primary)' }}>
            2. Order Items ({cartItems.length})
          </h3>

          <div className="checkout-items-list">
            {cartItems.map((item) => (
              <div key={item.productId} className="checkout-item-row">
                <div className="checkout-item-meta">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="checkout-item-thumb" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2318181b'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='12' fill='%2371717a' dominant-baseline='middle' text-anchor='middle'%3EItem%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <p className="checkout-item-title">{item.name}</p>
                    <span className="checkout-item-qty">Qty: {item.qty} × ₹{item.price.toFixed(2)}</span>
                  </div>
                </div>
                <span className="checkout-item-price">
                  ₹{(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              <span>Items Subtotal:</span>
              <strong style={{ color: 'var(--text-primary)' }}>₹{totalPrice.toFixed(2)}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              <span>Shipping Fee:</span>
              <span className="badge badge-success">FREE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              <span>Taxes:</span>
              <span style={{ color: 'var(--text-muted)' }}>Included</span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontSize: '1.35rem', 
              fontWeight: 800, 
              paddingTop: '14px', 
              borderTop: '1px solid var(--border-subtle)', 
              color: 'var(--text-primary)',
              marginTop: '4px'
            }}>
              <span>Total to Pay:</span>
              <span style={{ color: 'var(--primary)' }}>₹{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit" 
            form="checkout-form"
            disabled={isProcessing}
            className="btn btn-primary btn-block btn-lg" 
            style={{ marginTop: '24px' }}
          >
            {isProcessing ? 'Opening Razorpay Gateway...' : `Pay Now • ₹${totalPrice.toFixed(2)} →`}
          </button>

          <p style={{ 
            fontSize: '0.8rem', 
            color: 'var(--text-muted)', 
            textAlign: 'center', 
            marginTop: '16px',
            marginBottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            🔒 <span>Encrypted transaction via Razorpay gateway</span>
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;