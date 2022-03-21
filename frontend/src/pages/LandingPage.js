import { Link } from "react-router-dom";
import LandingPageNavbar from "../components/navbar/LandingPageNavbar";
import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <LandingPageNavbar />
        <section className="hero">
          <div className="container hero--container">
            <h3>Banking Done Right</h3>
            <p className="text-container-50">
              This is a mock full stack banking application that uses React, Axios, PERN stack
              (PostgreSQL, Express, React, Node). It uses user authentication with bcrypt encryption
            </p>
            <div className="buttons">
              <a href="#" className="btn btn-outline-dark">
                Learn more
              </a>
              <Link to="/signup" className="ms-3 btn btn-dark">
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default LandingPage;
