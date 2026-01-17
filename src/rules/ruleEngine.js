const { globalFiltersPass } = require("../filters/global");
const { paymentFiltersPass } = require("../filters/payment");
const { accountsetFiltersPass } = require("../filters/account_set");
const { urimintFiltersPass } = require("../filters/uri_mint");
const { uricreateofferFiltersPass } = require("../filters/uri_createoffer");
const { uriburnFiltersPass } = require("../filters/uri_burn");

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

  if (event.type === "URITokenCreateSellOffer") {
    return uricreateofferFiltersPass(event, config.filters.uriCreateOffer);
  }
  
  if (event.type === "URITokenBurn") {
    return uriburnFiltersPass(event, config.filters.uriBurn);
  }

  return true;
}

module.exports = { matches };
