import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-top bg-white" style={{ borderTopColor: 'rgba(225, 91, 100, 0.1)' }}>
      
      {/* MAIN FOOTER CONTENT */}
      <div className="container py-5 text-start">
        <div className="row g-5">
          
          {/* Brand Section */}
          <div className="col-lg-4 col-md-12">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bico" style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', color: '#fff', boxShadow: '0 4px 15px rgba(225, 91, 100, 0.35)' }}>
                <i className="fas fa-utensils"></i>
              </div>
              <div>
                <div className="bname" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 900, color: 'var(--dark)' }}>
                  Sar<span style={{ color: 'var(--primary)' }}>ab</span>
                </div>
                <div className="bsub" style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#aaa' }}>Premium Dining</div>
              </div>
            </div>
            <p className="fdesc" style={{ color: '#777', fontSize: '0.86rem', lineHeight: 1.8, marginTop: '9px' }}>
              We bring the world's finest flavors together in a fast, friendly, and affordable experience. Every meal crafted with love.
            </p>
            <div className="fsoc d-flex gap-3 mt-3">
              <a href="#" className="text-muted fs-5" style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(0, 0, 0, 0.04)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-muted fs-5" style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(0, 0, 0, 0.04)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-muted fs-5" style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(0, 0, 0, 0.04)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-muted fs-5" style={{ width: '36px', height: '36px', borderRadius: '9px', background: 'rgba(0, 0, 0, 0.04)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
        

          {/* Our Menu */}
          <div className="col-sm-6 col-lg-2">
            <div className="ftit" style={{ color: 'var(--dark)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '18px', paddingBottom: '9px', borderBottom: '2px solid var(--primary)', display: 'inline-block' }}>Our Menu</div>
            <ul className="flinks ps-0 list-unstyled">
              <li className="mb-2"><a href="#menu-section" className="text-muted text-decoration-none" style={{ fontSize: '0.86rem', transition: '0.3s', display: 'inline-flex', alignItems: 'center', gap: '7px' }}><i className="fas fa-chevron-right" style={{ color: 'var(--primary)', fontSize: '0.68rem' }}></i>Burgers</a></li>
              <li className="mb-2"><a href="#menu-section" className="text-muted text-decoration-none" style={{ fontSize: '0.86rem', transition: '0.3s', display: 'inline-flex', alignItems: 'center', gap: '7px' }}><i className="fas fa-chevron-right" style={{ color: 'var(--primary)', fontSize: '0.68rem' }}></i>Pizza</a></li>
              <li className="mb-2"><a href="#menu-section" className="text-muted text-decoration-none" style={{ fontSize: '0.86rem', transition: '0.3s', display: 'inline-flex', alignItems: 'center', gap: '7px' }}><i className="fas fa-chevron-right" style={{ color: 'var(--primary)', fontSize: '0.68rem' }}></i>Fried Chicken</a></li>
              <li className="mb-2"><a href="#menu-section" className="text-muted text-decoration-none" style={{ fontSize: '0.86rem', transition: '0.3s', display: 'inline-flex', alignItems: 'center', gap: '7px' }}><i className="fas fa-chevron-right" style={{ color: 'var(--primary)', fontSize: '0.68rem' }}></i>Wraps & Rolls</a></li>
              <li className="mb-2"><a href="#menu-section" className="text-muted text-decoration-none" style={{ fontSize: '0.86rem', transition: '0.3s', display: 'inline-flex', alignItems: 'center', gap: '7px' }}><i className="fas fa-chevron-right" style={{ color: 'var(--primary)', fontSize: '0.68rem' }}></i>Pasta</a></li>
              <li className="mb-2"><a href="#menu-section" className="text-muted text-decoration-none" style={{ fontSize: '0.86rem', transition: '0.3s', display: 'inline-flex', alignItems: 'center', gap: '7px' }}><i className="fas fa-chevron-right" style={{ color: 'var(--primary)', fontSize: '0.68rem' }}></i>Desserts</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="ftit" style={{ color: 'var(--dark)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '18px', paddingBottom: '9px', borderBottom: '2px solid var(--primary)', display: 'inline-block' }}>Get In Touch</div>
            <div className="fci d-flex gap-3 mb-3">
              <div className="fciico" style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'rgba(225, 91, 100, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.82rem', flexShrink: 0 }}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="fciinfo" style={{ color: '#777', fontSize: '0.83rem', lineHeight: 1.6 }}>
                <strong style={{ color: '#bbb', display: 'block', fontSize: '0.77rem' }}>Address</strong>
                42 Flavor Street, Manhattan, NY 10001
              </div>
            </div>
            <div className="fci d-flex gap-3 mb-3">
              <div className="fciico" style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'rgba(225, 91, 100, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.82rem', flexShrink: 0 }}>
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="fciinfo" style={{ color: '#777', fontSize: '0.83rem', lineHeight: 1.6 }}>
                <strong style={{ color: '#bbb', display: 'block', fontSize: '0.77rem' }}>Phone</strong>
                +1 (800) 123-4567
              </div>
            </div>
            <div className="fci d-flex gap-3 mb-3">
              <div className="fciico" style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'rgba(225, 91, 100, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.82rem', flexShrink: 0 }}>
                <i className="fas fa-envelope"></i>
              </div>
              <div className="fciinfo" style={{ color: '#777', fontSize: '0.83rem', lineHeight: 1.6 }}>
                <strong style={{ color: '#bbb', display: 'block', fontSize: '0.77rem' }}>Email</strong>
                hello@sarabfood.com
              </div>
            </div>
            <div className="fci d-flex gap-3 mb-3">
              <div className="fciico" style={{ width: '34px', height: '34px', borderRadius: '7px', background: 'rgba(225, 91, 100, 0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '0.82rem', flexShrink: 0 }}>
                <i className="fas fa-clock"></i>
              </div>
              <div className="fciinfo" style={{ color: '#777', fontSize: '0.83rem', lineHeight: 1.6 }}>
                <strong style={{ color: '#bbb', display: 'block', fontSize: '0.77rem' }}>Hours</strong>
                Wed - Sun: 09 AM - 11 PM
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="mt-5 pt-4 border-top text-center text-muted small d-flex flex-wrap justify-content-between align-items-center gap-2" style={{ borderTopColor: 'rgba(0, 0, 0, 0.06)' }}>
         
          <div className="d-flex gap-3">
            <a href="#" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>Privacy Policy</a>
            <a href="#" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>Terms</a>
            <a href="#" className="text-muted text-decoration-none" style={{ fontSize: '0.8rem' }}>Cookies</a>
          </div>
        </div>
      </div>

      <style>{`
        .fsoc a:hover {
          background: var(--primary) !important;
          color: #fff !important;
          transform: translateY(-3px);
        }
        .flinks a:hover {
          color: var(--primary) !important;
          padding-left: 5px;
        }
      `}</style>
    </footer>
  );
};

export default Footer;