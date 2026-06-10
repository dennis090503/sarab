import React from "react";

const About = () => {
  return (
    <div className="py-5" id="about-section" style={{ background: '#fff8f0', width: '100%' }}>
      <div className="container" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 15px' }}>
        <div className="row g-5 align-items-center">

          {/* LEFT IMAGE GRID - IMPROVED LAYOUT */}
          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-6 text-start">
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}>
                  <img
                    className="img-fluid rounded w-100"
                    src="/main_images/about1.jpg"
                    alt="Restaurant Interior"
                    style={{ transition: 'transform 0.5s ease', width: '100%', height: '250px', objectFit: 'cover' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>

              <div className="col-6 text-start">
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  marginTop: '25%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}>
                  <img
                    className="img-fluid rounded w-100"
                    src="/main_images/about2.jpg"
                    alt="Delicious Dish"
                    style={{ transition: 'transform 0.5s ease', width: '100%', height: '200px', objectFit: 'cover' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>

              <div className="col-6 text-end">
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}>
                  <img
                    className="img-fluid rounded w-100"
                    src="/chefs/2.jpg"
                    alt="Location"
                    style={{ transition: 'transform 0.5s ease', width: '100%', height: '180px', objectFit: 'cover' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>

              <div className="col-6 text-end">
                <div style={{
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}>
                  <img
                    className="img-fluid rounded w-100"
                    src="/chefs/i_5.webp"
                    alt="Fine Dining"
                    style={{ transition: 'transform 0.5s ease', width: '100%', height: '250px', objectFit: 'cover' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-lg-6">
            <div data-aos="fade-left">
              <span className="slbl" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.35rem', color: '#e8281a', display: 'block', marginBottom: '4px' }}>Our Story</span>
              <h2 className="stitle" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '12px', textAlign: 'left' }}>
                We Invite You to Visit<br />Our <span style={{ color: '#e8281a' }}>Food Restaurant</span>
              </h2>
              <div className="sline" style={{ width: '58px', height: '4px', borderRadius: '4px', background: 'linear-gradient(90deg, #e8281a, #f6a623)', margin: '0 0 12px 0' }}></div>
              
              <p className="mb-4" style={{ color: '#666', fontSize: '0.93rem', lineHeight: 1.8 }}>
                Founded in 2012, Sarab began as a small corner joint with a big dream - to serve food that brings people together. Today we're proud to serve thousands of happy customers every week with the same passion that started it all.
              </p>

              {/* FEATURE BLOCKS */}
              <div className="mb-4">
                <div className="d-flex gap-3 mb-3" style={{ alignItems: 'flex-start' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(232, 40, 26, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e8281a', fontSize: '1.15rem', flexShrink: 0, transition: '0.3s' }}>
                    <i className="fas fa-leaf"></i>
                  </div>
                  <div>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '2px', fontFamily: "'Poppins', sans-serif" }}>100% Fresh Ingredients</h6>
                    <p style={{ fontSize: '0.8rem', color: '#888', margin: 0, lineHeight: 1.6 }}>We source locally and sustainably. Every ingredient is hand-picked daily for maximum freshness.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3" style={{ alignItems: 'flex-start' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(246, 166, 35, 0.11)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f6a623', fontSize: '1.15rem', flexShrink: 0, transition: '0.3s' }}>
                    <i className="fas fa-award"></i>
                  </div>
                  <div>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '2px', fontFamily: "'Poppins', sans-serif" }}>Award-Winning Recipes</h6>
                    <p style={{ fontSize: '0.8rem', color: '#888', margin: 0, lineHeight: 1.6 }}>Our signature recipes have won national culinary awards 5 years in a row.</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3" style={{ alignItems: 'flex-start' }}>
                  <div style={{ width: '46px', height: '46px', borderRadius: '11px', background: 'rgba(45, 106, 79, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2d6a4f', fontSize: '1.15rem', flexShrink: 0, transition: '0.3s' }}>
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <div>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '2px', fontFamily: "'Poppins', sans-serif" }}>Lightning-Fast Delivery</h6>
                    <p style={{ fontSize: '0.8rem', color: '#888', margin: 0, lineHeight: 1.6 }}>Order online and get hot, fresh food at your door in under 25 minutes, guaranteed.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const menu = document.getElementById("menu-section");
                  if (menu) {
                    window.scrollTo({ top: menu.offsetTop - 100, behavior: "smooth" });
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #e8281a, #c01e12)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '14px 32px',
                  fontWeight: 600,
                  fontSize: '0.93rem',
                  boxShadow: '0 8px 24px rgba(232, 40, 26, 0.35)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  fontFamily: "'Poppins', sans-serif"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 34px rgba(232, 40, 26, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(232, 40, 26, 0.35)';
                }}
              >
                <i className="fas fa-book-open"></i> View Full Menu
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;