const table = require('./src/table');
const config = require('./src/config');

table.configure = config.set;
module.exports = table;