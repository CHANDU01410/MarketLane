import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminNav from './AdminNav';
import '../styles/admin.css';

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [currentImage, setCurrentImage] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setFormData({ 
          name: data.name || '', 
          description: data.description || '', 
          price: data.price !== undefined ? data.price : '', 
          category: data.category || '', 
          stock: data.stock !== undefined ? data.stock : '' 
        });
        if (data.imageUrl) {
          setCurrentImage(data.imageUrl);
        }
      } catch (error) {
        console.error('Error fetching product for edit:', error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProduct();
  }, [id, user, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('stock', formData.stock);
    if (image) data.append('image', image);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
        body: data
      });
      if (res.ok) {
        alert('Product updated successfully!');
        navigate('/admin/products');
      } else {
        const resData = await res.json();
        alert(resData.message || 'Error updating product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('An unexpected error occurred while updating product.');
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
            <span>Edit Product</span>
          </div>
          <h2 style={{ margin: 0 }}>Edit Product Details</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.92rem' }}>
            Update product title, pricing, inventory count, or replace the primary image asset.
          </p>
        </div>
      </div>

      <AdminNav activeTab="products" />

      <div className="admin-form-card">
        {initialLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="skeleton" style={{ height: '40px', width: '100%' }} />
            <div className="skeleton" style={{ height: '100px', width: '100%' }} />
            <div className="skeleton" style={{ height: '40px', width: '100%' }} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="edit-name">Product Title</label>
              <input 
                id="edit-name"
                type="text" 
                placeholder="Product Name" 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" htmlFor="edit-desc">Detailed Description</label>
              <textarea 
                id="edit-desc"
                placeholder="Comprehensive description of product specifications..." 
                required 
                rows="4" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" htmlFor="edit-price">Price (₹)</label>
                <input 
                  id="edit-price"
                  type="number" 
                  step="0.01"
                  placeholder="2499.00" 
                  required 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" htmlFor="edit-cat">Category</label>
                <input 
                  id="edit-cat"
                  type="text" 
                  placeholder="e.g. Audio, Electronics" 
                  required 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})} 
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" htmlFor="edit-stock">Available Stock</label>
                <input 
                  id="edit-stock"
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
              <label htmlFor="edit-image" style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}>
                {image ? image.name : 'Replace Product Asset (Optional)'}
              </label>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0 0 12px 0' }}>
                Leave empty to retain the current image hosted on Cloudinary.
              </p>
              <input 
                id="edit-image"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ color: 'var(--text-secondary)', display: 'inline-block' }} 
              />
              
              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
                {imagePreview ? (
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>NEW IMAGE:</span>
                    <img src={imagePreview} alt="New Preview" className="admin-image-preview" style={{ margin: 0 }} />
                  </div>
                ) : currentImage && (
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '4px' }}>CURRENT IMAGE:</span>
                    <img src={currentImage} alt="Current Asset" className="admin-image-preview" style={{ margin: 0 }} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
              <button 
                type="button" 
                onClick={() => navigate('/admin/products')}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={loading} 
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                {loading ? 'Saving Updates...' : 'Save Product Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProduct;