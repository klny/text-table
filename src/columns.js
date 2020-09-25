const utils = require('./utils');

function createNewColumn(value) {
  let type = '';
  if (Array.isArray(value)) {
    type = 'array';
  } else if (utils.isObject(value)) {
    type = 'object';
  } else {
    type = isNaN(value) ? 'string' : (utils.isDecimal(value) ? 'decimal' : 'integer');
  }

  return {
    type: type,
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

module.exports = getTableColumns;