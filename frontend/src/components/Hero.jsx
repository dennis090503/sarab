import React from "react";

const Hero = () => {
  const handleScrollToMenu = () => {
    const menu = document.getElementById("menu-section");

    if (menu) {
      window.scrollTo({
        top: menu.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero-section" className="hero-section" style={{ background: '#fff8f0' }}>
      <div className="container">
        <div className="row align-items-center min-vh-100">

          {/* LEFT */}

          <div className="col-lg-6 text-center text-lg-start">

            <h1 className="hero-title">
              Enjoy Our
              <br />
              <span>Delicious Meal</span>
            </h1>

            <p className="hero-desc">
              Experience the perfect harmony of traditional flavors and
              modern culinary arts. Every ingredient is selected with care
              to create an unforgettable dining experience.
            </p>
          </div>

          {/* RIGHT */}

          <div className="col-lg-6">

            <div className="hero-image-wrapper">

              <div className="hero-bg-circle"></div>

              <div className="hero-tag tag1">
                🍔 Burger
              </div>

              <div className="hero-tag tag2">
                🍕 Pizza
              </div>

              <div className="hero-tag tag3">
                ☕ Coffee
              </div>

              <div className="hero-tag tag4">
                🥗 Fresh Food
              </div>

              <div className="hero-tag tag5">
                ⭐ Best Quality
              </div>

              <img
                src="/main_images/banner-img.jpg"
                alt=""
                className="hero-food-image"
              />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;