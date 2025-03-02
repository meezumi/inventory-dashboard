import React from 'react';
import { Chart as ChartJS } from 'chart.js';
import { Chart } from 'react-chartjs-2';

const ChartComponent = ({ 
  type, 
  data, 
  options, 
  height = 300,
  width = null
}) => {
  return (
    <div style={{ height, width: width || '100%' }}>
      <Chart
        type={type}
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          ...options
        }}
      />
    </div>
  );
};

export default ChartComponent;