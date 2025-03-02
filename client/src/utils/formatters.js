/**
 * Format currency amount
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  /**
   * Format date to display format
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date
   */
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: '2-digit'
    }).format(date);
  };
  
  /**
   * Group data by month for charts
   * @param {Array} data - Array of inventory items
   * @returns {Object} - Data grouped by month
   */
  export const groupByMonth = (data) => {
    const grouped = {};
    
    data.forEach(item => {
      const date = new Date(item.date);
      const month = `${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`;
      
      if (!grouped[month]) {
        grouped[month] = {
          NEW: 0,
          USED: 0,
          CPO: 0,
          newMSRP: 0,
          usedMSRP: 0,
          cpoMSRP: 0,
          count: 0
        };
      }
      
      grouped[month][item.type] += 1;
      grouped[month].count += 1;
      
      const msrp = parseFloat(item.msrp);
      
      if (item.type === 'NEW') {
        grouped[month].newMSRP += msrp;
      } else if (item.type === 'USED') {
        grouped[month].usedMSRP += msrp;
      } else if (item.type === 'CPO') {
        grouped[month].cpoMSRP += msrp;
      }
    });
    
    return grouped;
  };