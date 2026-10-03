import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>About MarketLane</span>
      </nav>

      <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
        <img
          src="/dp.jpeg"
          alt="Chandu - Developer of MarketLane"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' rx='80' fill='%23f97316'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='48' font-weight='800' fill='%23ffffff' dominant-baseline='middle' text-anchor='middle'%3EC%3C/text%3E%3C/svg%3E";
          }}
          style={{ 
            width: '160px', 
            height: '160px', 
            borderRadius: '50%', 
            objectFit: 'cover', 
            border: '3px solid var(--primary)', 
            margin: '0 auto 24px auto', 
            boxShadow: '0 8px 30px var(--primary-glow)' 
          }}
        />
      
      <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Creator & Developer</span>
      <h2>About Me</h2>
      <h3 style={{ color: 'var(--primary)', marginBottom: '16px', fontWeight: 600 }}>Chandu</h3>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '640px', margin: '0 auto 32px auto' }}>
        <strong style={{ color: 'var(--text-primary)' }}>Welcome to MarketLane!</strong> A modern full-stack e-commerce experience designed with focus on speed, elegant design, seamless payments, and user convenience.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px', marginTop: '16px' }}>
        <Link to="/shop" className="btn btn-primary">
          🛍️ Explore Shop
        </Link>
        <a
          href="mailto:marketlane062@gmail.com"
          className="btn btn-secondary"
        >
          📧 Contact via Email
        </a>
      </div>
    </div>
  </div>
  );
};

export default About;