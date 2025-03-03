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
    let rawData = await csvParser(dataFilePath);
    
    // Process the data WITHOUT reassigning the variable
    const processedData = rawData.map(item => ({
      ...item,
      date: item.timestamp ? new Date(item.timestamp) : null,
    }));
    
    // Apply filters if provided
    let filteredData = [...processedData];
    
    if (make) {
      filteredData = filteredData.filter(item => 
        item.make && item.make.toLowerCase() === make.toLowerCase()
      );
    }
    
    if (duration) {
      const now = new Date();
      let startDate;
      let endDate;
      
      switch(duration) {
        case 'lastMonth':
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          endDate = new Date(now.getFullYear(), now.getMonth(), 0);
          break;
        case 'thisMonth':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          endDate = now;
          break;
        case 'last3Months':
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          endDate = now;
          break;
        case 'last6Months':
          startDate = new Date(now.getFullYear(), now.getMonth() - 6, 1);
          endDate = now;
          break;
        case 'thisYear':
          startDate = new Date(now.getFullYear(), 0, 1);
          endDate = now;
          break;
        case 'lastYear':
          startDate = new Date(now.getFullYear() - 1, 0, 1);
          endDate = new Date(now.getFullYear(), 0, 0);
          break;
        default:
          break;
      }
      
      if (startDate) {
        filteredData = filteredData.filter(item => {
          if (!item.date) return false;
          const itemDate = item.date instanceof Date ? item.date : new Date(item.date);
          return itemDate >= startDate && (!endDate || itemDate <= endDate);
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