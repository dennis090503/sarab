import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 end-0 h-100 bg-white shadow-lg border-start animate-slide-in" 
         style={{ width: '400px', zIndex: 10090, maxWidth: '100vw' }}>
      
      {/* Drawer Header */}
      <div className="p-4 border-bottom d-flex justify-content-between align-items-center" style={{ borderBottomColor: '#f0f0f0' }}>
        <h5 className="mb-0 fw-bold" style={{ fontFamily: "'Playfair Display', serif", color: 'var(--dark)' }}>
          <i className="fas fa-shopping-basket me-2" style={{ color: 'var(--primary)' }}></i>
          My Cart
        </h5>
        <button className="btn-close" onClick={onClose} style={{ outline: 'none' }}></button>
      </div>

      {/* Cart Item Loop Sheet */}
      <div className="p-4 overflow-auto flex-grow-1" style={{ height: 'calc(100vh - 250px)' }}>
        {cart.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-shopping-cart display-4 mb-3" style={{ color: '#ddd' }}></i>
            <p className="text-muted" style={{ fontFamily: "'Poppins', sans-serif" }}>Your basket is entirely empty!</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="d-flex gap-3 mb-4 align-items-center pb-3" style={{ borderBottom: '1px solid #f0f0f0' }}>
              <img 
                src={item.img} 
                alt={item.title} 
                className="rounded object-cover" 
                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '12px' }} 
              />
              <div className="flex-grow-1">
                <h6 className="mb-1 fw-bold text-truncate" style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  color: 'var(--dark)', 
                  maxWidth: '180px',
                  fontSize: '0.9rem'
                }}>
                  {item.title}
                </h6>
                <div className="fw-bold" style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                {/* Micro Quantity Stepper Controls */}
                <div className="d-flex align-items-center mt-2 gap-2">
                  <button 
                    className="btn d-flex align-items-center justify-content-center p-0" 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '8px', 
                      background: '#f5f5f5',
                      border: 'none',
                      color: 'var(--dark)',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="fw-bold" style={{ fontSize: '0.85rem', color: 'var(--dark)' }}>{item.quantity}</span>
                  <button 
                    className="btn d-flex align-items-center justify-content-center p-0" 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '8px', 
                      background: '#f5f5f5',
                      border: 'none',
                      color: 'var(--dark)',
                      fontSize: '0.9rem',
                      fontWeight: 'bold'
                    }}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button 
                className="btn p-2 border-0" 
                style={{ color: '#dc3545', background: 'transparent' }}
                onClick={() => removeFromCart(item.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Checkout Matrix Footer Block */}
      <div className="position-absolute bottom-0 start-0 w-100 p-4 border-top" style={{ background: 'var(--light)', borderTopColor: '#f0f0f0' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-bold" style={{ color: '#666', fontSize: '0.9rem' }}>Grand Total:</span>
          <span className="fw-black" style={{ 
            color: 'var(--primary)', 
            fontSize: '1.6rem', 
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif"
          }}>
            ${cartTotal}
          </span>
        </div>
        <button 
          className="btn w-100 py-3 fw-bold rounded shadow-sm mb-2" 
          style={{ 
            background: 'linear-gradient(135deg, var(--primary), #c01e12)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '0.95rem'
          }}
          disabled={cart.length === 0} 
          onClick={() => {
            onClose();
            navigate('/checkout');
          }}
        >
          <i className="fas fa-credit-card me-2"></i>Checkout Now
        </button>
        {cart.length > 0 && (
          <button 
            className="btn btn-sm w-100 text-decoration-none" 
            style={{ color: '#999', background: 'transparent', border: 'none', fontSize: '0.75rem' }}
            onClick={clearCart}
          >
            Clear Entire Cart
          </button>
        )}
      </div>

      <style>{`
        .animate-slide-in {
          animation: slideInRight 0.3s ease-out;
        }
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .btn-close:hover {
          opacity: 0.7;
        }
        .btn:hover {
          transform: translateY(-1px);
        }
        .btn:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CartDrawer;