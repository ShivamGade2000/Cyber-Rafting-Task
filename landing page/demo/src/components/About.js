import React from 'react';
import './AboutUs.css'; // Ensure this file includes the updated CSS

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <div className="about-us-text">
          <h1>About Us</h1>
          <section className="vision">
            <h2>Our Vision</h2>
            <p>
              Our vision is to power the earth with clean and green energy sources. 
              At Sunrise Solar, we believe in creating a sustainable future by harnessing 
              the power of the sun to meet the energy needs of today while preserving the 
              environment for future generations.
            </p>
          </section>
          <section className="mission">
            <h2>Our Mission</h2>
            <p>
              Uniting customers, installers, and financiers, we are driving sustainability forward! 
              Our mission is to provide top-notch solar solutions that enhance your home or business 
              while contributing to a cleaner planet. We are dedicated to making the transition to solar 
              energy as smooth and beneficial as possible.
            </p>
          </section>
          <section className="commitment">
            <h2>Why Choose Sunrise Solar?</h2>
            <p>
              Sunrise Solar is committed to offering the best solar solutions tailored to your specific needs. 
              Our team of experts will guide you through every step of the process—from choosing the right 
              solar system to ensuring a seamless installation. With our expertise and support, you can be 
              confident in your decision to invest in solar energy.
            </p>
          </section>
        </div>
        <img 
          src={`${process.env.PUBLIC_URL}/customerDashboardimg.jpg`} 
          alt="Customer Dashboard" 
          className="about-us-image"
        />
      </div>
    </div>
  );
};

export default AboutUs;
