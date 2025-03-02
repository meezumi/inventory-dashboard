import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">Inventory Dashboard (Admin Dashboard)</div>
      <div className="admin-console">
        <span className="admin-icon">🔧</span>
        <span>Admin Console</span>
        <span className="admin-tag">ONLINE</span>
      </div>
      <div className="header-actions">
        <button className="support-btn">
          <span>🔄</span> Support
        </button>
        <div className="user-profile">
          <div className="user-avatar">J</div>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>
    </header>
  );
};

export default Header;