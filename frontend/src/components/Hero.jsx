import React from 'react';
import './file.css'
import image1 from './hero-img/image1.jpg'; 
import image2 from './hero-img/image2.jpg'; 
import image3 from './hero-img/image3.jpg'; 


const HeroSection = () => {
  return (
    <section className="section-hero">
      <div className="hero">
        <div className="hero-text-box">
          <p className="hero-greeting">Hi, there!</p>
          <h1 className="heading-primary">
            Testy, tangy, sweet and a healthy meal every single day
          </h1>
          <p className="hero-description">
            Hygienic and healthy is our topmost priority. Tailored to your personal tastes and nutritional needs.
          </p>
        </div>

        {/* image section  */}
        <div className="hero-img">
          <img src="" alt="" />
          <img src={image1} alt="Image 1"  className='hero-figure' />
          <img src={image2} alt="Image 2" className='hero-figure moveable' />
          <img src={image3} alt="Image 3" className='hero-figure' />
        </div>


      </div>
    </section>
  );
};

export default HeroSection;




