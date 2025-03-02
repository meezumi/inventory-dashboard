import React from 'react';
import RecentData from './RecentData';
import InventoryCount from './InventoryCount';
import AverageMSRP from './AverageMSRP';
import HistoryLog from './HistoryLog';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Inventory</h2>
        <div className="dealer-selector">
          <label>Select Dealer:</label>
          <select>
            <option>AAA MITSUBISHI DEALER</option>
          </select>
        </div>
      </div>
      
      <RecentData />
      <InventoryCount />
      <AverageMSRP />
      <HistoryLog />
    </div>
  );
};

export default Dashboard;