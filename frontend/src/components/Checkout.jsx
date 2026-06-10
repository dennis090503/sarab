import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import API from '../api/axios.js';
const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: 'delivery',
    details: '',
  });

  const [errors, setErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const parseNumericPrice = (priceVal) => {
    if (priceVal === undefined || priceVal === null) return 0;
    if (typeof priceVal === 'number') return priceVal;
    const cleanStr = String(priceVal).replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleanStr);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.fullName.trim()) formErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      formErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{7,14}$/.test(formData.phone.replace(/\s/g, ''))) {
      formErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) formErrors.email = 'Email address is required';
    if (!formData.details.trim() && formData.serviceType === 'delivery') {
      formErrors.details = 'Delivery address description is required';
    }
    return formErrors;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const orderPayload = {
      customer: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        serviceType: formData.serviceType,
        details: formData.details
      },
      items: cart.map(item => ({
        title: item.title,
        price: parseNumericPrice(item.price),
        quantity: item.quantity
      })),
      grandTotal: typeof cartTotal === 'string' ? parseNumericPrice(cartTotal).toFixed(2) : parseFloat(cartTotal).toFixed(2)
    };

    try {
      // SWAPPED: Replaced fetch setup with centralized Axios interceptor/instance
      const response = await API.post('/api/orders', orderPayload);

      // Axios bundles your JSON parsed response payload inside response.data
      const data = response.data;

      // Axios returns a successful status context implicitly if it doesn't throw
      if (response.status === 200 || response.status === 201 || data.success !== false) {
        setOrderSubmitted(true);
        clearCart();
      } else {
        alert(data.message || 'Something went sideways during order placement.');
      }
    } catch (err) {
      console.error('Order submission pipeline error context:', err);
      
      // Axios stores response structures safely inside err.response
      const serverMessage = err.response?.data?.message;
      
      alert(
        serverMessage || 
        'Failed to establish connection with the backend server. Make sure your server is running!'
      );
    } finally {
      setIsSubmitting(false);
    } 
  };

  if (orderSubmitted) {
    return (
      <div className="container py-5 text-center">
        <div className="p-5 mx-auto" style={{ maxWidth: '600px', background: 'var(--light)', borderRadius: '18px', boxShadow: 'var(--shadow)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="mb-4" style={{ fontSize: '4rem', color: 'var(--green)' }}>
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 className="mb-3 fw-bold" style={{ fontFamily: '"Playfair Display", serif', color: 'var(--dark)' }}>Order Placed Successfully!</h2>
          <p className="mb-4" style={{ color: '#666' }}>Thank you for dining with Sarab. Your order sequence has been stored in our local database and is being processed by our kitchen staff.</p>
          <Link to="/" className="btn-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <i className="fas fa-arrow-left"></i> Return Home Menu
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-shopping-basket display-1 mb-4" style={{ color: '#ddd' }}></i>
        <h3 className="fw-bold" style={{ fontFamily: '"Playfair Display", serif', color: 'var(--dark)' }}>Your Checkout Basket is Empty</h3>
        <p className="text-muted mb-4">Add some of our delicious menu items before verifying selection gates.</p>
        <Link to="/" className="btn-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          Browse Menu Items
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 text-start">
      <div className="row g-5">
        
        {/* Left Side: Client Data Form Validation Group */}
        <div className="col-lg-7">
          <h4 className="mb-4 fw-bold pb-2" style={{ 
            fontFamily: '"Playfair Display", serif', 
            color: 'var(--dark)',
            borderBottom: '2px solid var(--primary)',
            display: 'inline-block'
          }}>
            <i className="fas fa-id-card me-2" style={{ color: 'var(--primary)' }}></i>
            Guest Fulfillment Information
          </h4>
          
          <form onSubmit={handleSubmitOrder} className="mt-4">
            <div className="mb-4">
              <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Full Name *</label>
              <input 
                type="text" 
                name="fullName" 
                className={`form-control ${errors.fullName ? 'is-invalid' : ''}`} 
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e0e0e0', fontFamily: "'Poppins', sans-serif" }}
                placeholder="John Doe" 
                value={formData.fullName} 
                onChange={handleInputChange} 
                disabled={isSubmitting} 
              />
              {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e0e0e0', fontFamily: "'Poppins', sans-serif" }}
                  placeholder="+1 234 567 890" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  disabled={isSubmitting} 
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e0e0e0', fontFamily: "'Poppins', sans-serif" }}
                  placeholder="john@example.com" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  disabled={isSubmitting} 
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>Dining Service Type</label>
              <select 
                name="serviceType" 
                className="form-select" 
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e0e0e0', fontFamily: "'Poppins', sans-serif" }}
                value={formData.serviceType} 
                onChange={handleInputChange} 
                disabled={isSubmitting}
              >
                <option value="delivery">Premium Courier Delivery</option>
                <option value="pickup">Self-Collection Pickup</option>
                <option value="dinein">Dine-In Table Reservation Placement</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold mb-2" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>
                {formData.serviceType === 'delivery' ? 'Physical Street Address *' : 'Special Dining Requests / Table Configuration Preferences'}
              </label>
              <textarea 
                name="details" 
                rows="4" 
                className={`form-control ${errors.details ? 'is-invalid' : ''}`} 
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #e0e0e0', fontFamily: "'Poppins', sans-serif" }}
                placeholder={formData.serviceType === 'delivery' ? '123 Fine Dining Street, Suite 4B' : 'Please reserve near the terrace view or input your current table number...'} 
                value={formData.details} 
                onChange={handleInputChange} 
                disabled={isSubmitting}
              ></textarea>
              {errors.details && <div className="invalid-feedback">{errors.details}</div>}
            </div>

            <button 
              type="submit" 
              className="btn-red w-100 d-flex align-items-center justify-content-center gap-2" 
              style={{ padding: '16px', fontSize: '1rem' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner-border spinner-border-sm text-light" role="status"></div>
                  Processing Secure Order...
                </>
              ) : (
                <>
                  <i className="fas fa-lock"></i> Authorize & Place Secure Order (${parseNumericPrice(cartTotal).toFixed(2)})
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Consolidated Real-Time Receipt Summary Component Box */}
        <div className="col-lg-5">
          <div className="p-4 rounded border shadow-sm position-sticky" style={{ 
            top: '110px', 
            background: '#fff', 
            borderRadius: '18px',
            border: '1px solid #f0f0f0'
          }}>
            <h5 className="mb-4 fw-bold" style={{ fontFamily: '"Playfair Display", serif', color: 'var(--dark)', fontSize: '1.25rem' }}>
              <i className="fas fa-receipt me-2" style={{ color: 'var(--primary)' }}></i>
              Order Summary
            </h5>
            
            <div className="mb-4 overflow-auto" style={{ maxHeight: '320px' }}>
              {cart.map((item) => (
                <div key={item._id || item.id} className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{ borderBottom: '1px dashed #e0e0e0' }}>
                  <div className="d-flex align-items-center gap-3 text-start">
                    <img 
                      src={item.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'} 
                      alt={item.title} 
                      className="rounded" 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }} 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'; }}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold text-truncate" style={{ 
                        fontFamily: "'Playfair Display', serif", 
                        color: 'var(--dark)', 
                        maxWidth: '160px',
                        fontSize: '0.85rem'
                      }}>{item.title}</h6>
                      <small className="text-muted" style={{ fontSize: '0.7rem' }}>Qty: {item.quantity}</small>
                    </div>
                  </div>
                  <span className="fw-bold" style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>
                    ${(parseNumericPrice(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center pt-3 border-top" style={{ borderTop: '2px solid var(--primary)' }}>
              <span className="fw-bold" style={{ color: 'var(--dark)', fontSize: '1rem' }}>Total to Pay:</span>
              <span className="fw-black" style={{ color: 'var(--primary)', fontSize: '1.5rem', fontFamily: "'Playfair Display', serif" }}>
                ${parseNumericPrice(cartTotal).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;