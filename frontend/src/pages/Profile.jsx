import React, { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = user || (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null);
  const token = currentUser?.token;

  const fetchMyOrders = useCallback(async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/orders/myorders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(Array.isArray(data) ? data : []);
      } else {
        if (res.status === 401) {
          logout();
          navigate('/login');
          return;
        }
        setError(data.message || 'Failed to fetch your order history.');
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Unable to load your order history. Please check your network connection.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [token, navigate, logout]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return { label: 'Delivered', className: 'badge badge-success' };
      case 'Shipped':
        return { label: 'Shipped', className: 'badge badge-info' };
      case 'Processing':
        return { label: 'Processing', className: 'badge badge-primary' };
      case 'Cancelled':
        return { label: 'Cancelled', className: 'badge badge-danger' };
      case 'Pending':
      default:
        return { label: status || 'Pending', className: 'badge badge-warning' };
    }
  };

  if (!currentUser) return null;

  const userInitial = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="profile-container">
      <div className="profile-header-card">
        <div className="profile-meta-top">
          <div className="profile-user-summary">
            <div className="profile-avatar-large" aria-hidden="true">
              {userInitial}
            </div>

            <div>
              <span className={currentUser.role === 'admin' ? 'badge badge-primary' : 'badge badge-success'} style={{ marginBottom: '8px' }}>
                Account: {currentUser.role?.toUpperCase()}
              </span>
              <h2 className="profile-name-heading">{currentUser.name}</h2>
              <p className="profile-email-text">{currentUser.email}</p>
            </div>
          </div>

          <div className="profile-actions">
            {currentUser.role === 'admin' && (
              <Link to="/admin" className="btn btn-secondary">
                Admin Panel &rarr;
              </Link>
            )}
            <button onClick={handleLogout} className="btn btn-danger">
              Sign Out
            </button>
          </div>
        </div>

        <div className="profile-info-grid">
          <div className="profile-info-item">
            <div className="profile-info-label">Account Role</div>
            <div className="profile-info-val" style={{ textTransform: 'capitalize' }}>
              {currentUser.role}
            </div>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-label">Total Placed Orders</div>
            <div className="profile-info-val">
              {loading ? '...' : orders.length}
            </div>
          </div>

          <div className="profile-info-item">
            <div className="profile-info-label">Security Status</div>
            <div className="profile-info-val" style={{ color: 'var(--success)' }}>
              ● Verified Session
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div>
          <h3>My Order History</h3>
          <p className="text-secondary" style={{ margin: 0, fontSize: '0.92rem' }}>
            Review past purchases, line items, delivery addresses, and fulfillment tracking.
          </p>
        </div>

        {!loading && !error && (
          <span className="badge badge-primary">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Recorded
          </span>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {[1, 2].map((n) => (
            <div key={n} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div className="skeleton" style={{ height: '20px', width: '220px' }} />
                <div className="skeleton" style={{ height: '24px', width: '90px', borderRadius: 'var(--radius-full)' }} />
              </div>
              <div className="skeleton" style={{ height: '60px', width: '100%', marginBottom: '12px' }} />
              <div className="skeleton" style={{ height: '36px', width: '70%' }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card" style={{ padding: '36px', textAlign: 'center', maxWidth: '560px', margin: '20px auto' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: '10px' }}>⚠️</div>
          <h4 style={{ margin: '0 0 6px 0' }}>Unable to Load Order History</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '18px' }}>
            {error}
          </p>
          <button onClick={fetchMyOrders} className="btn btn-secondary btn-sm">
            ↻ Retry Loading Orders
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <div className="empty-state-title">No orders yet</div>
          <p className="empty-state-text">
            Your orders will appear here after you make a purchase.
          </p>
          <Link to="/shop" className="btn btn-primary btn-lg">
            Start Shopping &rarr;
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map((order) => {
            const statusInfo = getStatusBadge(order.status);
            const formattedDate = new Date(order.createdAt).toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata'
            });

            return (
              <div key={order._id} className="order-history-card">
                <div className="order-card-header">
                  <div className="order-header-meta">
                    <span className="order-id-label">
                      ORDER ID: <span className="order-id-val">#{order._id}</span>
                    </span>
                    <span className="order-date-text">
                      Placed on: <strong>{formattedDate}</strong> (IST)
                    </span>
                  </div>

                  <div className="order-header-right">
                    <span className={statusInfo.className}>
                      ● {statusInfo.label}
                    </span>
                    <span className="order-total-amount">
                      ₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}
                    </span>
                  </div>
                </div>

                <div className="order-items-section">
                  <div className="order-section-title">
                    Ordered Products ({order.items?.length || 0})
                  </div>

                  <div className="order-items-grid">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item, idx) => {
                        const productName = item.productId?.name || item.name || 'Catalog Product';
                        const itemQty = item.quantity || item.qty || 1;
                        const itemPrice = item.price !== undefined ? item.price : (item.productId?.price || 0);
                        const itemSubtotal = itemPrice * itemQty;

                        return (
                          <div key={item._id || idx} className="order-item-row">
                            <div className="order-item-name">
                              {productName}
                            </div>
                            <div className="order-item-meta">
                              <span>Qty: <strong>{itemQty}</strong></span>
                              <span>×</span>
                              <span>₹{itemPrice.toFixed(2)}</span>
                              <span className="order-item-subtotal">
                                = ₹{itemSubtotal.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
                        No product item details recorded for this transaction.
                      </p>
                    )}
                  </div>
                </div>

                {order.address && (
                  <div className="order-shipping-section">
                    <span className="order-shipping-label">Shipping Address</span>
                    <span className="order-shipping-address">
                      <strong>{order.address.fullName}</strong> — {order.address.street}, {order.address.city}, {order.address.postalCode} ({order.address.country})
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;