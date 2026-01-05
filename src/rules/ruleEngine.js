const { globalFiltersPass } = require("../filters/global");
const { paymentFiltersPass } = require("../filters/payment");

function matches(event, config) {
  if (!globalFiltersPass(event, config.filters.global)) {
    return false;
  }

  if (event.type === "Payment") {
    return paymentFiltersPass(event, config.filters.payment);
  }

  return false;
}

module.exports = { matches };
