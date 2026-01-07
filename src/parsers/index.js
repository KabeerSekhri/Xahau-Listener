const { parsePayment } = require("./payment");
const { parseAccountSet } = require("./account_set");
const { parseURImint } = require("./uri_mint");

const parsers = {
  Payment: parsePayment,
  AccountSet: parseAccountSet,
  URITokenMint: parseURImint
};

function parseTransaction(tx) {
  const parser = parsers[tx.TransactionType];
  if (!parser) return null;
  return parser(tx);
}

module.exports = { parseTransaction };
