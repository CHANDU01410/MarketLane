import React, { useEffect, useState, useContext, useMemo } from 'react';
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import '../styles/admin.css';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(orders.map(order => order._id === id ? { ...order, status } : order));
      } else {
        alert('Failed to update order status.');
      }
    } catch (err) {
      console.error('Update status error:', err);
      alert('Error updating order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Shipped':
        return 'status-shipped';
      default:
        return 'status-pending';
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        order._id?.toLowerCase().includes(q) || 
        order.user?.name?.toLowerCase().includes(q) ||
        order.user?.email?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-breadcrumbs">
            <Link to="/admin">Admin Dashboard</Link>
            <span>/</span>
            <span>Orders</span>
          </div>
          <h2 style={{ margin: 0 }}>Customer Order Management</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
            Monitor and fulfill incoming transactions, manage tracking status, and verify payment settlements.
          </p>
        </div>
      </div>

      <AdminNav activeTab="orders" />

      <div className="admin-table-wrapper">
        <div className="admin-table-toolbar">
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="admin-table-search">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input 
                type="text" 
                placeholder="Search by Order ID or customer..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Filter orders"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, fontSize: '0.9rem' }}
                  aria-label="Clear filter"
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-surface)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              {['ALL', 'Pending', 'Shipped', 'Delivered'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  style={{
                    border: 'none',
                    background: statusFilter === status ? 'var(--primary)' : 'transparent',
                    color: statusFilter === status ? '#fff' : 'var(--text-secondary)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-table-count">
            Orders: <strong>{filteredOrders.length}</strong>
            {orders.length !== filteredOrders.length && ` of ${orders.length}`}
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>TOTAL PAID</th>
                <th>DATE & TIME</th>
                <th style={{ textAlign: 'right' }}>FULFILLMENT STATUS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [1, 2, 3, 4].map(n => (
                  <tr key={n}>
                    <td><div className="skeleton" style={{ height: '16px', width: '100px' }} /></td>
                    <td>
                      <div className="skeleton" style={{ height: '16px', width: '120px', marginBottom: '4px' }} />
                      <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                    </td>
                    <td><div className="skeleton" style={{ height: '18px', width: '70px' }} /></td>
                    <td><div className="skeleton" style={{ height: '16px', width: '110px' }} /></td>
                    <td style={{ textAlign: 'right' }}><div className="skeleton" style={{ height: '34px', width: '130px', marginLeft: 'auto', borderRadius: 'var(--radius-full)' }} /></td>
                  </tr>
                ))
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚚</div>
                    <h4 style={{ margin: '0 0 6px 0' }}>
                      {searchQuery || statusFilter !== 'ALL' ? 'No matching orders found' : 'No customer orders placed yet'}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      {searchQuery || statusFilter !== 'ALL' ? 'Adjust your status filter or search query.' : 'Customer transactions and delivery details will appear here automatically.'}
                    </p>
                    {(searchQuery || statusFilter !== 'ALL') && (
                      <button 
                        onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); }} 
                        className="btn btn-secondary btn-sm"
                      >
                        Reset Order Filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>
                      <div style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                        #{order._id.substring(order._id.length - 8).toUpperCase()}
                      </div>
                      <div style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        {order._id}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="admin-user-avatar">
                          {order.user?.name ? order.user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {order.user?.name || 'Guest / Deleted User'}
                          </div>
                          {order.user?.email && (
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                              {order.user.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: 'var(--success)', fontWeight: 800, fontSize: '1.05rem' }}>
                        ₹{order.totalAmount.toFixed(2)}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        Settled (Razorpay)
                      </div>
                    </td>
                    <td>
                      <div style={{ color: 'var(--text-primary)', fontSize: '0.88rem', fontWeight: 500 }}>
                        {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-status-select-wrap">
                        <select 
                          value={order.status} 
                          disabled={updatingId === order._id}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className={`admin-status-select ${getStatusClass(order.status)}`}
                          aria-label={`Update fulfillment status for order ${order._id}`}
                        >
                          <option value="Pending">● Pending</option>
                          <option value="Shipped">● Shipped</option>
                          <option value="Delivered">● Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;