import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-grid">
          <div className="footer-col footer-col-brand">
            <div className="footer-brand-header">
              <img 
                src="/MarketLane.png" 
                alt="MarketLane Logo" 
                className="footer-brand-logo" 
              />
              <span className="footer-brand-title">
                MarketLane<span className="brand-dot">.</span>
              </span>
            </div>
            <p className="footer-brand-desc">
              Your modern destination for simple, secure, and curated online shopping. Built for speed, reliability, and satisfaction.
            </p>
            <div className="footer-trust-badges">
              <span className="trust-badge">🔒 256-Bit SSL</span>
              <span className="trust-badge">⚡ Fast Delivery</span>
              <span className="trust-badge">🛡️ Buyer Protection</span>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Shop Catalog</h4>
            <ul className="footer-nav-list">
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/">Featured Collection</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/profile">My Account</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Information</h4>
            <ul className="footer-nav-list">
              <li><Link to="/about">About MarketLane</Link></li>
              <li><Link to="/return">Return & Refund Policy</Link></li>
              <li><Link to="/disclaimer">Legal Disclaimer</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <p className="footer-contact-text">
              Have questions or need assistance with your order? Our team is ready to help.
            </p>
            <a href="mailto:marketlane062@gmail.com" className="footer-email-link">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>marketlane062@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="site-footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} <strong>MarketLane</strong>. All rights reserved.
          </div>
          <div className="footer-payment-methods">
            <span className="payment-chip">Razorpay Secure</span>
            <span className="payment-chip">UPI</span>
            <span className="payment-chip">Debit & Credit Cards</span>
            <span className="payment-chip">NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;