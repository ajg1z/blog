const firstCharUpperCase = require('../utils/firstChartUpperCase');

module.exports = (sliceName) => `export interface ${firstCharUpperCase(sliceName)}Schema {
    
}`;
