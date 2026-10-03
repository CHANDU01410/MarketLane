import React from 'react';
import { Link } from 'react-router-dom';

const ReturnPolicy = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span>
        <span style={{ color: 'var(--text-primary)' }}>Return & Refund Policy</span>
      </nav>

      <div className="card" style={{ padding: '44px 36px', lineHeight: '1.8' }}>
      <span className="badge badge-primary" style={{ marginBottom: '14px' }}>Legal & Guidelines</span>
      <h2 style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '24px' }}>
        Return & Refund Policy
      </h2>

      <p style={{ marginBottom: '24px' }}>
        MarketLane is an e-commerce platform developed for educational and
        demonstration purposes. Product purchases, returns, and refunds
        shown in the application may be part of a simulated or test
        environment.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        1. Return Eligibility
      </h4>
      <p style={{ marginBottom: '18px' }}>
        In a production version of MarketLane, return eligibility would depend
        on the product type, order status, condition of the item, and the
        applicable return policy. The current application demonstrates these workflows in a test setting.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        2. Refund Processing
      </h4>
      <p style={{ marginBottom: '18px' }}>
        Where refund functionality is available, refunds would be processed
        according to the payment provider and the application's implemented
        order workflow. Payment functionality in the development environment
        may use Razorpay test mode.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        3. Product Conditions
      </h4>
      <p style={{ marginBottom: '18px' }}>
        In a production environment, returned products would generally be
        expected to be in an appropriate condition and may be subject to
        product-specific return requirements.
      </p>

      <h4 style={{ color: 'var(--primary)', marginTop: '28px', marginBottom: '10px' }}>
        4. Production Policy
      </h4>
      <p style={{ marginBottom: '24px' }}>
        The actual return period, eligibility requirements, shipping
        responsibilities, and refund timelines would be clearly defined
        before MarketLane is used as a live commercial marketplace.
      </p>

      <div style={{ 
        padding: '16px 20px', 
        background: 'var(--bg-surface)', 
        borderLeft: '3px solid var(--primary)', 
        borderRadius: 'var(--radius-xs)',
        marginTop: '32px'
      }}>
        <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: 'var(--text-muted)', margin: 0 }}>
          This policy is provided for demonstration purposes and does not
          constitute a commercial return or refund agreement.
        </p>
      </div>
    </div>
  </div>
  );
};

export default ReturnPolicy;