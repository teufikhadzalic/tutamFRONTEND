import { Link } from "react-router-dom"
import "./Welcome.css"

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Welcome to <span className="brand-text">MentzerTrack!</span>
          </h1>
          <p className="hero-description">Inspired by the legend Mike Mentzer we created an app where you can create and track your workout programs to achieve your fitness goals.</p>
          <div className="cta-buttons">
            {localStorage.getItem("token") ? (
              <Link to="/programs" className="cta-button primary">
                My Programs
              </Link>
            ) : (
              <Link to="/login" className="cta-button primary">
                Get Started
              </Link>
            )}
            <a href="#features" className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section" id="features">
        <h2>Why Choose FitTrack?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Personalized Programs</h3>
            <p>Create custom workout programs tailored to your specific goals.</p>
          </div>
          <div className="feature-card">
            <h3>Exercise details</h3>
            <p>Access a wide range of exercises with detailed instructions.</p>
          </div>
          <div className="feature-card">
            <h3>Progress tracking</h3>
            <p>Monitor your fitness journey and celebrate your achievements.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us!</p>
        <p>Email: support@fittrack.com</p>
        <p>Phone: +1 800 123 4567</p>
      </div>
    </div>
  )
}

export default Welcome
