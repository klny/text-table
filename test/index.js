const table = require('../index');

const obj = {
  first: {
    max: 1000,
    min: 1,
    avg: 500
  },
  second: {
    max: 7.5350695,
    min: 2,
    avg: 5
  },
  third: {
    max: 15,
    min: 11,
    avg: 13
  }
};

const arr = [
  {
    product: 'tv',
    description: 'oled television 55"',
    price: 1500
  },
  {
    product: 'ps4pro',
    description: 'playstation 4 pro',
    price: 450
  },
  {
    product: 'notebook',
    description: 'hp elitebook 840 G5',
    price: 935
  }
];

async function test() {
  console.log('table of string');
  console.log(table('string table', 'string'));

  console.log('table of empty object');
  console.log(table('empty object table', {}));

  console.log('table of empty array');
  console.log(table('empty array table',[]));

  console.log('table of object');
  console.log(table(' - - - performance stats - - - ', obj, 'ms'));

  console.log('table of array');
  console.log(table(' - - - product list - - - ', arr));

  console.log('reconfigure table');
  table.configure({
    cellSpacing: 3,
    columnDivider: ' ',
    decimalPlaces: 15
  });

  console.log(table(' - - - performance stats reconfigured - - - ', obj, 'min'));
}

module.exports = test();