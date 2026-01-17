const { parsePayment } = require("./payment");
const { parseAccountSet } = require("./account_set");
const { parseURImint } = require("./uri_mint");
const { parseURIcreateoffer } = require("./uri_createoffer");
const { parseURIburn } = require("./uri_burn");
const { parse } = require("dotenv");

const parsers = {
  Payment: parsePayment,
  AccountSet: parseAccountSet,
  URITokenMint: parseURImint,
  URITokenCreateSellOffer: parseURIcreateoffer,
  URITokenBurn: parseURIburn
};

function parseTransaction(tx) {
  const parser = parsers[tx.TransactionType];
  if (!parser) return null;
  return parser(tx);
}

module.exports = { parseTransaction };
