// src/components/HistoryHours.jsx
import React, { useState, useEffect } from 'react';

const HistoryHours = () => {
  const [countdown, setCountdown] = useState({
    hours: 8,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer for special offer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timelineData = [
    {
      year: "2012",
      title: "Evolution of Restaurants",
      description: "Sarab opens its first 20-seat diner on Flavor Street. Within 3 months, lines stretch around the block every evening as word of our food spreads."
    },
    {
      year: "2015",
      title: "Fine Dining & The Concept",
      description: "Expanding the vision - we introduced our signature tasting menu and hired our first Michelin-trained chef, elevating our craft to remarkable new heights."
    },
    {
      year: "2019",
      title: "Modern Fast Food Origins",
      description: "Launched our signature fast-food line, merging gourmet quality with speed and convenience. Within 6 months we won 3 prestigious culinary awards nationally."
    },
    {
      year: "2026",
      title: "National Expansion",
      description: "Now operating in 8 cities across the US with an online delivery platform handling 10,000+ orders weekly - and growing every single day."
    }
  ];

  const openingHours = [
    { day: "Monday - Tuesday", hours: "Closed", isOpen: false },
    { day: "Wednesday - Thursday", hours: "09:00 AM - 10:00 PM", isOpen: true },
    { day: "Friday", hours: "09:00 AM - 11:00 PM", isOpen: true },
    { day: "Saturday", hours: "10:00 AM - 11:30 PM", isOpen: true },
    { day: "Sunday", hours: "11:00 AM - 09:00 PM", isOpen: true }
  ];

  return (
    <>
      {/* ============================================================
         HISTORY SECTION - Timeline with alternating layout
         ============================================================ */}
      <section id="history" className="py-5" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h5 className="section-title text-start text-primary fw-normal">
                        Our Journery
                        </h5>
            <h2 className="stitle">A History of <span>Restaurant</span></h2>
            <div className="sline"></div>
            <p className="sdesc mx-auto" style={{ maxWidth: '480px' }}>
              From humble beginnings to the city's most beloved restaurant - every chapter written with passion.
            </p>
          </div>

          <div className="timeline" data-aos="fade-up">
            {timelineData.map((item, index) => (
              <div className="tli" key={index}>
                <div className="tl-left">
                  <div className="tlyear">{item.year}</div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
                <div className="tl-center">
                  <div className="tldot"></div>
                </div>
                <div className="tl-right">
                  <div className="tlyear">{item.year}</div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
         HOURS SECTION - Opening hours and contact info
         ============================================================ */}
      <section id="hours" className="py-5" style={{ background: 'linear-gradient(135deg, var(--green), #1a4a35)', position: 'relative', overflow: 'hidden' }}>
        <div className="hrsbg" style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '28px 28px' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="slbl" style={{ color: '#a5d6bc' }}>Opening Hours</span>
            <h2 className="stitle" style={{ color: '#fff' }}>We're Open <span style={{ color: 'var(--secondary)' }}>For You</span></h2>
            <div className="sline"></div>
          </div>

          <div className="row g-4 align-items-start">
            {/* Opening Hours Card */}
            <div className="col-lg-5" data-aos="fade-right">
              <div className="hrscard" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.14)', borderRadius: '18px', padding: '28px' }}>
                {openingHours.map((item, idx) => (
                  <div className="hrsrow" key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: idx < openingHours.length - 1 ? '1px solid rgba(255, 255, 255, 0.09)' : 'none' }}>
                    <span className="hrsday" style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.9rem', fontWeight: 500 }}>
                      <i className="fas fa-calendar-day me-2" style={{ color: 'var(--secondary)' }}></i>
                      {item.day}
                    </span>
                    <div className="d-flex align-items-center gap-2">
                      <div className="hdot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.isOpen ? '#4ade80' : '#ff6b6b', boxShadow: item.isOpen ? '0 0 7px #4ade80' : 'none' }}></div>
                      <span className="hrstime" style={{ color: item.isOpen ? '#fff' : '#ff6b6b', fontWeight: 700, fontSize: '0.9rem' }}>{item.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Online CTA Card */}
            <div className="col-lg-3" data-aos="zoom-in">
              <div className="hrscta" style={{ background: 'var(--primary)', borderRadius: '18px', padding: '28px', textAlign: 'center', boxShadow: '0 18px 48px rgba(232, 40, 26, 0.4)' }}>
                <i className="fas fa-truck-fast fa-2x mb-3" style={{ color: 'rgba(255, 255, 255, 0.8)' }}></i>
                <h4 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 800 }}>Order Online</h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.86rem', margin: '9px 0 18px' }}>Get hot food delivered in 25 minutes</p>
              </div>
            </div>

            {/* Find Us / Contact Info Card */}
            <div className="col-lg-4" data-aos="fade-left">
              <div className="hrscard" style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.14)', borderRadius: '18px', padding: '28px' }}>
                <h5 style={{ color: '#fff', marginBottom: '18px', fontFamily: "'Poppins', sans-serif", fontSize: '.95rem', fontWeight: 700 }}>
                  <i className="fas fa-map-marker-alt me-2" style={{ color: 'var(--secondary)' }}></i>Find Us
                </h5>
                <div className="hrsrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.09)' }}>
                  <span className="hrsday" style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <i className="fas fa-location-dot me-2" style={{ color: 'var(--secondary)' }}></i>Address
                  </span>
                  <span className="hrstime" style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>42 Flavor Street, NY</span>
                </div>
                <div className="hrsrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.09)' }}>
                  <span className="hrsday" style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <i className="fas fa-phone me-2" style={{ color: 'var(--secondary)' }}></i>Phone
                  </span>
                  <span className="hrstime" style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>+1 (800) 123-4567</span>
                </div>
                <div className="hrsrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: 'none' }}>
                  <span className="hrsday" style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '0.9rem', fontWeight: 500 }}>
                    <i className="fas fa-envelope me-2" style={{ color: 'var(--secondary)' }}></i>Email
                  </span>
                  <span className="hrstime" style={{ color: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>hello@sarabfood.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
         SPECIAL OFFER SECTION with Countdown Timer
         ============================================================ */}
     

      <style>{`
        @keyframes fltimg {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-17px); }
        }
        @keyframes plsbdg {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); box-shadow: 0 12px 34px rgba(232, 40, 26, 0.7); }
        }
        .timeline {
          position: relative;
          padding: 18px 0;
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          background: linear-gradient(to bottom, var(--primary), var(--secondary));
          top: 0;
          bottom: 0;
        }
        .tli {
          display: grid;
          grid-template-columns: 1fr 36px 1fr;
          margin-bottom: 50px;
          align-items: start;
        }
        .tl-left {
          padding-right: 32px;
          text-align: right;
        }
        .tl-center {
          display: flex;
          justify-content: center;
          padding-top: 5px;
        }
        .tl-right {
          padding-left: 32px;
          text-align: left;
        }
        .tli:nth-child(odd) .tl-right {
          visibility: hidden;
        }
        .tli:nth-child(even) .tl-left {
          visibility: hidden;
        }
        .tldot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--primary);
          border: 4px solid #fff;
          box-shadow: 0 0 0 3px rgba(232, 40, 26, 0.3);
          flex-shrink: 0;
        }
        .tlyear {
          font-family: "Dancing Script", cursive;
          color: var(--primary);
          font-size: 1.15rem;
          margin-bottom: 3px;
        }
        .tl-left h5, .tl-right h5 {
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 7px;
          font-family: "Playfair Display", serif;
          color: var(--dark);
        }
        .tl-left p, .tl-right p {
          font-size: 0.83rem;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }
        @media (max-width: 767px) {
          .timeline::before {
            left: 16px;
          }
          .tli {
            grid-template-columns: 32px 1fr;
            gap: 0;
          }
          .tl-left {
            display: none;
          }
          .tl-right {
            display: block !important;
            visibility: visible !important;
            padding-left: 18px;
            text-align: left;
          }
          .tl-center {
            padding-top: 5px;
          }
          .tli:nth-child(odd) .tl-right {
            visibility: visible !important;
          }
        }
      `}</style>
    </>
  );
};

export default HistoryHours;