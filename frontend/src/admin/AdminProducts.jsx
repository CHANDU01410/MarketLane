import React, { useEffect, useState, useContext, useMemo } from 'react';
import { AuthContext } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import '../styles/admin.css';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching admin products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you strictly sure you want to delete this?')) {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (res.ok) {
          setProducts(products.filter(p => p._id !== id));
        } else {
          alert('Failed to delete product. Please try again.');
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert('An error occurred while deleting the product.');
      }
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name?.toLowerCase().includes(q) || 
      p.category?.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-title-wrap">
          <div className="admin-breadcrumbs">
            <Link to="/admin">Admin Dashboard</Link>
            <span>/</span>
            <span>Products</span>
          </div>
          <h2 style={{ margin: 0 }}>Product Catalog Management</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
            Review, edit, or adjust inventory for items listed across MarketLane.
          </p>
        </div>

        <Link to="/admin/add-product" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Add New Product</span>
        </Link>
      </div>

      <AdminNav activeTab="products" />

      <div className="admin-table-wrapper">
        <div className="admin-table-toolbar">
          <div className="admin-table-search">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input 
              type="text" 
              placeholder="Filter by title or category..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter products"
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
            Total Items: <strong>{filteredProducts.length}</strong>
            {searchQuery && ` of ${products.length}`}
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>THUMB</th>
                <th>PRODUCT DETAILS</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>INVENTORY</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [1, 2, 3, 4].map(n => (
                  <tr key={n}>
                    <td>
                      <div className="skeleton" style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)' }} />
                    </td>
                    <td>
                      <div className="skeleton" style={{ height: '18px', width: '60%', marginBottom: '6px' }} />
                      <div className="skeleton" style={{ height: '12px', width: '30%' }} />
                    </td>
                    <td><div className="skeleton" style={{ height: '22px', width: '70px', borderRadius: 'var(--radius-full)' }} /></td>
                    <td><div className="skeleton" style={{ height: '18px', width: '60px' }} /></td>
                    <td><div className="skeleton" style={{ height: '22px', width: '80px', borderRadius: 'var(--radius-full)' }} /></td>
                    <td style={{ textAlign: 'right' }}><div className="skeleton" style={{ height: '32px', width: '110px', marginLeft: 'auto' }} /></td>
                  </tr>
                ))
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '48px 24px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📦</div>
                    <h4 style={{ margin: '0 0 6px 0' }}>
                      {searchQuery ? 'No matching products found' : 'No products in catalog yet'}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      {searchQuery ? `No items matched "${searchQuery}". Clear your search to see all.` : 'Add your first item to start selling on MarketLane.'}
                    </p>
                    {searchQuery ? (
                      <button onClick={() => setSearchQuery('')} className="btn btn-secondary btn-sm">
                        Clear Search Filter
                      </button>
                    ) : (
                      <Link to="/admin/add-product" className="btn btn-primary btn-sm">
                        + Add First Product
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product._id}>
                    <td>
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="admin-product-thumb"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://placehold.co/100x100?text=No+Img';
                        }}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
                        {product.name}
                      </div>
                      <div style={{ fontFamily: 'monospace', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        ID: {product._id}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{product.category}</span>
                    </td>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.05rem' }}>
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td>
                      <span className={product.stock > 0 ? 'badge badge-success' : 'badge badge-danger'}>
                        ● {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="admin-action-group">
                        <Link 
                          to={`/admin/edit-product/${product._id}`} 
                          className="btn btn-sm btn-secondary"
                          title="Edit Product Details"
                        >
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(product._id)} 
                          className="btn btn-sm btn-danger"
                          title="Delete Product"
                        >
                          Delete
                        </button>
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

export default AdminProducts;