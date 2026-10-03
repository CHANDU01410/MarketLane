import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import '../styles/admin.css';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', stock: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select a product image asset.');
    
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    data.append('image', image);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      const responseData = await res.json();
      
      if (res.ok) {
        alert('Product created successfully with Cloudinary Image URL!');
        navigate('/shop');
      } else {
        alert(responseData.message || 'Error creating product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('An unexpected error occurred while creating product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container" style={{ maxWidth: '780px' }}>
      <div className="admin-header" style={{ marginBottom: '16px' }}>
        <div className="admin-header-title-wrap">
          <div className="admin-breadcrumbs">
            <Link to="/admin">Admin Dashboard</Link>
            <span>/</span>
            <Link to="/admin/products">Products</Link>
            <span>/</span>
            <span>Add Product</span>
          </div>
          <h2 style={{ margin: 0 }}>Publish New Product</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
            Add an item to the store catalog with high-resolution Cloudinary media.
          </p>
        </div>
      </div>

      <AdminNav activeTab="products" />

      <div className="admin-form-card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" htmlFor="prod-name">Product Title</label>
            <input 
              id="prod-name"
              type="text" 
              placeholder="e.g. Sony WH-1000XM5 Wireless Headphones" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label" htmlFor="prod-desc">Detailed Description</label>
            <textarea 
              id="prod-desc"
              placeholder="Provide a comprehensive product description, key features, and specifications..." 
              required 
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="prod-price">Retail Price (₹)</label>
              <input 
                id="prod-price"
                type="number" 
                step="0.01"
                placeholder="2499.00" 
                required 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="prod-cat">Category</label>
              <input 
                id="prod-cat"
                type="text" 
                placeholder="e.g. Audio, Electronics" 
                required 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})} 
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="prod-stock">Available Inventory</label>
              <input 
                id="prod-stock"
                type="number" 
                placeholder="50" 
                required 
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})} 
              />
            </div>
          </div>
          
          <div className="admin-image-dropzone">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)', margin: '0 auto 8px auto', display: 'block' }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <label htmlFor="prod-image" style={{ display: 'block', marginBottom: '6px', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>
              {image ? image.name : 'Click to select product image'}
            </label>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0 0 12px 0' }}>
              Supported formats: PNG, JPG, WEBP. Uploads directly to Cloudinary.
            </p>
            <input 
              id="prod-image"
              type="file" 
              accept="image/*" 
              required 
              onChange={handleImageChange}
              style={{ color: 'var(--text-secondary)', display: 'inline-block' }}
            />
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Selected Preview" 
                className="admin-image-preview" 
              />
            )}
          </div>

          <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
            <Link 
              to="/admin/products"
              className="btn btn-secondary"
              style={{ flex: 1, textAlign: 'center' }}
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              disabled={loading} 
              className="btn btn-primary" 
              style={{ flex: 2 }}
            >
              {loading ? 'Uploading & Creating...' : 'Publish Product to Store'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;