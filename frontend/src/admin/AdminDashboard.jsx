import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import '../styles/admin.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/analytics', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
        } else {
          if (res.status === 401) {
            navigate('/login');
          }
          setStats({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
        }
      } catch (error) {
        console.error('Error fetching admin analytics:', error);
      }
    };
    fetchStats();
  }, [user, navigate]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="admin-portal-badge">Admin Workspace</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
            <img
              src="/MarketLane.png"
              alt="MarketLane Logo"
              style={{
                height: '36px',
                width: '36px',
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
                boxShadow: '0 2px 8px var(--primary-glow)'
              }}
            />
            <h2 style={{ margin: 0, letterSpacing: '-0.02em' }}>Operations Overview</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
            Welcome back, <strong style={{ color: 'var(--text-primary)' }}>{user?.name}</strong>. Real-time store metrics and management controls.
          </p>
        </div>

        <Link to="/admin/add-product" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Publish New Product</span>
        </Link>
      </div>

      <AdminNav activeTab="overview" />

      {stats ? (
        <div className="admin-stats-grid">
          <div className="admin-stat-card" style={{ '--stat-accent': '#3b82f6', '--stat-icon-bg': 'rgba(59, 130, 246, 0.12)' }}>
            <div className="admin-stat-header">
              <div>
                <div className="admin-stat-label">Total Orders</div>
                <div className="admin-stat-value">{stats.totalOrders}</div>
              </div>
              <div className="admin-stat-icon-wrap" aria-hidden="true">
                🚚
              </div>
            </div>
            <div className="admin-stat-subtext">Lifetime customer transactions</div>
          </div>

          <div className="admin-stat-card" style={{ '--stat-accent': '#f97316', '--stat-icon-bg': 'rgba(249, 115, 22, 0.12)' }}>
            <div className="admin-stat-header">
              <div>
                <div className="admin-stat-label">Catalog Products</div>
                <div className="admin-stat-value">{stats.totalProducts}</div>
              </div>
              <div className="admin-stat-icon-wrap" aria-hidden="true">
                📦
              </div>
            </div>
            <div className="admin-stat-subtext">Active store catalog items</div>
          </div>

          <div className="admin-stat-card" style={{ '--stat-accent': '#8b5cf6', '--stat-icon-bg': 'rgba(139, 92, 246, 0.12)' }}>
            <div className="admin-stat-header">
              <div>
                <div className="admin-stat-label">Registered Users</div>
                <div className="admin-stat-value">{stats.totalUsers}</div>
              </div>
              <div className="admin-stat-icon-wrap" aria-hidden="true">
                👥
              </div>
            </div>
            <div className="admin-stat-subtext">Verified customer accounts</div>
          </div>

          <div className="admin-stat-card" style={{ '--stat-accent': '#10b981', '--stat-icon-bg': 'rgba(16, 185, 129, 0.12)' }}>
            <div className="admin-stat-header">
              <div>
                <div className="admin-stat-label">Gross Revenue</div>
                <div className="admin-stat-value" style={{ color: 'var(--success)' }}>
                  ₹{stats.totalRevenue.toFixed(2)}
                </div>
              </div>
              <div className="admin-stat-icon-wrap" aria-hidden="true">
                💰
              </div>
            </div>
            <div className="admin-stat-subtext">Processed payments via Razorpay</div>
          </div>
        </div>
      ) : (
        <div className="admin-stats-grid">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="card" style={{ padding: '24px' }}>
              <div className="skeleton" style={{ height: '20px', width: '80px', marginBottom: '14px' }} />
              <div className="skeleton" style={{ height: '36px', width: '120px', marginBottom: '10px' }} />
              <div className="skeleton" style={{ height: '14px', width: '160px' }} />
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ padding: '32px' }}>
        <h3 style={{ marginBottom: '6px' }}>Quick Management Portals</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.92rem' }}>
          Select an operational division to manage inventory, fulfill customer purchases, or inspect customer accounts.
        </p>
        
        <div className="admin-shortcuts-grid">
          <Link to="/admin/products" className="admin-shortcut-card">
            <div className="admin-shortcut-icon">📦</div>
            <div>
              <div className="admin-shortcut-title">Product Catalog</div>
              <p className="admin-shortcut-desc">Manage stock, update prices, edit details, or remove obsolete items.</p>
            </div>
          </Link>

          <Link to="/admin/orders" className="admin-shortcut-card">
            <div className="admin-shortcut-icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6' }}>🚚</div>
            <div>
              <div className="admin-shortcut-title">Customer Orders</div>
              <p className="admin-shortcut-desc">Inspect incoming orders and update delivery fulfillment status.</p>
            </div>
          </Link>

          <Link to="/admin/users" className="admin-shortcut-card">
            <div className="admin-shortcut-icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6' }}>👥</div>
            <div>
              <div className="admin-shortcut-title">Users Directory</div>
              <p className="admin-shortcut-desc">View customer accounts, administrative staff, and registration dates.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;