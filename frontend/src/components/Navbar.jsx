import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main Navigation"> 
        <div className="navbar-inner">
          <div className="navbar-brand">
            <Link to="/" className="navbar-brand-link" aria-label="MarketLane Home">
              <img src="/MarketLane.png" alt="MarketLane Logo" className="navbar-logo-image" />
              <span className="navbar-brand-name">
                MarketLane<span className="brand-dot">.</span>
              </span>
            </Link>
          </div>

          <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <li>
              <Link 
                to="/shop" 
                className={`nav-link ${isActive('/shop') ? 'nav-link-active' : ''}`}
              >
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Shop</span>
              </Link>
            </li>

            <li>
              <Link 
                to="/cart" 
                className={`nav-link nav-link-cart ${isActive('/cart') ? 'nav-link-active' : ''}`}
                aria-label={`Shopping cart with ${totalCartCount} items`}
              >
                <div className="cart-icon-wrapper">
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span className="cart-badge-counter">{totalCartCount}</span>
                </div>
                <span>Cart</span>
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link 
                    to="/profile" 
                    className={`nav-link user-profile-link ${isActive('/profile') ? 'nav-link-active' : ''}`}
                  >
                    <div className="user-avatar-badge" aria-hidden="true">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="user-name-text">Hi, {user.name}</span>
                  </Link>
                </li>

                {user.role === 'admin' && (
                  <li>
                    <Link 
                      to="/admin" 
                      className={`nav-link admin-nav-link ${location.pathname.startsWith('/admin') ? 'nav-link-active' : ''}`}
                    >
                      <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      <span>Admin</span>
                    </Link>
                  </li>
                )}

                <li>
                  <button 
                    onClick={handleLogout} 
                    className="btn-nav-logout"
                    title="Sign Out of your account"
                  >
                    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className={`btn-nav-login ${isActive('/login') ? 'btn-nav-login-active' : ''}`}
                >
                  <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>

          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;