const { globalFiltersPass } = require("../filters/global");
const { paymentFiltersPass } = require("../filters/payment");
const { accountsetFiltersPass } = require("../filters/account_set");
const { urimintFiltersPass } = require("../filters/uri_mint");

function matches(event, config) {
  if (!globalFiltersPass(event, config.filters.global)) {
    return false;
  }

  if (event.type === "Payment") {
    return paymentFiltersPass(event, config.filters.payment);
  }

  if (event.type === "AccountSet") {
    return accountsetFiltersPass(event, config.filters.accountSet);
  }

  if (event.type === "URITokenMint") {
    return urimintFiltersPass(event, config.filters.uriMint);
  }

  return true;
}

module.exports = { matches };
