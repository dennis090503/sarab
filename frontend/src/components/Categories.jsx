import React from "react";

const Categories = () => {
  const categoriesData = [
    {
      id: 1,
      icon: "fa-user-tie",
      title: "Master Chefs",
      description:
        "Our experienced chefs blend passion and creativity to craft unforgettable culinary experiences."
    },
    {
      id: 2,
      icon: "fa-utensils",
      title: "Quality Food",
      description:
        "Fresh ingredients, authentic recipes, and exceptional quality are at the heart of every dish."
    },
    {
      id: 3,
      icon: "fa-cart-plus",
      title: "Online Ordering",
      description:
        "Order your favorite meals with ease and enjoy restaurant-quality food delivered to your doorstep."
    }
  ];

  return (
    <div className="py-5" id="categories-section" style={{ background: '#fff8f0', width: '100%' }}>
      <div className="container" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 15px' }}>
        
        {/* Section Header */}
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="slbl" style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.35rem', color: '#e8281a', display: 'block', marginBottom: '4px' }}>What We Offer</span>
          <h2 className="stitle" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.7rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '12px' }}>
            Browse by <span style={{ color: '#e8281a' }}>Category</span>
          </h2>
          <div className="sline" style={{ width: '58px', height: '4px', borderRadius: '4px', background: 'linear-gradient(90deg, #e8281a, #f6a623)', margin: '0 auto 12px' }}></div>
          <p className="sdesc mx-auto" style={{ maxWidth: '480px', color: '#666', fontSize: '0.93rem', lineHeight: 1.8 }}>
            From sizzling burgers to exotic world cuisines - find your favourite in our menu
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {categoriesData.map((item, index) => (
            <div className="col-lg-3 col-sm-6" key={item.id} data-aos="zoom-in" data-aos-delay={index * 70}>
              <div className="service-item rounded h-100" style={{ 
                background: '#fff', 
                boxShadow: '0 0 45px rgba(0, 0, 0, 0.08)', 
                transition: '0.5s',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '16px'
              }}>
                <div className="p-4 text-center">
                  <div className="service-icon-wrapper mb-4" style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    background: 'rgba(225, 91, 100, 0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto',
                    transition: '0.5s'
                  }}>
                    <i
                      className={`fa ${item.icon} fa-3x`}
                      style={{ color: 'var(--primary)', transition: '0.5s' }}
                    ></i>
                  </div>

                  <h5 className="mb-3 service-title" style={{ 
                    color: 'var(--dark)', 
                    fontWeight: 700, 
                    transition: '0.5s',
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.25rem'
                  }}>
                    {item.title}
                  </h5>

                  <p className="mb-0 service-desc" style={{ 
                    color: '#666', 
                    lineHeight: 1.7, 
                    transition: '0.5s',
                    fontSize: '0.9rem'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-item:hover {
          background: var(--primary) !important;
          transform: translateY(-10px);
        }
        .service-item:hover .service-icon-wrapper {
          background: rgba(255, 255, 255, 0.2) !important;
        }
        .service-item:hover .service-icon-wrapper i {
          color: #ffffff !important;
        }
        .service-item:hover .service-title,
        .service-item:hover .service-desc {
          color: #ffffff !important;
        }
        @media (max-width: 768px) {
          .container {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Categories;