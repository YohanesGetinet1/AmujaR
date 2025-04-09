import React, { useState, useEffect, useRef } from 'react';
import { database, ref, push } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import ContactModal from './Modal';
import './style.css';

import kitchenImage from './assets/images/services/kitchen.jpg';
import bathroomImage from './assets/images/services/bathroom.jpg';
import basementImage from './assets/images/services/basement.jpg';
import rooftopImage from './assets/images/services/rooftop.jpg';
import exteriorImage from './assets/images/services/exterior.jpg';
import plumbingImage from './assets/images/services/plumbing.jpg';

// Portfolio Images
import project1 from './assets/images/portfolio/project1.jpeg';
import project2 from './assets/images/portfolio/project2.jpeg';
import project3 from './assets/images/portfolio/project3.jpg';
import project4 from './assets/images/portfolio/project4.jpeg';
import project5 from './assets/images/portfolio/project5.jpeg';
import project6 from './assets/images/portfolio/project6.jpg';
import project7 from './assets/images/portfolio/project7.jpeg';
import project8 from './assets/images/portfolio/project8.jpeg';
import project9 from './assets/images/portfolio/project9.jpeg';
import project10 from './assets/images/portfolio/project10.jpg';
import project11 from './assets/images/portfolio/project11.jpg';
import project12 from './assets/images/portfolio/project12.jpeg';
import project13 from './assets/images/portfolio/project13.jpeg';
import project14 from './assets/images/portfolio/project14.jpeg';
import project15 from './assets/images/portfolio/project15.jpeg';
import project16 from './assets/images/portfolio/project16.jpeg';
import project17 from './assets/images/portfolio/project17.jpeg';
import project18 from './assets/images/portfolio/project18.jpeg';
import project19 from './assets/images/portfolio/project19.jpeg';
import project20 from './assets/images/portfolio/project20.jpg';
// about
import Aboutimg from './assets/images/about-img.jpg';
import heroBg from './assets/images/hero-bg.jpg';

const AmujaRenovation = () => {
  const [showModal, setShowModal] = useState(false);
  const navbarRef = useRef(null);
  const backToTopRef = useRef(null);
  const counterSectionRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);

    const loadWhatsAppWidget = () => {
      const options = {
        whatsapp: "+1614-368-4484",
        call_to_action: "Chat with us!",
        position: "right",
        message: "Hello! 👋 How can we assist you today?",
      };
      const proto = document.location.protocol;
      const host = "getbutton.io";
      const url = proto + "//static." + host;

      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = url + "/widget-send-button/js/init.js";
      s.onload = function () {
        if (window.WhWidgetSendButton) {
          window.WhWidgetSendButton.init(host, proto, options);
        }
      };
      document.head.appendChild(s);
    };

    loadWhatsAppWidget();

    // const timer = setTimeout(() => {
    //   setShowModal(true);
    // }, 10000); // 2 minutes in milliseconds 120000

    // Navbar scroll effect
    const handleScroll = () => {
      if (navbarRef.current) {
        if (window.scrollY > 50) {
          navbarRef.current.classList.add('scrolled');
        } else {
          navbarRef.current.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Preloader
    window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }
    });

    // Back to Top button
    const handleBackToTop = () => {
      if (backToTopRef.current) {
        if (window.scrollY > 300) backToTopRef.current.style.display = 'block';
        else backToTopRef.current.style.display = 'none';
      }
    };

    window.addEventListener('scroll', handleBackToTop);
    if (backToTopRef.current) {
      backToTopRef.current.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Counter animation with Intersection Observer
    const counters = document.querySelectorAll('.counter');

    const countUp = (counter) => {
      const target = +counter.getAttribute('data-target');
      const speed = 200;
      const increment = target / speed;

      const updateCounter = () => {
        const current = +counter.innerText;
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => countUp(counter));
        }
      });
    }, { threshold: 0.5 });

    if (counterSectionRef.current) {
      observer.observe(counterSectionRef.current);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Cleanup function
    return () => {
      document.body.removeChild(script);
      // clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleBackToTop);
    };
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    const formData = { name, email, phone, service, message };

    try {
      const submissionsRef = ref(database, 'formSubmissions');
      await push(submissionsRef, formData);
      toast.success("Your message has been sent successfully!");
    } catch (error) {
      toast.error("There was an error sending your message.");
    }
  };

  const heroSectionStyle = {
    background: `linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.7)), url(${heroBg}) no-repeat center center/cover`,
  };

  const portfolioItems = [
    project1, project2, project3, project4, project5, project6, project7, project8, project9, project10,
    project11, project12, project13, project14, project15, project16, project17, project18, project19, project20,
  ];

  return (
    <div>
      {/* Bootstrap CSS */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      {/* Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link rel="stylesheet" href="assets/css/styles.css" />

      {/* Navigation Bar */}
      <nav ref={navbarRef} className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#" onClick={() => window.location.reload()}>Amuja Renovation</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#portfolio">Portfolio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div id="preloader">
        <div className="spinner"></div>
      </div>

      <button ref={backToTopRef} id="backToTop" className="btn btn-primary"><i className="fas fa-arrow-up"></i></button>

      {/* Hero Section */}
      <section id="home" className="hero-section" style={heroSectionStyle}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="display-4">Transform Your Space</h1>
              <p className="lead mb-4">Professional renovation services for homes and businesses. Quality craftsmanship guaranteed.</p>
              <a href="#contact" className="btn btn-primary btn-lg me-3">Contact Us</a>
              <a href="#portfolio" className="btn btn-outline-light btn-lg">View Our Work</a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title">About Us</h2>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className='about-image'></div>
              
            </div>
            <div className="col-md-6">
              <h3>Your Trusted Renovation Partner</h3>
              <p>With over 10 years of experience, Amuja Renovations has been delivering exceptional renovation services to homeowners and businesses alike. Our team of skilled professionals is dedicated to turning your vision into reality.</p>
              <p>We pride ourselves on our attention to detail, quality craftsmanship, and customer satisfaction. From small renovations to complete home makeovers, we handle every project with the same level of dedication and expertise.</p>
              <div className="row mt-4">
                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span>Licensed & Insured</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span>Free Consultations</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span>Quality Materials</span>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-shield-alt text-success me-2"></i>
                    <span>Built for Long-Lasting Durability</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ref={counterSectionRef} className="row mt-4 text-center">
            <div className="col-4"><h3 className="counter" data-target="10">0</h3><p>Years Experience</p></div>
            <div className="col-4"><h3 className="counter" data-target="200">0</h3><p>Projects Completed</p></div>
            <div className="col-4"><h3 className="counter" data-target="98">0</h3><p>% Satisfaction</p></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title">Our Services</h2>
              <p className="lead mb-5">We offer a wide range of renovation services tailored to your needs</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card service-card">
                <img src={kitchenImage} className="card-img-top" alt="Kitchen Renovation" />
                <div className="card-body">
                  <h5 className="card-title">Kitchen Renovation</h5>
                  <p className="card-text">Transform your kitchen into a functional and beautiful space with our custom kitchen renovation services.</p>
                  <a href="#contact" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card service-card">
                <img src={bathroomImage} className="card-img-top" alt="Bathroom Renovation" />
                <div className="card-body">
                  <h5 className="card-title">Bathroom Renovation</h5>
                  <p className="card-text">Create a spa-like retreat in your home with our expert bathroom renovation and remodeling services.</p>
                  <a href="#contact" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card service-card">
                <img src={basementImage} className="card-img-top" alt="Basement Finishing" />
                <div className="card-body">
                  <h5 className="card-title">Basement Finishing</h5>
                  <p className="card-text">Convert your unused basement into valuable living space with our professional basement finishing services.</p>
                  <a href="#contact" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card service-card">
                <img src={rooftopImage} className="card-img-top" alt="Rooftop Renovation" />
                <div className="card-body">
                  <h5 className="card-title">Rooftop Renovation</h5>
                  <p className="card-text">Enhance your rooftop with our expert renovation services, designed for both aesthetics and functionality.</p>
                  <a href="#contact" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card service-card">
                <img src={exteriorImage} className="card-img-top" alt="Exterior Renovation" />
                <div className="card-body">
                  <h5 className="card-title">Exterior Renovation</h5>
                  <p className="card-text">Enhance your home's curb appeal with our exterior renovation services, including siding, roofing, and more.</p>
                  <a href="#contact" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card service-card">
                <img src={plumbingImage} className="card-img-top" alt="Plumbing" />
                <div className="card-body">
                  <h5 className="card-title">Plumbing</h5>
                  <p className="card-text">Ensure a seamless water system with our expert plumbing services, from installation to maintenance.</p>
                  <a href="#contact" className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title">Our Recent Projects</h2>
              <p className="lead mb-5">Take a look at some of our recent renovation projects</p>
            </div>
          </div>

          {/* Carousel */}
          <div id="portfolioCarousel" className="carousel slide modern-carousel" data-bs-ride="carousel">
            <div className="carousel-inner">
              {portfolioItems.map((image, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <img src={image} className="d-block w-100 img" alt={`Project ${index + 1}`} />
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#portfolioCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#portfolioCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>

            {/* Indicators */}
            <div className="carousel-indicators">
              {portfolioItems.map((_, index) => (
                <button
                  type="button"
                  data-bs-target="#portfolioCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-label={`Slide ${index + 1}`}
                  key={index}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding" id="contact">
        <div className="container">
          <div className="section-title">
            <h2>Contact Us</h2>
            <p>Get in touch with us for your next project!</p>
          </div>
          <div className="row g-4">
            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="contact-form modern-card animate-fade-up">
                <form id="contactForm" onSubmit={handleFormSubmit}>
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="New Contact Form Submission" />

                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input type="text" className="form-control modern-input" name="name" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 form-group">
                      <input type="email" className="form-control modern-input" name="email" id="email" placeholder="Email Address" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <input type="tel" className="form-control modern-input" name="phone" id="phone" placeholder="Phone Number" />
                  </div>
                  <div className="form-group">
                    <select className="form-control modern-select" name="service" id="service" required>
                      <option value="" disabled selected>Select a Service</option>
                      <option value="kitchen">Kitchen Renovation</option>
                      <option value="bathroom">Bathroom Renovation</option>
                      <option value="basement">Basement Finishing</option>
                      <option value="addition">Rooftop Renovation</option>
                      <option value="exterior">Exterior Renovation</option>
                      <option value="commercial">Plumbing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea className="form-control modern-textarea" name="message" id="message" rows="5" placeholder="Tell us about your project..." required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 modern-btn">Submit Request</button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-5">
              <div className="contact-info-card modern-card animate-fade-up delay-1">
                <h3 className="mb-4">Get in Touch</h3>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div>
                    <h5>Location</h5>
                    <p><a href="https://www.google.com/maps?q=5940+Shana+Dr,+Columbus,+OH+43232" target="_blank" rel="noopener noreferrer">5940 Shana Dr, Columbus, OH 43232</a></p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="fas fa-phone"></i></div>
                  <div>
                    <h5>Phone</h5>
                    <p><a href="tel:5551234567">(614) 368-4484</a></p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <h5>Email</h5>
                    <p><a href="mailto:amujiarenovation@gmail.com">amujiarenovation@gmail.com</a></p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><i className="fas fa-clock"></i></div>
                  <div>
                    <h5>Hours</h5>
                    <p>Mon-Fri: 8 AM - 6 PM<br />Sat: 9 AM - 2 PM<br />Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </section>

      {/* Google Map */}
      <div className="container-fluid p-0">
        <div className="embed-responsive embed-responsive-21by9">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.8053574313517!2d-82.83879952454132!3d39.94574328417154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8838636a1e4a0731%3A0xa2df57e3452307ae!2s5940%20Shana%20Dr%2C%20Columbus%2C%20OH%2043232!5e0!3m2!1sen!2sus!4v1742272016654!5m2!1sen!2sus%22" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <h5>About Amuja Renovation</h5>
              <p>We are a full-service renovation company dedicated to transforming spaces with quality craftsmanship and exceptional customer service.</p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#home" className="text-decoration-none text-white">Home</a></li>
                <li><a href="#about" className="text-decoration-none text-white">About</a></li>
                <li><a href="#services" className="text-decoration-none text-white">Services</a></li>
                <li><a href="#portfolio" className="text-decoration-none text-white">Portfolio</a></li>
                <li><a href="#contact" className="text-decoration-none text-white">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5>Our Services</h5>
              <ul className="list-unstyled">
                <li><a href="#services" className="text-decoration-none text-white">Kitchen Renovation</a></li>
                <li><a href="#services" className="text-decoration-none text-white">Bathroom Renovation</a></li>
                <li><a href="#services" className="text-decoration-none text-white">Basement Finishing</a></li>
                <li><a href="#services" className="text-decoration-none text-white">Home Additions</a></li>
                <li><a href="#services" className="text-decoration-none text-white">Exterior Renovation</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5>Follow Us</h5>
              <p>Stay connected with us on social media.</p>
              <div className="social-icons mt-3">
                <a href="https://facebook.com/" className="me-2" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="https://twitter.com/" className="me-2" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                <a href="https://instagram.com/" className="me-2" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://www.tiktok.com/" className="me-2" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>
          </div>
          <hr className="mt-4 mb-4 bg-light" />
          <div className="row">
            <div className="col-md-6">
              <p className="mb-md-0">© 2025 Amuja Renovation LLC. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p>Designed with excellence by Nexora </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AmujaRenovation;