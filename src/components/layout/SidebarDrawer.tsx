import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAuth from "@hooks/useAuth";

const categories = [
  { name: "Technology", slug: "technology" },
  { name: "Science", slug: "science" },
  { name: "Campus Life", slug: "campus-life" },
  { name: "Student Corner", slug: "student-corner" },
  { name: "Events", slug: "events" },
  { name: "Alumni", slug: "alumni" },
];

type SidebarDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SidebarDrawer({ isOpen, onClose }: SidebarDrawerProps) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className={`mobile-menu${isOpen ? " is-open" : ""}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-menu-brand" onClick={onClose}>
            <span className="mobile-menu-icon" aria-hidden="true">
              <FontAwesomeIcon icon={faBookOpen} />
            </span>
            <span className="mobile-menu-text">Pragna</span>
          </Link>
        </div>

        <div className="mobile-menu-content">
          <div className="drawer-section">
            <p className="drawer-section-title">Explore</p>
            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={onClose}>
                Home
              </Link>
              {user && (
                <Link to="/write" className="mobile-nav-link" onClick={onClose}>
                  Write
                </Link>
              )}
            </nav>
          </div>

          <div className="drawer-section">
            <p className="drawer-section-title">Categories</p>
            <nav className="mobile-nav">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="mobile-nav-link"
                  onClick={onClose}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="drawer-section">
            <p className="drawer-section-title">Settings</p>
            <nav className="mobile-nav">
              {user ? (
                <Link
                  to="/profile"
                  className="mobile-nav-link"
                  onClick={onClose}
                >
                  Profile
                </Link>
              ) : (
                <Link to="/login" className="mobile-nav-link" onClick={onClose}>
                  Get Started
                </Link>
              )}
              <Link
                to="/settings"
                className="mobile-nav-link"
                onClick={onClose}
              >
                Preferences
              </Link>
              <Link to="/help" className="mobile-nav-link" onClick={onClose}>
                Help Center
              </Link>
            </nav>
          </div>

          <div className="drawer-section">
            <p className="drawer-section-title">More</p>
            <nav className="mobile-nav">
              <Link to="/about" className="mobile-nav-link" onClick={onClose}>
                About Pragna
              </Link>
              <Link
                to="/editorial"
                className="mobile-nav-link"
                onClick={onClose}
              >
                Editorial Team
              </Link>
              {user && (
                <button
                  className="mobile-nav-link mobile-nav-button"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div
        className={`mobile-menu-overlay${isOpen ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
    </>
  );
}
