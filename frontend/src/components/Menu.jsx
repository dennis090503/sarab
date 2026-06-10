import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import API from '../api/axios.js';
const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [portionQty, setPortionQty] = useState(1);
  
  const { addToCart } = useCart();

  const fetchMenuData = async () => {
    try {
      // This sends a request to VITE_API_BASE_URL + '/api/menu'
      const response = await API.get('/api/menu');
      
      // Axios puts the parsed JSON automatically into response.data
      if (response.data) {
        setMenuData(response.data);
      }
    } catch (err) {
      console.error('Error fetching menu:', err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  API.get('/api/menu')
    .then((res) => {
      // 🛡️ SAFETY CHECK: Extract the array safely no matter how the backend formats it
      let menuArray = [];
      
      if (Array.isArray(res.data)) {
        menuArray = res.data;
      } else if (res.data && Array.isArray(res.data.menu)) {
        menuArray = res.data.menu;
      } else if (res.data && Array.isArray(res.data.data)) {
        menuArray = res.data.data;
      }

      setMenuItems(menuArray);
    })
    .catch((err) => {
      console.error("Failed to load menu items:", err);
      setMenuItems([]); // 🛡️ Force fallback to empty array so .map() never crashes
    });
}, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [selectedItem]);

  const filteredItems = activeFilter === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeFilter);

  const openModal = (item) => {
    setSelectedItem(item);
    setPortionQty(1);
  };

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    const cleaned = priceStr.replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  if (loading) {
    return (
      <div className="py-5 text-center bg-white d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }} role="status"></div>
        <p className="mt-3 text-muted fw-bold small text-uppercase" style={{ letterSpacing: '1px' }}>Loading Kitchen Catalog...</p>
      </div>
    );
  }

  return (
    <>
      {/* FIXED: Changed id from "menu" to "menu-section" to match navbar */}
      <section id="menu-section" className="py-5" style={{ background: '#f9f5f0' }}>
        <div className="container">
          
          {/* Header Typography Stacks */}
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.35rem', color: '#e8281a', display: 'block', marginBottom: '4px' }}>What's Cooking</span>
            <h2 className="stitle" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '12px' }}>
              Our Delicious <span style={{ color: '#e8281a' }}>Menu</span>
            </h2>
            <div className="sline" style={{ width: '58px', height: '4px', borderRadius: '4px', background: 'linear-gradient(90deg, #e8281a, #f6a623)', margin: '0 auto 12px' }}></div>
          </div>

          {/* Interactive Navigation Filter Tab Buttons */}
          <div className="text-center mb-4 flex-wrap d-flex justify-content-center gap-2" data-aos="fade-up">
            {['all', 'burgers', 'pizza', 'chicken', 'wraps', 'desserts', 'pasta'].map((category) => (
              <button 
                key={category}
                onClick={() => setActiveFilter(category)}
                style={{
                  border: activeFilter === category ? '2px solid #e8281a' : '2px solid #e5e5e5',
                  background: activeFilter === category ? '#e8281a' : '#fff',
                  color: activeFilter === category ? '#fff' : '#666',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  margin: '3px',
                  fontFamily: "'Poppins', sans-serif"
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== category) {
                    e.target.style.background = '#e8281a';
                    e.target.style.color = '#fff';
                    e.target.style.borderColor = '#e8281a';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== category) {
                    e.target.style.background = '#fff';
                    e.target.style.color = '#666';
                    e.target.style.borderColor = '#e5e5e5';
                  }
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Responsive Card Deck Display Grid Array */}
          <div className="row g-4" id="mgrid">
            {filteredItems.map((item, idx) => (
              <div className="col-sm-6 col-lg-4" key={item.id || item._id} data-aos="fade-up" data-aos-delay={idx * 80}>
                <div 
                  className="mcard"
                  onClick={() => openModal(item)}
                  style={{
                    background: '#fff',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                    boxShadow: '0 4px 22px rgba(0, 0, 0, 0.07)',
                    cursor: 'pointer',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-9px)';
                    e.currentTarget.style.boxShadow = '0 18px 48px rgba(0, 0, 0, 0.13)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 22px rgba(0, 0, 0, 0.07)';
                  }}
                >
                  <div className="mimg" style={{ position: 'relative', overflow: 'hidden', height: '215px', background: '#fef0dc' }}>
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.09)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      onError={(e) => {
                        // Fixed: Simplified error handling to avoid infinite loop
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop';
                      }}
                    />
                    {item.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '13px',
                        left: '13px',
                        background: item.badgeClass === 'hot' ? '#f6a623' : '#2d6a4f',
                        color: item.badgeClass === 'hot' ? '#1a1a1a' : '#fff',
                        borderRadius: '7px',
                        padding: '3px 11px',
                        fontSize: '0.7rem',
                        fontWeight: 700
                      }}>
                        <i className="fas fa-star" style={{ marginRight: '4px', fontSize: '0.65rem' }}></i> {item.badge}
                      </div>
                    )}
                    <div className="mhrt" style={{
                      position: 'absolute',
                      top: '13px',
                      right: '13px',
                      width: '33px',
                      height: '33px',
                      borderRadius: '50%',
                      background: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ccc',
                      cursor: 'pointer',
                      transition: '0.3s',
                      boxShadow: '0 2px 9px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#e8281a';
                      e.currentTarget.style.transform = 'scale(1.18)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#ccc';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onClick={(e) => e.stopPropagation()}>
                      <i className="far fa-heart"></i>
                    </div>
                  </div>
                  
                  <div className="mbody" style={{ padding: '18px' }}>
                    <div className="mcat" style={{ fontSize: '0.7rem', fontWeight: 600, color: '#f6a623', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
                      {item.displayCategory || item.category}
                    </div>
                    <div className="mtit" style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '5px', fontFamily: "'Playfair Display', serif", color: '#1a1a1a' }}>
                      {item.title}
                    </div>
                    <div className="mdesc" style={{ fontSize: '0.78rem', color: '#aaa', marginBottom: '13px', lineHeight: 1.5 }}>
                      {item.shortDesc}
                    </div>
                    <div className="mfoot" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div className="mprice" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e8281a', fontFamily: "'Playfair Display', serif" }}>
                          {item.price}
                          {item.oldPrice && <small style={{ fontSize: '0.72rem', fontWeight: 400, color: '#ccc', textDecoration: 'line-through', marginLeft: '5px' }}>{item.oldPrice}</small>}
                        </div>
                        <div className="mstars" style={{ fontSize: '0.73rem', color: '#f6a623' }}>
                          <i className="fas fa-star"></i>
                          <span style={{ color: '#bbb', fontSize: '.7rem', marginLeft: '4px' }}>({item.reviews || 0})</span>
                        </div>
                      </div>
                      <button 
                        className="madd" 
                        title="View Details"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #e8281a, #c01e12)',
                          border: 'none',
                          color: '#fff',
                          fontSize: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15) rotate(90deg)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0)'}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          openModal(item);
                        }}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Pop-up Details Card Modal Overlay - Same as before, keep it */}
      {selectedItem && (
        <div id="menuPop" onClick={() => setSelectedItem(null)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.84)',
          backdropFilter: 'blur(5px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '18px'
        }}>
          <div className="mpbox" onClick={(e) => e.stopPropagation()} style={{
            background: '#fff',
            borderRadius: '22px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '88vh',
            overflowY: 'auto',
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap'
          }}>
            <button className="mpclose" onClick={() => setSelectedItem(null)} style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: '#f2f2f2',
              border: 'none',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: '0.3s',
              zIndex: 2
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#e8281a'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#f2f2f2'; e.currentTarget.style.color = '#000'; }}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="mpimg" style={{
              width: '44%',
              background: '#fef0dc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '22px 0 0 22px',
              overflow: 'hidden',
              minHeight: '400px'
            }}>
              <img 
                src={selectedItem.img} 
                alt={selectedItem.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop'; }}
              />
            </div>
            
            <div className="mpbody" style={{ width: '56%', padding: '34px 30px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f6a623', textTransform: 'uppercase', letterSpacing: '1.3px', marginBottom: '7px' }}>
                {selectedItem.displayCategory || selectedItem.category}
              </div>
              <div style={{ fontSize: '1.7rem', fontWeight: 900, marginBottom: '9px', fontFamily: "'Playfair Display', serif", color: '#1a1a1a' }}>
                {selectedItem.title}
              </div>
              
              <div style={{ color: '#f6a623', fontSize: '0.88rem', marginBottom: '14px' }}>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <span style={{ color: '#bbb', fontSize: '.78rem', marginLeft: '8px' }}>{selectedItem.rating || "5.0"} ({selectedItem.reviews || 0} reviews)</span>
              </div>
              
              <div style={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.8, marginBottom: '18px' }}>
                {selectedItem.longDesc || selectedItem.shortDesc}
              </div>
              
              <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#e8281a', marginBottom: '14px', fontFamily: "'Playfair Display', serif" }}>
                {selectedItem.price}
                {selectedItem.oldPrice && <small style={{ fontSize: '0.95rem', color: '#ccc', textDecoration: 'line-through', marginLeft: '7px' }}>{selectedItem.oldPrice}</small>}
              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', background: '#f9f5f0', borderRadius: '9px', padding: '9px 14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1a1a1a' }}>{selectedItem.calories || "420"} kcal</div>
                  <div style={{ fontSize: '0.68rem', color: '#bbb' }}>Calories</div>
                </div>
                <div style={{ textAlign: 'center', background: '#f9f5f0', borderRadius: '9px', padding: '9px 14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1a1a1a' }}>{selectedItem.prepTime || "15"} min</div>
                  <div style={{ fontSize: '0.68rem', color: '#bbb' }}>Prep Time</div>
                </div>
                <div style={{ textAlign: 'center', background: '#f9f5f0', borderRadius: '9px', padding: '9px 14px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1a1a1a' }}>{selectedItem.rating || "5.0"}/5</div>
                  <div style={{ fontSize: '0.68rem', color: '#bbb' }}>Rating</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px', marginBottom: '18px' }}>
                <button 
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '2px solid #e8281a',
                    background: 'transparent',
                    color: '#e8281a',
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.3s',
                    fontWeight: 700
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#e8281a'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e8281a'; }}
                  onClick={() => portionQty > 1 && setPortionQty(portionQty - 1)}
                >
                  -
                </button>
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1a1a1a', minWidth: '30px', textAlign: 'center' }}>{portionQty}</span>
                <button 
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    border: '2px solid #e8281a',
                    background: 'transparent',
                    color: '#e8281a',
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.3s',
                    fontWeight: 700
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#e8281a'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e8281a'; }}
                  onClick={() => setPortionQty(portionQty + 1)}
                >
                  +
                </button>
                <span style={{ fontSize: '.82rem', color: '#aaa', marginLeft: '9px' }}>portion(s)</span>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px' }}>
                {(selectedItem.tags || ["Fresh", "Chef's Choice", "Popular"]).map((tag, idx) => (
                  <span key={idx} style={{ background: 'rgba(246, 166, 35, 0.11)', color: '#1a1a1a', borderRadius: '20px', padding: '3px 11px', fontSize: '0.73rem', fontWeight: 600 }}>
                    #{tag}
                  </span>
                ))}
              </div>
              
              <button 
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #e8281a, #c01e12)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '15px',
                  fontSize: '0.96rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Poppins', sans-serif",
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '9px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 28px rgba(232, 40, 26, 0.38)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => {
                  const cartItem = {
                    ...selectedItem,
                    price: parsePrice(selectedItem.price),
                    id: selectedItem.id || selectedItem._id
                  };
                  addToCart(cartItem, portionQty);
                  setSelectedItem(null);
                }}
              >
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 991px) {
          .mpimg {
            width: 100% !important;
            border-radius: 22px 22px 0 0 !important;
            min-height: 240px !important;
          }
          .mpbody {
            width: 100% !important;
            padding: 22px 18px !important;
          }
        }
        @keyframes modalScaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .mpbox {
          animation: modalScaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </>
  );
};

export default Menu;