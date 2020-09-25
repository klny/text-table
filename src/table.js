const config = require('./config');
const utils = require('./utils');
const cols = require('./columns');

function getCellValue(value, type) {
  if (!value) return '';
  if (type === 'object') return 'object';
  if (type === 'array') return value.length;
  return (type === 'decimal' ? value.toFixed(config.decimalPlaces) : value);
}

// get table row from object
function getRow(obj, columns) {
  const space = utils.lpad('', config.cellSpacing);
  const divider = space + config.columnDivider + space;

  let row = '';
  let isFirst = true;
  Object.keys(columns).forEach(key => {
    const cnf = columns[key];
    const len = (cnf.type === 'decimal' ? cnf.length + config.decimalPlaces + 1 : cnf.length);

    if (obj === columns) {
      row += (isFirst ? space : divider) + utils.cpad(key, len);
    } else {
      const value = getCellValue(obj[key], cnf.type);
      row += (isFirst ? space : divider) + utils.pad(value, len, (cnf.type === 'string' ? 'R' : 'L'));
    }

    isFirst = false;
  });

  return row;
}

// create text table from JS object/array
function getTable(name, data, units) {
  // normalize and check array
  const arr = utils.isObject(data) ? utils.objToArr(data) : data;
  if (!Array.isArray(arr) || arr.length === 0) return null;

  // add units to every data row if provided
  const dataRowEnd = (units ? '   [' + units + ']' : '');

  // get columns settings and create table header
  const columns = cols(arr);
  const header = getRow(columns, columns);
  const length = header.length + dataRowEnd.length;
  const divider = '\n' + utils.lpad('', length, '-');

  // create table data
  let content = '';
  arr.forEach(item => {
    content += '\n' + getRow(item, columns) + dataRowEnd;
  });

  return utils.newLines(config.emptyLinesTop) + utils.cpad(name, length) + utils.newLines(config.emptyLinesAfterName + 1) + header + divider + content + utils.newLines(config.emptyLinesBottom);
}

module.exports = getTable;