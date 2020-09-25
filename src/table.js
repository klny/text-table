const config = require('./config');
const utils = require('./utils');

// convert JS object to array
function objToArr(data) {
  const arr = [];
  Object.keys(data).forEach(key => {
    arr.push({'': key, ...data[key]});
  });

  return arr;
}

function createNewColumn(value) {
  return {
    type: isNaN(value) ? 'string' : (utils.isDecimal(value) ? 'decimal' : 'integer'),
    length: utils.length(value)
  }
}

function addOrUpdateColumn(params, name, value) {
  // create new param if not found
  if (!params[name]) {
    params[name] = createNewColumn(value);
    return;
  }

  // update type of numeric columns
  if (params[name].type === 'integer') {
    if (utils.isDecimal(value)) params[name].type = 'decimal';
  }

  // resolve column length
  params[name].length = utils.greater(params[name].length, utils.length(value), name.length);
}

// get description of table columns
function getTableColumns(data) {
  const params = {};
  data.forEach(item => {
    Object.keys(item).forEach(key => addOrUpdateColumn(params, key, item[key]));
  });

  return params;
}

// get table row from object
function getRow(obj, columns) {
  const space = utils.lpad('', config.cellSpacing);
  const divider = space + config.columnDivider + space;

  let row = '';
  let isFirst = true;
  Object.keys(obj).forEach(key => {
    const cnf = columns[key];
    const len = (cnf.type === 'decimal' ? cnf.length + config.decimalPlaces + 1 : cnf.length);

    if (obj === columns) {
      row += (isFirst ? space : divider) + utils.cpad(key, len);
    } else {
      const value = (cnf.type === 'decimal' ? obj[key].toFixed(config.decimalPlaces) : obj[key]);
      row += (isFirst ? space : divider) + utils.pad(value, len, (cnf.type === 'string' ? 'R' : 'L'));
    }

    isFirst = false;
  });

  return row;
}

function getTable(name, data, units) {
  // normalize and check array
  const arr = utils.isObject(data) ? objToArr(data) : data;
  if (!Array.isArray(arr) || arr.length === 0) return null;

  // add units to every data row if provided
  const dataRowEnd = (units ? '   [' + units + ']' : '');

  // get columns settings and create table header
  const columns = getTableColumns(arr);
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