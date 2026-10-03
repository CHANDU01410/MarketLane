import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNav = ({ activeTab }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const tabs = [
    { label: 'Overview', path: '/admin', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '📦' },
    { label: 'Orders', path: '/admin/orders', icon: '🚚' },
    { label: 'Users', path: '/admin/users', icon: '👥' },
  ];

  return (
    <nav className="admin-nav-tabs" aria-label="Admin Navigation Tabs">
      {tabs.map((tab) => {
        const isActive = activeTab ? activeTab === tab.label.toLowerCase() : currentPath === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`admin-nav-tab ${isActive ? 'active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminNav;
