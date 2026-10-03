import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate('/');
      } else {
        const msg = data.message || 'Login failed. Please verify credentials.';
        setErrorMsg(msg);
        alert(msg);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('An unexpected network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form" aria-label="Sign in form">
        <div className="auth-header">
          <img 
            src="/MarketLane.png" 
            alt="MarketLane Logo" 
            className="auth-header-logo" 
          />
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">
            Sign in to manage orders, addresses, and wishlist.
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

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="login-email">Email Address</label>
          <input 
            id="login-email"
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            autoComplete="email"
          />
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" htmlFor="login-password">Password</label>
          <input 
            id="login-password"
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            autoComplete="current-password"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="btn btn-primary btn-block btn-submit"
        >
          {loading ? 'Authenticating...' : 'Sign In to Account'}
        </button>

        <p className="auth-footer-prompt">
          Don't have an account yet? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;