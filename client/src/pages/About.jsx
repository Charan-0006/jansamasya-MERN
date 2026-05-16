import "./About.css";
import logo from "../assets/janSamasa_Logo.png";
import { useNavigate } from "react-router-dom";

function About() {

  const navigate = useNavigate();

  return (

    <div className="about-page">

      {/* GLOW EFFECTS */}
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>



      {/* HERO */}
      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            Smart Civic Reporting System
          </span>

          <h1>
            Report Public Issues
            <br />
            Smarter & Faster 🇮🇳
          </h1>

          <p>
            JanSamasya is a civic issue
            reporting platform that enables
            citizens to report, monitor,
            and track public problems
            transparently using technology.
          </p>



          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                navigate("/report")
              }
            >
              Report Issue
            </button>



            <button
              className="secondary-btn"
              onClick={() =>
                navigate("/track")
              }
            >
              Track Complaints
            </button>

          </div>

        </div>



        <div className="hero-right">

          <img
            src={logo}
            alt="logo"
            className="hero-logo"
          />

        </div>

      </section>



      {/* ABOUT */}
      <section className="timeline-section">

        <h2>
          Why JanSamasya?
        </h2>

        <div className="timeline">

          <div className="timeline-item">

            <span>📢</span>

            <div>

              <h3>
                Easy Public Reporting
              </h3>

              <p>
                Citizens can report road damage,
                garbage issues, street light
                failures, water leakage,
                and more with images and
                exact location details.
              </p>

            </div>

          </div>



          <div className="timeline-item">

            <span>📍</span>

            <div>

              <h3>
                Accurate Location Detection
              </h3>

              <p>
                Automatically capture user
                location using GPS for
                faster issue identification
                and response.
              </p>

            </div>

          </div>



          <div className="timeline-item">

            <span>⚡</span>

            <div>

              <h3>
                Real-Time Tracking
              </h3>

              <p>
                Users can monitor complaint
                progress from pending
                to resolved status in a
                transparent workflow.
              </p>

            </div>

          </div>



          <div className="timeline-item">

            <span>🤝</span>

            <div>

              <h3>
                Citizen Participation
              </h3>

              <p>
                Encourage community
                participation and help
                authorities prioritize
                important civic problems.
              </p>

            </div>

          </div>

        </div>

      </section>



      {/* FEATURES */}
      <section className="features">

        <div className="feature-card">

          <div className="feature-icon">
            📸
          </div>

          <h3>
            Image Upload
          </h3>

          <p>
            Upload issue images
            for better understanding
            and verification.
          </p>

        </div>



        <div className="feature-card">

          <div className="feature-icon">
            🗺️
          </div>

          <h3>
            Smart Location
          </h3>

          <p>
            Detect exact address
            automatically while
            reporting issues.
          </p>

        </div>



        <div className="feature-card">

          <div className="feature-icon">
            📊
          </div>

          <h3>
            Status Monitoring
          </h3>

          <p>
            View pending,
            in-progress,
            and resolved complaints
            in one dashboard.
          </p>

        </div>

      </section>



      {/* VISION */}
      <section className="cta">

        <h2>
          Together We Can Build
          Better Communities
        </h2>

        <p>
          JanSamasya aims to bridge
          the gap between citizens
          and authorities through
          transparent digital reporting.
        </p>



        <button
          onClick={() =>
            navigate("/report")
          }
        >
          Start Reporting
        </button>

      </section>

    </div>
  );
}

export default About;