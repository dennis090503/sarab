import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; 

const Navbar = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 45) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Structural Smooth Scroll Anchor Handler Matrix
  const handleSectionScroll = (sectionId) => {
    setIsMobileMenuOpen(false);

    // If the guest is away from the main home page (e.g., at checkout), navigate back first, then scroll
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToSection: sectionId } });
      return;
    }

    setTimeout(() => {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        const navbarOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  // Listen for redirection scrolls triggered from secondary routes
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollToSection) {
      setTimeout(() => {
        const targetId = location.state.scrollToSection;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const navbarOffset = 100;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        window.history.replaceState({}, document.title);
      }, 300);
    }
  }, [location]);

  // Navigation items
  const navItems = [
    { id: 'hero-section', label: 'Home' },
    { id: 'about-section', label: 'About' },
    { id: 'menu-section', label: 'Menu' },
    { id: 'history', label: 'History' },
    { id: 'hours', label: 'Hours' },
    { id: 'contact-section', label: 'Contact' }
  ];

  return (
    <>
      {/* Fixed Navbar */}
      <nav 
        id="nav" 
        className={`navbar navbar-expand-lg px-4 py-3 transition-all ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
        style={{ 
          borderRadius: '50px',
          backgroundColor: '#2C4A3E',
          border: '2px solid rgba(255, 255, 255, 0.15)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'fixed',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 32px)',
          maxWidth: '1320px',
          zIndex: 1050,
          margin: 0
        }}
      >
        <div className="container-fluid">
          {/* Brand Logo Identity System */}
          <Link 
            to="/" 
            className="navbar-brand blogo d-flex align-items-center text-decoration-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bico d-flex align-items-center justify-content-center text-white rounded-circle me-2" style={{ backgroundColor: '#FCFBF9', width: '38px', height: '38px' }}>
              <i className="fa fa-utensils small" style={{ color: '#2C4A3E' }}></i>
            </div>
            <div className="bname text-start d-flex flex-column justify-content-center">
              <span className="fw-black text-uppercase lh-1" style={{ fontFamily: '"Playfair Display", serif', color: '#FCFBF9', fontSize: '1.45rem', fontWeight: 900, letterSpacing: '1px' }}>
                SARAB<span style={{ color: '#f6a623' }}>.</span>
              </span>
            </div>
          </Link>

          {/* User Control Interface Block Container */}
          <div className="d-flex align-items-center gap-2 order-lg-last ms-auto ms-lg-3">
            
            {/* Basket Counter Trigger Anchor */}
            <button 
              onClick={onCartClick} 
              className="btn position-relative d-flex align-items-center justify-content-center shadow-sm border-0 transition-all"
              style={{ 
                width: '45px', 
                height: '45px', 
                borderRadius: '50%', 
                backgroundColor: '#f6a623',
                color: '#2C4A3E',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              title="Open Shopping Basket"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#e8950f';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#f6a623';
              }}
            >
              <i className="fas fa-shopping-basket" style={{ fontSize: '1.1rem' }}></i>
              
              {cartCount > 0 && (
                <span 
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill font-weight-bold"
                  style={{ 
                    fontSize: '0.72rem', 
                    padding: '4px 7px',
                    backgroundColor: '#f6a623',
                    color: '#2C4A3E',
                    border: '2px solid #FCFBF9'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="navbar-toggler d-lg-none border-0 ms-1" 
              type="button" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ height: '42px', width: '42px', backgroundColor: 'transparent', color: '#FCFBF9', outline: 'none' }}
            >
              <span className="fa fa-bars" style={{ fontSize: '1.3rem' }}></span>
            </button>
          </div>

          {/* Interactive Core Links Component Pipeline */}
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show text-center py-3' : ''}`} id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 gap-1">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleSectionScroll(item.id)} 
                  className="nav-link bg-transparent border-0 px-3 py-2 text-start-md"
                  style={{ 
                    fontWeight: 600, 
                    color: '#FCFBF9',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#f6a623';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#FCFBF9';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div style={{ height: '96px' }}></div>

      <style>{`
        @media (max-width: 992px) {
          nav {
            width: calc(100% - 32px) !important;
            top: 12px !important;
          }
          .navbar-nav {
            background: transparent;
          }
          .navbar-nav .nav-link {
            padding: 12px 16px !important;
            text-align: center;
          }
          .navbar-toggler:focus {
            box-shadow: none;
          }
        }
        .navbar-toggler {
          outline: none;
        }
        .transition-all {
          transition: all 0.3s ease;
        }
        body {
          background: #fff8f0 !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;