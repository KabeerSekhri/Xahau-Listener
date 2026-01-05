const { parsePayment } = require("./payment");

const parsers = {
  Payment: parsePayment
};

function parseTransaction(tx) {
  const parser = parsers[tx.TransactionType];
  if (!parser) return null;
  return parser(tx);
}

module.exports = { parseTransaction };
