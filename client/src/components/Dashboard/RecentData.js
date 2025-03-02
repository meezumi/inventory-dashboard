import React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './Dashboard.css';

const RecentData = () => {
  const { recentData, status } = useSelector(state => state.inventory);
  
  if (status === 'loading') {
    return <div className="section recent-data">Loading...</div>;
  }
  
  return (
    <div className="section">
      <h3 className="section-title">Recent Gathered Data {recentData.date && `(${formatDate(recentData.date)})`}</h3>
      
      <div className="metrics-container">
        <div className="metric-card">
          <div className="metric-value">{recentData.totalItems || 0}</div>
          <div className="metric-label">Total Units</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{formatCurrency(recentData.newTotal || 0)}</div>
          <div className="metric-label">New MSRP</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{recentData.newItems || 0}</div>
          <div className="metric-label">New Units</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{formatCurrency(recentData.usedTotal || 0)}</div>
          <div className="metric-label">Used MSRP</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{recentData.usedItems || 0}</div>
          <div className="metric-label">Used Units</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{formatCurrency(recentData.cpoTotal || 0)}</div>
          <div className="metric-label">CPO MSRP</div>
        </div>
        
        <div className="metric-card">
          <div className="metric-value">{recentData.cpoItems || 0}</div>
          <div className="metric-label">CPO Units</div>
        </div>
      </div>
    </div>
  );
};

export default RecentData;