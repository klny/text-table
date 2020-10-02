const utils = require('./utils');

function createNewColumn(name, value) {
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
    length: utils.greater(name.length, utils.length(value))
  }
}

function addOrUpdateColumn(params, name, value) {
  // create new param if not found
  if (!params[name]) {
    params[name] = createNewColumn(name, value);
    return;
  }

  // update type of numeric columns
  if (params[name].type === 'integer') {
    if (utils.isDecimal(value)) params[name].type = 'decimal';
  }

  // resolve column length
  params[name].length = utils.greater(params[name].length, utils.length(value));
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