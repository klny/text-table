const config = require('./config');

function isObject(x) {
  if (!x || typeof x !== 'object' || Array.isArray(x)) return false;
  return Object.keys(x).length > 0;
}

function isDecimal(val) {
  return !isNaN(val) && val % 1 !== 0;
}

function length(val) {
  if (!val) return 0;
  if (isNaN(val)) return val.length;

  return Math.round(val).toString().length;
}

function greater(x, y, z = 0) {
  return (x > y && x > z) ? x : (y > z ? y : z);
}

// left pad string to specified length with specified char
function pad(str, length, type = 'L', char = ' ') {
  let padding = '';
  let strLen = str ? ('' + str).length : 0;

  for (let i = strLen; i < length; i++) {
    padding += char;
  }

  return type === 'R' ? str + padding : padding + str;
}

function lpad(str, length, char = ' ') {
  return pad(str, length, 'L', char);
}

function rpad(str, length, char = ' ') {
  return pad(str, length, 'R', char);
}

function cpad(str, length, char = ' ') {
  const half = Math.floor((length + str.length) / 2);
  return lpad(rpad(str, half, char), length, char);
}

function newLines(count) {
  return lpad('', count, '\n');
}

module.exports = {
  isObject: isObject,
  isDecimal: isDecimal,
  length: length,
  greater: greater,
  pad: pad,
  lpad: lpad,
  rpad: rpad,
  cpad: cpad,
  newLines: newLines
};