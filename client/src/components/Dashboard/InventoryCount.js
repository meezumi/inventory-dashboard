import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { groupByMonth } from '../../utils/formatters';
import { VEHICLE_TYPES, CHART_COLORS } from '../../utils/constants';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InventoryCount = () => {
  const { data, status } = useSelector(state => state.inventory);
  const [activeType, setActiveType] = useState(VEHICLE_TYPES.NEW);
  const [chartData, setChartData] = useState(null);
  
  useEffect(() => {
    if (status === 'succeeded' && data.length > 0) {
      const groupedData = groupByMonth(data);
      const months = Object.keys(groupedData).sort((a, b) => {
        const [aMonth, aYear] = a.split('/');
        const [bMonth, bYear] = b.split('/');
        
        if (aYear !== bYear) return aYear - bYear;
        return aMonth - bMonth;
      });
      
      const chartDatasets = {
        labels: months,
        datasets: [
          {
            label: activeType,
            data: months.map(month => groupedData[month][activeType]),
            backgroundColor: CHART_COLORS[activeType],
            borderWidth: 0,
            borderRadius: 4,
          }
        ]
      };
      
      setChartData(chartDatasets);
    }
  }, [data, status, activeType]);
  
  const handleTypeChange = (type) => {
    setActiveType(type);
  };
  
  if (status === 'loading') {
    return <div className="section">Loading...</div>;
  }
  
  return (
    <div className="section">
      <h3 className="section-title">Inventory Count</h3>
      
      <div className="tabs">
        <div 
          className={`tab ${activeType === VEHICLE_TYPES.NEW ? 'active' : ''}`}
          onClick={() => handleTypeChange(VEHICLE_TYPES.NEW)}
        >
          NEW
        </div>
        <div 
          className={`tab ${activeType === VEHICLE_TYPES.USED ? 'active' : ''}`}
          onClick={() => handleTypeChange(VEHICLE_TYPES.USED)}
        >
          USED
        </div>
        <div 
          className={`tab ${activeType === VEHICLE_TYPES.CPO ? 'active' : ''}`}
          onClick={() => handleTypeChange(VEHICLE_TYPES.CPO)}
        >
          CPO
        </div>
      </div>
      
      <div className="chart-container">
        {chartData && (
          <Chart 
            type="bar" 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return `Count: ${context.raw}`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: '#f0f0f0'
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              }
            }}
            height={300}
          />
        )}
      </div>
    </div>
  );
};

export default InventoryCount;