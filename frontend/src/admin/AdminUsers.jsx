import React, { useEffect, useState, useContext, useMemo } from 'react';
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import '../styles/admin.css';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/auth/users', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching admin users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user, navigate]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(u => 
      u.name?.toLowerCase().includes(q) || 
      u.email?.toLowerCase().includes(q) ||
      u.role?.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-breadcrumbs">
            <Link to="/admin">Admin Dashboard</Link>
            <span>/</span>
            <span>Users</span>
          </div>
          <h2 style={{ margin: 0 }}>Registered Users Directory</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
            Inspect customer accounts, administrative staff permissions, and account creation dates.
          </p>
        </div>
      </div>

      <AdminNav activeTab="users" />

      <div className="admin-table-wrapper">
        <div className="admin-table-toolbar">
          <div className="admin-table-search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              placeholder="Search by name, email, or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter users"
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

          <div className="admin-table-count">
            Total Users: <strong>{filteredUsers.length}</strong>
            {searchQuery && ` of ${users.length}`}
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>USER ACCOUNT</th>
                <th>EMAIL ADDRESS</th>
                <th>ROLE PERMISSIONS</th>
                <th style={{ textAlign: 'right' }}>REGISTRATION DATE</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [1, 2, 3, 4].map(n => (
                  <tr key={n}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
                        <div>
                          <div className="skeleton" style={{ height: '16px', width: '120px', marginBottom: '4px' }} />
                          <div className="skeleton" style={{ height: '12px', width: '80px' }} />
                        </div>
                      </div>
                    </td>
                    <td><div className="skeleton" style={{ height: '16px', width: '160px' }} /></td>
                    <td><div className="skeleton" style={{ height: '22px', width: '70px', borderRadius: 'var(--radius-full)' }} /></td>
                    <td style={{ textAlign: 'right' }}><div className="skeleton" style={{ height: '16px', width: '100px', marginLeft: 'auto' }} /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👥</div>
                    <h4 style={{ margin: '0 0 6px 0' }}>
                      {searchQuery ? 'No matching users found' : 'No registered users found'}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      {searchQuery ? `No users matched "${searchQuery}". Clear your search filter.` : 'Registered customers and staff members will appear here.'}
                    </p>
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="btn btn-secondary btn-sm">
                        Clear Search Filter
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => (
                  <tr key={u._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="admin-user-avatar" style={u.role === 'admin' ? { background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff' } : {}}>
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            {u.name}
                          </div>
                          <div style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            ID: {u._id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a 
                        href={`mailto:${u.email}`}
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                      >
                        {u.email}
                      </a>
                    </td>
                    <td>
                      <span className={u.role === 'admin' ? 'badge badge-primary' : 'badge badge-success'}>
                        {u.role === 'admin' ? '● ADMIN' : '● CUSTOMER'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
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

export default AdminUsers;