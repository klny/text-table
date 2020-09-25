# text-table
Create text table from JS objects/arrays to visualize data in console/log

## Usage
Import package for example as "table" and use it to get text table representation of your JS object or array.  

Imported "table" is a function:
```js
function table(tableName, data, units) {};
```

 * tableName - name of the table, will be centralized above table (empty string to skip)
 * data - JS object/array to be printed as table
 * units - optional, if provided will be printed at the end of each data row inside []

## Examples
Print JS object as table:  
```js
const table = require('@klny/text-table');

const obj = {
  first: { max: 1000, min: 1, avg: 500 },
  second: { max: 7.5350695, min: 2, avg: 5 },
  third: { max: 15, min: 11, avg: 13 }
};

console.log(table(' - - - performance stats - - - ', obj, 'ms'));
```

```sh

      - - - performance stats - - -

        |     max     | min | avg
----------------------------------------
 first  | 1000.000000 |   1 | 500   [ms]
 second |    7.535069 |   2 |   5   [ms]
 third  |   15.000000 |  11 |  13   [ms]
 
 
```

Print array as table:
```js
const table = require('@klny/text-table');
 
const arr = [
  { product: 'tv', description: 'oled television 55"', price: 1500 },
  { product: 'ps4pro', description: 'playstation 4 pro', price: 450 },
  { product: 'notebook', description: 'hp elitebook 840 G5', price: 935 }
];
 
console.log(table(' - - - product list - - - ', arr));
```
 
```sh

         - - - product list - - -
 
   product |     description     | price
 ---------------------------------------
  tv       | oled television 55" |  1500
  ps4pro   | playstation 4 pro   |   450
  notebook | hp elitebook 840 G5 |   935
  
  
```

## Configuration
Default configuration is a JS object:  
```js
const config = {
  cellSpacing: 1,
  columnDivider: '|',
  decimalPlaces: 6,
  emptyLinesTop: 1,
  emptyLinesAfterName: 1,
  emptyLinesBottom: 2
};
```

To change configuration use "configure" method.  
Specify any or all configuration keys. Default values will be used for missing keys.
```js
const table = require('@klny/text-table');

table.configure({
  cellSpacing: 3,
  columnDivider: ' ',
  decimalPlaces: 15
});
```

```js
const table = require('@klny/text-table');

const obj = {
  first: { max: 1000, min: 1, avg: 500 },
  second: { max: 7.5350695, min: 2, avg: 5 },
  third: { max: 15, min: 11, avg: 13 }
};

table.configure({ cellSpacing: 3, columnDivider: ' ', decimalPlaces: 15 });
console.log(table(' - - - performance stats reconfigured - - - ', obj, 'min'));
```

```sh

           - - - performance stats reconfigured - - -

                         max               min       avg
----------------------------------------------------------------
   first        1000.000000000000000         1       500   [min]
   second          7.535069500000000         2         5   [min]
   third          15.000000000000000        11        13   [min]
   
   
```

## Limitations
 * library works only with array or object representation of JS objects
 * only first level of included objects is transformed to a table (no inner tables)
 * array length will be printed in case of inner array
 * string 'object' will be printed in case of inner object  

## Installation
```bash
$ npm install @klny/text-table
```

## License

  [MIT](LICENSE)