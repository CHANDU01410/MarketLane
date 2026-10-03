import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/cart.css';

const OrderSuccess = () => {
  return (
    <div className="order-success-card">
      <div className="order-success-icon-wrap" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <span className="badge badge-success" style={{ marginBottom: '14px' }}>
        Payment Verified & Order Recorded
      </span>

      <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '12px', color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
        Thank You for Your Order!
      </h2>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', maxWidth: '520px', margin: '0 auto' }}>
        Your transaction was completed successfully. We have created your order in our system and our warehouse team is preparing your package for dispatch.
      </p>

      <div className="order-success-details-box">
        <div>
          <div className="order-detail-meta-label">Order Status</div>
          <div className="order-detail-meta-val" style={{ color: 'var(--success)' }}>
            ● Processing
          </div>
        </div>

        <div>
          <div className="order-detail-meta-label">Payment Method</div>
          <div className="order-detail-meta-val">
            Razorpay Secure
          </div>
        </div>

        <div>
          <div className="order-detail-meta-label">Est. Delivery</div>
          <div className="order-detail-meta-val">
            3-5 Business Days
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/profile" className="btn btn-secondary btn-lg">
          View My Orders
        </Link>
        <Link to="/shop" className="btn btn-primary btn-lg">
          Continue Shopping &rarr;
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;