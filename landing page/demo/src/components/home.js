
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import { hover } from '@testing-library/user-event/dist/hover';

function Home() {
  const navigate = useNavigate();
  

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/loginform");
  };


  const handleAboutClick = (e) => {
    e.preventDefault();
    navigate('/About');
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate('/Contact');
  };
  

  return (
    <div className="container-fluid">
      {/* here we used bootstrap class to make navbar sticky : fixed-top*/}
      <nav className="fixed-top navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a classsname=""></a>
          <a className="navbar-brand" href="#">
            <img src="solarLogo.png" alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  href="#"
                  style={{ fontSize: "bold", fontWeight: " 900" }}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleAboutClick}  style={{ fontSize: "bold", fontWeight: " 900" }}>
               
                  About
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleContactClick}  style={{ fontSize: "bold", fontWeight: " 900" }}>
                  Contact
                </button>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <button
                className="btn btn-success"
                type="button"
                onClick={handleLoginClick}
              >
                Login
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-info"
                type="button"
                onClick={() => navigate("/registration")} style={{backgroundColor:'#198751', color:'white', cursor:'pointer', border:'none'}}>
                Registration
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Carousel */}
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/Rooftop Solar Home.webp"
              style={{ width: "100%", height: "100%" }}  /* make it 100px to fix height  */
              className="d-block w-100"
              alt="Rooftop Solar Home"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/Mechanic.jpg"
              style={{ width: "100%", height: "100%" }}  /* make it 100px to fix height  */
              className="d-block w-100"
              alt="Home"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/Rooftop Solar Home 2.webp"
              style={{ width: "100%", height: "100%" }}
              className="d-block w-100"
              alt="Green and Clean"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* How It Works */}
      <div
        className="row mt-3"
        style={{ backgroundColor: "midnightblue", padding: "0% 0% 8% 0%" }}>
        <div
          className="benifits"
          style={{ marginBottom: "5rem", backgroundColor: "white" }}>
          <h1 style={{ textAlign: "center", color: "black" }}>
            Get Rooftop Solar.
          </h1>
          <h2 style={{ textAlign: "center", color: "black" }}>
            {" "}
            The most convenient way.
          </h2>
          <h4 style={{ textAlign: "center", color: "black" }}>
            Save Money and our Planet Earth at the same time.
          </h4>
        </div>
        <h1
          style={{ textAlign: "center", color: "white", marginBottom: "4rem" }}
        >
          How does Sunrise Solar work?
        </h1>
        <div className="col-4">
          <div className="card" style={{ height: "100%" }}>
            <img
              src="/card1.png"
              className="card-img-top"
              alt="Register to get quotes"/>
            <div className="card-body">
              <h5 className="card-title">Register to get quotes</h5>
              <p className="card-text">
                Register from the comfort of your home and complete your
                property profile
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card" style={{ height: "100%" }}>
            <img
              src="/card2.png"
              className="card-img-top"
              alt="Multi-brand quotations"
            />
            <div className="card-body">
              <h5 className="card-title">Multi-brand quotations</h5>
              <p className="card-text">
                Receive multi-brand quotations after completion of your property
                site assessment.
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card" style={{ height: "100%" }}>
            <img
              src="/card3.png"
              className="card-img-top"
              alt="Compare Quotes Online"
            />
            <div className="card-body">
              <h5 className="card-title">Compare Quotes Online</h5>
              <p className="card-text">
                Pick the best quote for you and save with solar!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Solar */}
      <div
        className="row"
        style={{
          paddingBlock: "2rem",
          padding: "5% 5%",
          backgroundColor: "midnightblue",
        }}
      >
        <h1
          style={{ textAlign: "center", marginBottom: "30px", color: "white" }}
        >
          Why Solar?
        </h1>
        <div className="col-3">
          <div className="card" style={{ height: "100%" }}>
            <img
              src="/1st.png"
              className="card-img-top"
              alt="Solar Energy is Free"
            />
            <div className="card-body">
              <h5 className="card-title">Solar Energy is Free</h5>
              <p className="card-text">
                Save ~90% on electricity bills, and also make money by selling
                excess solar units back to the grid
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card" style={{ height: "100%" }}>
            <img src="/2nd.png" className="card-img-top" alt="Subsidy" />
            <div className="card-body">
              <h5 className="card-title">Subsidy*</h5>
              <p className="card-text">
                Government in India has incentives for Solar in terms of Direct
                Benefit transfer through National Subsidy Portal
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card" style={{ height: "100%" }}>
            <img src="/3rd.png" className="card-img-top" alt="High ROI" />
            <div className="card-body">
              <h5 className="card-title">High ROI</h5>
              <p className="card-text">
                Project pays back in 4-5 yrs, all of the savings in electricity
                bills post that end up being profit for you
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card" style={{ height: "100%" }}>
            <img
              src="/4th.png"
              className="card-img-top"
              alt="Green & Clean Energy"
            />
            <div className="card-body">
              <h5 className="card-title">Green & Clean Energy</h5>
              <p className="card-text">
                Solar is a renewable source of energy, as good for your pocket
                as it is for the environment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started */}
      <div className="row align-items-center">
        <div className="col-6">
          <h3>Don't compromise on your quality of life</h3>
          <ul>
            <li>
              Stop telling your kids to switch off the AC (air-conditioner)
              every time they keep it 'On' for long
            </li>
            <li>Run your air-conditioner guilt-free.</li>
            <li>
              Get Rooftop Solar and live worry-free about your electricity bills
            </li>
          </ul>
          <button
            className="btn btn-info"
            type="button"
            onClick={() => navigate("/custRegistration")}
          >
            Get a Free Quote
          </button>
        </div>
        <div className="col-6">
          <img
            src="/happy family.png"
            style={{ width: "100%" }}
            alt="Happy Family"
          />
        </div>
      </div>

      <div className="row align-items-center text-center">
        <div className="col-6">
          <img src="/Mechanic.jpg" style={{ width: "100%" }} alt="Mechanic" />
        </div>
        <div className="col-6">
          <h3>Become an Installation Partner</h3>
          <ul>
            <li>
              Grow your business with Sunrise solar completed property profile
              leads.
            </li>
            <li>
              Expand your market with flexible payment options, and solar
              financing options.
            </li>
            <li>
              Enjoy simple, frictionless tech that helps you manage complex
              solar projects with the touch of a button from a mobile or from
              the web.
            </li>
          </ul>
          <button
            style={{
              backgroundColor: "#25cff2",
              border: "none",
              borderRadius: "5px",
              padding: "0.35rem 0.2rem",
              marginBottom: "10px",
            }}
            type="button"
            onClick={() => navigate("/vendorRegistration")}
          >
            Become a Partner
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        {/* <section className="d-flex justify-content-between p-3 text-white" style={{ backgroundColor: 'red' }}>
         
          <div>
            <a href="#" className="text-white me-4">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-google"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="text-white me-4">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section> */}
        <section>
          <div className="container text-center text-md-start mt-3">
            <div className="row mt-2">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-2">
                <h6 className="text-uppercase fw-bold">Sunrise Solar</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  Working towards a greener planet and free electricity for all.
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: "60px",
                    backgroundColor: "#7c4dff",
                    height: "2px",
                  }}
                />
                <p>
                  <i className="fas fa-home mr-3"></i> Gokhale Nagar, Pune
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>{" "}
                  pratikgawali2000@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> +91 9028525955
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> +91 8625058858
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
            Sunrise Solar
          </a>
        </div>
      </footer>

      
    </div>
  );
}

export default Home;
