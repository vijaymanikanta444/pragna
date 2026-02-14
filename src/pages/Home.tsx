import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to Pragna</h1>
        <p className="hero-subtitle">
          VIET's Digital Magazine - Where ideas come to life
        </p>
        {user && (
          <p className="welcome-message">Welcome back, {user.fullName}! 👋</p>
        )}
        <div className="hero-cta">
          <Link to="/write" className="btn-primary btn-large">
            {user ? "Start Writing" : "Explore Articles"}
          </Link>
          {!user && (
            <Link to="/login" className="btn-secondary btn-large">
              Get Started
            </Link>
          )}
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Write</h3>
          <p>Express your thoughts freely</p>
        </div>
        <div className="feature">
          <h3>Save</h3>
          <p>Store your work securely</p>
        </div>
        <div className="feature">
          <h3>Share</h3>
          <p>Share your ideas with others</p>
        </div>
      </section>
    </div>
  );
}
