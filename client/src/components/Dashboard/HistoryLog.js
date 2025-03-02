import React from 'react';
import { useSelector } from 'react-redux';
import { formatCurrency, formatDate } from '../../utils/formatters';
import './Dashboard.css';

const HistoryLog = () => {
  const { historyLog, status } = useSelector(state => state.inventory);
  
  if (status === 'loading') {
    return <div className="section">Loading...</div>;
  }
  
  return (
    <div className="section">
      <h3 className="section-title">History Log</h3>
      
      <div className="table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>NEW INVENTORY</th>
              <th>NEW TOTAL MSRP</th>
              <th>NEW AVERAGE MSRP</th>
              <th>USED INVENTORY</th>
              <th>USED TOTAL MSRP</th>
              <th>USED AVERAGE MSRP</th>
              <th>CPO INVENTORY</th>
              <th>CPO TOTAL MSRP</th>
              <th>CPO AVERAGE MSRP</th>
            </tr>
          </thead>
          <tbody>
            {historyLog.map((entry, index) => (
              <tr key={index}>
                <td>{formatDate(entry.date)}</td>
                <td>{entry.NEW.count}</td>
                <td>{formatCurrency(entry.NEW.totalMSRP)}</td>
                <td>{formatCurrency(entry.NEW.avgMSRP)}</td>
                <td>{entry.USED.count}</td>
                <td>{formatCurrency(entry.USED.totalMSRP)}</td>
                <td>{formatCurrency(entry.USED.avgMSRP)}</td>
                <td>{entry.CPO.count}</td>
                <td>{formatCurrency(entry.CPO.totalMSRP)}</td>
                <td>{formatCurrency(entry.CPO.avgMSRP)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pagination">
        <span>Items per page: 10</span>
        <div className="page-controls">
          <button disabled>&lt;</button>
          <span>1-10 of {historyLog.length}</span>
          <button disabled={historyLog.length <= 10}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryLog;