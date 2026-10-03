import React from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Site Disclaimer</span>
      </nav>

      <div className="card" style={{ padding: '44px 36px', lineHeight: '1.8' }}>
      <span className="badge badge-warning" style={{ marginBottom: '14px' }}>Information</span>
      <h2 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '24px' }}>
        Legal & Site Disclaimer
      </h2>

      <p style={{ marginBottom: '24px' }}>
        MarketLane is an e-commerce project developed for educational,
        demonstration, and portfolio purposes. The platform demonstrates
        features including product browsing, user authentication,
        shopping cart management, order processing, and online payments.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        1. Accuracy of Materials
      </h4>
      <p style={{ marginBottom: '18px' }}>
        Product information, images, prices, descriptions, and other content
        displayed on MarketLane may be sample or demonstration data and may
        not represent actual commercial offerings.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        2. Payment Processing
      </h4>
      <p style={{ marginBottom: '18px' }}>
        Payment functionality on MarketLane is implemented for demonstration
        purposes using Razorpay's test environment. No real financial
        transactions should be performed through the development version of
        this application.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        3. External Links
      </h4>
      <p style={{ marginBottom: '18px' }}>
        MarketLane may contain links to external websites or services.
        MarketLane is not responsible for the content, availability, or
        practices of third-party websites.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        4. Project Purpose
      </h4>
      <p style={{ marginBottom: '24px' }}>
        This application is intended to demonstrate full-stack web development
        concepts and should not be considered a production-ready commercial
        marketplace.
      </p>

      <div style={{ 
        padding: '16px 20px', 
        background: 'var(--bg-surface)', 
        borderLeft: '3px solid var(--warning)', 
        borderRadius: 'var(--radius-xs)',
        marginTop: '32px'
      }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>
          By using MarketLane, you acknowledge that this application is provided
          primarily for educational and demonstration purposes.
        </p>
      </div>
    </div>
  </div>
  );
};

export default Disclaimer;