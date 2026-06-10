import React, { useState, useEffect } from 'react';
import API from '../api/axios.js';

const AdminMenuManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '', 
    category: 'burgers', 
    displayCategory: 'Burgers',
    price: '', 
    shortDesc: '', 
    longDesc: '', 
    img: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMenu = async () => {
    try {
      // SWAPPED: Using environment-variable-aware Axios instead of hardcoded URL string
      const response = await API.get('/api/menu');
      setMenuItems(response.data);
    } catch (err) {
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      const displayMap = { 
        burgers: 'Burgers', 
        pizza: 'Pizza', 
        chicken: 'Chicken', 
        wraps: 'Wraps', 
        desserts: 'Desserts', 
        pasta: 'Pasta' 
      };
      setFormData({ ...formData, category: value, displayCategory: displayMap[value] || value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let formattedPrice = formData.price.trim();
    if (!formattedPrice.startsWith('$')) {
      formattedPrice = `$${formattedPrice}`;
    }

    const finalImageUrl = formData.img.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop';

    const cleanPayload = {
      ...formData,
      price: formattedPrice,
      img: finalImageUrl
    };

    try {
      // SWAPPED: Extracted target url settings out of fetch configuration blocks into clean Axios syntax
      if (editingId) {
        await API.put(`/api/menu/${editingId}`, cleanPayload);
      } else {
        await API.post('/api/menu', cleanPayload);
      }

      // Axios automatically routes non-2xx into the catch block; if we're here, it succeeded.
      fetchMenu();
      resetForm();
      alert(editingId ? 'Dish updated successfully!' : 'New dish added successfully!');
    } catch (err) {
      console.error('Form submission pipeline error context:', err);
      // Safely access backend-delivered error explanations if available
      const serverMessage = err.response?.data?.message;
      alert(serverMessage || 'Error updating menu item.');
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title, 
      category: item.category, 
      displayCategory: item.displayCategory,
      price: item.price, 
      shortDesc: item.shortDesc, 
      longDesc: item.longDesc || '', 
      img: item.img || ''
    });
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      // SWAPPED: Swapping generic options block configuration for Axios method call syntax
      await API.delete(`/api/menu/${itemId}`);
      setMenuItems(menuItems.filter(item => item._id !== itemId));
    } catch (err) {
      console.error('Delete error context:', err);
      alert('Error deleting item.');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ 
      title: '', 
      category: 'burgers', 
      displayCategory: 'Burgers', 
      price: '', 
      shortDesc: '', 
      longDesc: '', 
      img: '' 
    });
  };

  if (loading) {
    return (
      <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <p className="mt-3 text-muted fw-bold">Loading Menu Catalog...</p>
      </div>
    );
  }

  return (
    <div className="row g-4 text-start">
      
      {/* Left Column: Form Container */}
      <div className="col-md-5">
        <div className="sticky-top" style={{ top: '110px', zIndex: 10 }}>
          <div style={{ 
            background: '#fff', 
            borderRadius: '18px', 
            padding: '28px',
            boxShadow: 'var(--shadow)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <h5 className="fw-bold pb-2 mb-3" style={{ 
              fontFamily: "'Playfair Display', serif", 
              color: 'var(--dark)',
              borderBottom: '2px solid var(--primary)',
              display: 'inline-block'
            }}>
              <i className="fas fa-utensils me-2" style={{ color: 'var(--primary)' }}></i>
              {editingId ? 'Edit Selected Dish' : 'Add New Menu Item'}
            </h5>
            <form onSubmit={handleFormSubmit} className="mt-4">
              
              <div className="mb-3">
                <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Dish Name *</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control" 
                  style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e0e0e0' }}
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Spicy Nashville Hot Chicken" 
                  required 
                />
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Price *</label>
                  <input 
                    type="text" 
                    name="price" 
                    className="form-control" 
                    style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e0e0e0' }}
                    value={formData.price} 
                    onChange={handleInputChange} 
                    placeholder="14.99" 
                    required 
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Category</label>
                  <select 
                    name="category" 
                    className="form-select" 
                    style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e0e0e0' }}
                    value={formData.category} 
                    onChange={handleInputChange}
                  >
                    <option value="burgers">Burgers</option>
                    <option value="pizza">Pizza</option>
                    <option value="chicken">Chicken</option>
                    <option value="wraps">Wraps</option>
                    <option value="desserts">Desserts</option>
                    <option value="pasta">Pasta</option>
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Image URL</label>
                <input 
                  type="url" 
                  name="img" 
                  className="form-control mb-2" 
                  style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e0e0e0' }}
                  value={formData.img} 
                  onChange={handleInputChange} 
                  placeholder="https://images.unsplash.com/..." 
                />
                {formData.img && (
                  <div className="mt-2 p-2 text-center" style={{ background: 'var(--light)', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                    <small className="d-block mb-1" style={{ color: '#666' }}>Live Preview:</small>
                    <img 
                      src={formData.img} 
                      alt="Preview" 
                      style={{ maxHeight: '100px', objectFit: 'cover', borderRadius: '8px' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop'; }}
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Short Description *</label>
                <input 
                  type="text" 
                  name="shortDesc" 
                  className="form-control" 
                  style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e0e0e0' }}
                  value={formData.shortDesc} 
                  onChange={handleInputChange} 
                  placeholder="Brief description for card layout..." 
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Long Description</label>
                <textarea 
                  name="longDesc" 
                  rows="3" 
                  className="form-control" 
                  style={{ padding: '10px 14px', borderRadius: '12px', border: '1px solid #e0e0e0' }}
                  value={formData.longDesc} 
                  onChange={handleInputChange} 
                  placeholder="Detailed ingredients and description..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn-red w-100 py-2 mb-2"
                style={{ fontSize: '0.95rem' }}
              >
                {editingId ? 'Update Dish' : 'Publish Dish'}
              </button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="btn w-100"
                  style={{ background: 'transparent', color: '#666', border: 'none', fontSize: '0.85rem' }}
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Right Column: Menu Items List */}
      <div className="col-md-7">
        <h5 className="fw-bold pb-2 mb-3" style={{ 
          fontFamily: "'Playfair Display', serif", 
          color: 'var(--dark)',
          borderBottom: '2px solid var(--primary)',
          display: 'inline-block'
        }}>
          Live Menu Catalog ({menuItems.length} items)
        </h5>
        <div className="d-flex flex-column gap-3 mt-3">
          {menuItems.map(item => (
            <div 
              key={item._id} 
              className="d-flex gap-3 align-items-center p-3"
              style={{ 
                background: '#fff', 
                borderRadius: '16px',
                boxShadow: 'var(--shadow)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '12px' }} 
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop'; }}
              />
              <div className="flex-grow-1">
                <h6 className="mb-0 fw-bold" style={{ color: 'var(--dark)' }}>
                  {item.title} 
                  <span className="badge ms-2" style={{ 
                    background: 'rgba(225, 91, 100, 0.1)', 
                    color: 'var(--primary)', 
                    fontSize: '0.7rem',
                    padding: '4px 10px',
                    borderRadius: '20px'
                  }}>{item.category}</span>
                </h6>
                <div className="fw-bold mt-1" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{item.price}</div>
                <p className="mb-0 mt-1" style={{ color: '#888', fontSize: '0.8rem' }}>{item.shortDesc}</p>
              </div>
              <div className="d-flex gap-2">
                <button 
                  onClick={() => startEdit(item)} 
                  className="btn"
                  style={{ 
                    background: 'transparent', 
                    color: '#666', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#666'; e.currentTarget.style.borderColor = '#e0e0e0'; }}
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="btn"
                  style={{ 
                    background: 'transparent', 
                    color: '#dc3545', 
                    border: '1px solid #dc3545',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#dc3545'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#dc3545'; }}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminMenuManager;