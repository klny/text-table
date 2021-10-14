const config = require('./config');

// convert JS object to array
function objToArr(data) {
  const arr = [];
  Object.keys(data).forEach(key => {
    arr.push({'': key, ...data[key]});
  });

  return arr;
}

function isObject(x) {
  return !(!x || typeof x !== 'object' || Array.isArray(x));
}

function isDecimal(val) {
  return !isNaN(val) && val % 1 !== 0;
}

function length(val) {
  if (!val) return 0;
  if (Array.isArray(val)) return length(val.length); // length of string representation of array.length
  if (isObject(val)) return 6;                       // length of string 'object'
  if (isNaN(val)) return val.length;

  return Math.round(val).toString().length;
}

function greater(x, y, z = 0) {
  return (x > y && x > z) ? x : (y > z ? y : z);
}

// left pad string to specified length with specified char
function pad(str, length, type = 'L', char = ' ') {
  let padding = '';
  let strLen = ('' + str).length;

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
  objToArr: objToArr,
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