import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "@hooks/useAuth";

type HeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
};

export default function Header({ isMenuOpen, onToggleMenu }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo - Left */}
        <div className="header-left">
          <button
            className="mobile-menu-toggle"
            onClick={onToggleMenu}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
          </button>
          <Link to="/" className="logo">
            <span className="logo-icon" aria-hidden="true">
              <FontAwesomeIcon icon={faBookOpen} />
            </span>
            <span className="logo-text">Pragna</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </div>

        {/* Search & Profile - Right */}
        <div className="header-right">
          {/* Search Button (Mobile) */}
          <Link
            to="/search"
            className="search-icon-btn"
            aria-label="Search"
            title="Search"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Link>

          {/* Write Button */}
          {/* <Link to="/write" className="write-btn" title="Write an article">
            <FontAwesomeIcon icon={faPenNib} /> <span>Write</span>
          </Link> */}

          {/* User Menu or Login */}
          {user ? (
            <div className="user-menu">
              <button className="user-avatar" aria-label="User menu">
                {user.fullName.charAt(0).toUpperCase()}
              </button>
              <div className="user-dropdown">
                <div className="user-info-dropdown">
                  <span className="user-name-dropdown">{user.fullName}</span>
                  <span className="user-role">{user.role}</span>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/my-articles" className="dropdown-item">
                  My Articles
                </Link>
                <Link to="/dashboard" className="dropdown-item">
                  Dashboard
                </Link>
                <div className="dropdown-divider"></div>
                <button
                  onClick={handleLogout}
                  className="dropdown-item logout-btn"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn-header-primary">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
