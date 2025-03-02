import axios from 'axios';

const API_URL = '/api';

/**
 * Get inventory data with optional filters
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Array>} - Inventory data
 */
export const getInventoryData = async (filters = {}) => {
  try {
    const { make, duration } = filters;
    
    let url = `${API_URL}/inventory`;
    let params = {};
    
    if (make && make.length > 0) {
      params.make = make.join(',');
    }
    
    if (duration) {
      params.duration = duration;
    }
    
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};