import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
import AdminMenuManager from './AdminMenuManager';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterService, setFilterService] = useState('All');
  const [newOrderAlert, setNewOrderAlert] = useState(null);
  const previousOrdersCountRef = useRef(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser') || 'Staff';

  const notificationAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-200.wav');

  const fetchOrders = async (isFirstLoad = false) => {
    try {
      // SWAPPED: Replaced native fetch with environment-variable-aware Axios client
      const response = await API.get('/api/orders');
      const data = response.data;

      if (!isFirstLoad && previousOrdersCountRef.current !== null && data.length > previousOrdersCountRef.current) {
        const latestOrder = data[0];
        setNewOrderAlert(latestOrder);
        notificationAudio.play().catch(err => console.log("Audio autoplay error: ", err));
        setTimeout(() => {
          setNewOrderAlert(null);
        }, 8000);
      }

      setOrders(data);
      previousOrdersCountRef.current = data.length;
    } catch (err) {
      console.error('Error fetching orders:', err);
      // Catch unauthorized workflows or expired tokens automatically handled by interceptors/responses
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchOrders(true);
    const interval = setInterval(() => {
      fetchOrders(false);
    }, 10000);
    return () => clearInterval(interval);
  }, [token]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // SWAPPED: Using unified PATCH via Axios configuration syntax instead of raw fetch configuration blocks
      const response = await API.patch(`/api/orders/${orderId}`, { status: newStatus });
      
      if (response.status === 200 || response.status === 204 || response.data) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
      }
    } catch (err) {
      console.error('Workflow modification error context:', err);
      alert(err.response?.data?.message || 'Network error while updating status.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const matchesService = filterService === 'All' || order.customer.serviceType === filterService;
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = normalizedQuery === '' ||
      order.customer.fullName.toLowerCase().includes(normalizedQuery) ||
      order.customer.phone.includes(normalizedQuery) ||
      order.customer.email.toLowerCase().includes(normalizedQuery) ||
      order._id.toLowerCase().includes(normalizedQuery);
    return matchesStatus && matchesService && matchesSearch;
  });

  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, curr) => acc + parseFloat(curr.grandTotal || 0), 0);

  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Pending': return { background: '#ffc107', color: '#1a1a1a' };
      case 'Preparing': return { background: '#0dcaf0', color: '#fff' };
      case 'Completed': return { background: '#198754', color: '#fff' };
      case 'Cancelled': return { background: '#dc3545', color: '#fff' };
      default: return { background: '#6c757d', color: '#fff' };
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <p className="mt-3 text-muted fw-bold">Loading administrative controls...</p>
      </div>
    );
  }

  return (
    <div className="container py-5 text-start position-relative" style={{ background: 'var(--light)', minHeight: '100vh' }}>
      
      {/* New Order Alert Toast */}
      {newOrderAlert && (
        <div 
          className="position-fixed top-0 start-50 translate-middle-x mt-4 p-3 rounded shadow-lg d-flex align-items-center gap-3"
          style={{ 
            zIndex: 9999, 
            minWidth: '320px', 
            maxWidth: '500px', 
            background: '#1a1a1a',
            borderLeft: '5px solid #f6a623',
            borderRadius: '12px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div className="rounded-circle p-2 d-flex justify-content-center align-items-center" style={{ width: '40px', height: '40px', background: '#f6a623', color: '#1a1a1a' }}>
            <i className="fas fa-bell fa-lg fa-spin"></i>
          </div>
          <div className="flex-grow-1">
            <div className="small fw-bold text-uppercase" style={{ color: '#f6a623', letterSpacing: '1px' }}>🛎️ New Incoming Order!</div>
            <div className="fw-bold small text-white">{newOrderAlert.customer.fullName} placed an order</div>
            <div className="font-monospace extra-small" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Total Amount: ${newOrderAlert.grandTotal}</div>
          </div>
          <button onClick={() => setNewOrderAlert(null)} className="btn-close btn-close-white ms-auto small"></button>
        </div>
      )}

      {/* Title Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3" style={{ borderBottom: '2px solid var(--primary)' }}>
        <div>
          <h2 className="mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: 'var(--dark)' }}>
            Sarab Admin Console <span className="fs-6" style={{ color: '#666', fontWeight: 'normal' }}>Logged in: {adminUser}</span>
          </h2>
          <p className="mb-0" style={{ color: '#666', fontSize: '0.85rem' }}>Monitor active kitchen workflows, lookup user invoices, and modify order lifecycles.</p>
        </div>
        <div className="d-flex gap-2">
          <button 
            onClick={() => fetchOrders(false)} 
            className="btn-red py-2 px-3"
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <i className="fas fa-sync-alt me-1"></i> Sync Pipeline
          </button>
          <button 
            onClick={handleLogout} 
            className="btn"
            style={{ background: '#dc3545', color: '#fff', border: 'none', borderRadius: '50px', padding: '8px 16px', fontSize: '0.85rem', fontWeight: 600 }}
          >
            <i className="fas fa-sign-out-alt me-1"></i> Exit Session
          </button>
        </div>
      </div>

      {/* Analytics Summary Counter Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="p-4 rounded border shadow-sm text-center" style={{ background: '#fff', borderRadius: '16px' }}>
            <div className="small fw-bold text-uppercase mb-1" style={{ color: '#666', letterSpacing: '1px' }}>Total System Logs</div>
            <div className="fw-black" style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--dark)' }}>{orders.length}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded border shadow-sm text-center" style={{ background: '#fff', borderRadius: '16px' }}>
            <div className="small fw-bold text-uppercase mb-1" style={{ color: '#f6a623', letterSpacing: '1px' }}>Backlog Queue</div>
            <div className="fw-black" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f6a623' }}>{pendingOrdersCount}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 rounded border shadow-sm text-center" style={{ background: 'linear-gradient(135deg, var(--primary), #c01e12)', borderRadius: '16px' }}>
            <div className="small fw-bold text-uppercase mb-1" style={{ color: 'rgba(255,255,255,0.8)', letterSpacing: '1px' }}>Gross Sales Matrix</div>
            <div className="fw-black" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Toggle Row */}
      <div className="mb-4 d-flex gap-4" style={{ borderBottom: '1px solid #e0e0e0' }}>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`pb-2 fw-bold btn btn-link text-decoration-none px-0 border-0 ${activeTab === 'orders' ? 'text-primary' : 'text-muted'}`}
          style={{ 
            borderRadius: 0,
            color: activeTab === 'orders' ? 'var(--primary)' : '#666',
            borderBottom: activeTab === 'orders' ? '2px solid var(--primary)' : 'none',
            fontWeight: 600
          }}
        >
          <i className="fas fa-shopping-cart me-2"></i>Live Incoming Orders
        </button>
        <button 
          onClick={() => setActiveTab('menu')} 
          className={`pb-2 fw-bold btn btn-link text-decoration-none px-0 border-0 ${activeTab === 'menu' ? 'text-primary' : 'text-muted'}`}
          style={{ 
            borderRadius: 0,
            color: activeTab === 'menu' ? 'var(--primary)' : '#666',
            borderBottom: activeTab === 'menu' ? '2px solid var(--primary)' : 'none',
            fontWeight: 600
          }}
        >
          <i className="fas fa-hamburger me-2"></i>Manage Dish Catalog
        </button>
      </div>

      {activeTab === 'orders' ? (
        <>
          {/* Filter Controls */}
          <div className="p-4 rounded border shadow-sm mb-4" style={{ background: '#fff', borderRadius: '16px' }}>
            <h6 className="fw-bold text-uppercase small mb-3" style={{ color: 'var(--dark)' }}>
              <i className="fas fa-sliders-h me-2" style={{ color: 'var(--primary)' }}></i>Live Queue Index Controls
            </h6>
            <div className="row g-3">
              <div className="col-lg-5 col-md-12">
                <label className="form-label small fw-bold mb-1" style={{ color: '#666' }}>Dynamic String Lookup</label>
                <div className="position-relative">
                  <span className="position-absolute top-50 start-0 translate-middle-y ms-3" style={{ color: '#aaa' }}>
                    <i className="fas fa-search"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control p-2 ps-5"
                    style={{ border: '1px solid #e0e0e0', borderRadius: '12px' }}
                    placeholder="Search by Customer name, phone digits, or index key..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <label className="form-label small fw-bold mb-1" style={{ color: '#666' }}>Order Status Lifecycle</label>
                <select 
                  className="form-select p-2"
                  style={{ border: '1px solid #e0e0e0', borderRadius: '12px' }}
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All Lifecycles Combined</option>
                  <option value="Pending">Pending Validation</option>
                  <option value="Preparing">Kitchen Preparation</option>
                  <option value="Completed">Completed / Dispatched</option>
                  <option value="Cancelled">Cancelled Actions</option>
                </select>
              </div>

              <div className="col-lg-4 col-sm-6">
                <label className="form-label small fw-bold mb-1" style={{ color: '#666' }}>Fulfillment Provision Type</label>
                <select 
                  className="form-select p-2"
                  style={{ border: '1px solid #e0e0e0', borderRadius: '12px' }}
                  value={filterService} 
                  onChange={(e) => setFilterService(e.target.value)}
                >
                  <option value="All">All Channels Combined</option>
                  <option value="delivery">Premium Courier Delivery</option>
                  <option value="pickup">Self-Collection Pickup</option>
                  <option value="dinein">Dine-In Table Configurations</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-5 border rounded" style={{ background: '#fff', borderRadius: '16px' }}>
              <i className="fas fa-filter display-4 mb-3" style={{ color: '#ddd' }}></i>
              <p className="mb-0 fw-bold" style={{ color: '#666' }}>No records found matching these filter sets.</p>
              <button 
                onClick={() => { setSearchQuery(''); setFilterStatus('All'); setFilterService('All'); }} 
                className="btn btn-link btn-sm mt-2 text-decoration-none"
                style={{ color: 'var(--primary)' }}
              >
                Reset Global Controls
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filteredOrders.map((order) => (
                <div className="col-12" key={order._id}>
                  <div className="card shadow-sm border-0 overflow-hidden" style={{ borderRadius: '16px' }}>
                    <div className="p-3 d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
                      <div>
                        <span className="fw-bold me-2" style={{ color: 'var(--dark)' }}>Invoice:</span>
                        <span className="small font-monospace" style={{ color: '#888' }}>{order._id}</span>
                        <span className="ms-3 small" style={{ color: '#888' }}>
                          <i className="far fa-clock me-1"></i> {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span 
                          className="badge px-3 py-2 rounded-pill text-uppercase fw-bold"
                          style={{ ...getStatusBadgeStyle(order.status), fontSize: '0.7rem' }}
                        >
                          {order.status}
                        </span>
                        <span className="fs-5 fw-bold" style={{ color: 'var(--primary)' }}>${order.grandTotal}</span>
                      </div>
                    </div>

                    <div className="p-4 row g-4" style={{ background: '#fff' }}>
                      <div className="col-md-4">
                        <h6 className="text-uppercase small fw-bold mb-3" style={{ color: '#888', letterSpacing: '1px' }}>Client Specifics</h6>
                        <div className="fw-bold mb-1" style={{ color: 'var(--dark)' }}>{order.customer.fullName}</div>
                        <div className="small mb-1" style={{ color: '#888' }}><i className="fas fa-phone me-2"></i>{order.customer.phone}</div>
                        <div className="small mb-3" style={{ color: '#888' }}><i className="fas fa-envelope me-2"></i>{order.customer.email}</div>
                        <div className="p-2 rounded small" style={{ background: 'var(--light)', border: '1px solid #f0f0f0' }}>
                          <span className="text-capitalize fw-bold d-block mb-1" style={{ color: 'var(--dark)' }}>
                            <i className="fas fa-utensils me-2" style={{ color: 'var(--primary)' }}></i>{order.customer.serviceType}
                          </span>
                          <span style={{ color: '#888' }}>{order.customer.details || "No custom fulfillment annotations added."}</span>
                        </div>
                      </div>

                      <div className="col-md-5">
                        <h6 className="text-uppercase small fw-bold mb-3" style={{ color: '#888', letterSpacing: '1px' }}>Cart Manifest</h6>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="d-flex justify-content-between mb-2 small">
                            <span style={{ color: 'var(--dark)' }}>{item.title} <strong style={{ color: 'var(--primary)' }}>x{item.quantity}</strong></span>
                            <span style={{ color: '#888' }}>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="col-md-3 d-flex flex-column justify-content-center gap-2">
                        <h6 className="text-uppercase small fw-bold text-center mb-2" style={{ color: '#888', letterSpacing: '1px' }}>Workflow Controls</h6>
                        {order.status === 'Pending' && (
                          <button 
                            onClick={() => handleUpdateStatus(order._id, 'Preparing')} 
                            className="btn py-2 fw-bold"
                            style={{ background: '#0dcaf0', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '0.85rem' }}
                          >
                            <i className="fas fa-fire me-2"></i>Accept & Prepare
                          </button>
                        )}
                        {order.status === 'Preparing' && (
                          <button 
                            onClick={() => handleUpdateStatus(order._id, 'Completed')} 
                            className="btn py-2 fw-bold"
                            style={{ background: '#198754', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '0.85rem' }}
                          >
                            <i className="fas fa-check me-2"></i>Mark Complete
                          </button>
                        )}
                        {order.status !== 'Completed' && order.status !== 'Cancelled' && (
                          <button 
                            onClick={() => handleUpdateStatus(order._id, 'Cancelled')} 
                            className="btn py-2 small"
                            style={{ background: 'transparent', color: '#dc3545', border: '1px solid #dc3545', borderRadius: '12px', fontSize: '0.8rem' }}
                          >
                            Cancel Order
                          </button>
                        )}
                        {(order.status === 'Completed' || order.status === 'Cancelled') && (
                          <div className="text-center small py-3" style={{ color: '#888' }}>
                            <i className="fas fa-archive me-2"></i>Order Archived
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <AdminMenuManager />
      )}
    </div>
  );
};

export default AdminDashboard;