const fs = require('fs');
const path = require('path');
const csvParser = require('../utils/csvParser');

const dataFilePath = path.join(__dirname, '../data/sample-data-v2.csv');

// Controller function to get inventory data
exports.getInventory = async (req, res) => {
  try {
    // Parse query parameters for filtering
    const { make, duration } = req.query;
    
    // Parse the CSV file
    const data = await csvParser(dataFilePath);

    data = data.map(item => ({
      ...item,
      date: item.timestamp ? new Date(item.timestamp) : null,
    }));
    
    // Apply filters if provided
    let filteredData = [...data];
    
    if (make) {
      filteredData = filteredData.filter(item => item.make.toLowerCase() === make.toLowerCase());
    }
    
    if (duration) {
      const now = new Date();
      let startDate;
      
      switch(duration) {
        case 'lastMonth':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          break;
        case 'thisMonth':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        case 'last3Months':
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        case 'last6Months':
          startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
          break;
        case 'thisYear':
          startDate = new Date(now.getFullYear(), 0, 1);
          break;
        case 'lastYear':
          startDate = new Date(now.getFullYear() - 1, 0, 1);
          const endDate = new Date(now.getFullYear(), 0, 0);
          filteredData = filteredData.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= startDate && itemDate <= endDate;
          });
          return res.json(filteredData);
        default:
          break;
      }
      
      if (startDate) {
        filteredData = filteredData.filter(item => {
          const itemDate = new Date(item.date);
          return itemDate >= startDate;
        });
      }
    }
    
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch inventory data' 
    });
  }
};