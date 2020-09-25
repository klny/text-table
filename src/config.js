const config = {
  cellSpacing: 1,
  columnDivider: '|',
  decimalPlaces: 6,
  emptyLinesTop: 1,
  emptyLinesAfterName: 1,
  emptyLinesBottom: 2
};

function set(cnf) {
  if (!cnf) return;

  if (Number.isInteger(cnf.cellSpacing)) config.cellSpacing = cnf.cellSpacing;
  if (cnf.columnDivider) config.columnDivider = cnf.columnDivider;
  if (Number.isInteger(cnf.decimalPlaces)) config.decimalPlaces = cnf.decimalPlaces;

  if (Number.isInteger(cnf.emptyLinesTop)) config.emptyLinesTop = cnf.emptyLinesTop;
  if (Number.isInteger(cnf.emptyLinesAfterName)) config.emptyLinesAfterName = cnf.emptyLinesAfterName;
  if (Number.isInteger(cnf.emptyLinesBottom)) config.emptyLinesBottom = cnf.emptyLinesBottom;
}

config.set = set;
module.exports = config;