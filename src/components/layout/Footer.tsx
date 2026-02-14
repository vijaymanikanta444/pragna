import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-section">
            <h3>Pragna</h3>
            <p>VIET's Digital Magazine - Where ideas come to life</p>
          </div>

          <div className="footer-section">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/issues">Magazine Issues</Link>
            <Link to="/about">About Us</Link>
          </div>

          <div className="footer-section">
            <h4>Write</h4>
            <Link to="/write">New Article</Link>
            <Link to="/my-articles">My Articles</Link>
            <Link to="/guidelines">Writing Guidelines</Link>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <a
              href="https://viet.edu.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              VIET Website
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Pragna - Visakha Institute of Engineering and
            Technology. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
