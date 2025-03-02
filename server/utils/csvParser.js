const fs = require('fs');
const csv = require('csv-parser');

/**
 * Parse a CSV file and return the data as an array of objects
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise<Array>} - Array of objects representing rows in the CSV
 */
module.exports = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};