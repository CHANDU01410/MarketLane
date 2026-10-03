import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        const verifyNotice = 'Registration Successful! Please check your email to verify your account.';
        setSuccessMsg(verifyNotice);
        alert(verifyNotice);
        login(data);
        navigate('/');
      } else {
        const msg = data.message || 'Registration failed. Please check your details.';
        setErrorMsg(msg);
        alert(msg);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMsg('An unexpected network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form" aria-label="Registration form">
        <div className="auth-header">
          <img 
            src="/MarketLane.png" 
            alt="MarketLane Logo" 
            className="auth-header-logo" 
          />
          <h2>Create Account</h2>
          <p className="auth-subtitle">
            Join MarketLane for faster checkout and order tracking.
          </p>
        </div>

        {errorMsg && (
          <div className="auth-error-banner" role="alert">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="auth-success-banner" role="status">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{successMsg}</span>
          </div>
        )}

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="register-name">Full Name</label>
          <input 
            id="register-name"
            type="text" 
            placeholder="e.g. John Doe" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            autoComplete="name"
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="register-email">Email Address</label>
          <input 
            id="register-email"
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            autoComplete="email"
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="register-password">Password</label>
          <input 
            id="register-password"
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete="new-password"
          />
          <span className="auth-field-helper">Choose a secure password of 6 or more characters.</span>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="btn btn-primary btn-block btn-submit"
        >
          {loading ? 'Creating Account...' : 'Create Account & Verify'}
        </button>

        <p className="auth-footer-prompt">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;