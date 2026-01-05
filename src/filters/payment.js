function paymentFiltersPass(event, config) {
  if (config.minAmount && event.amount < config.minAmount) {
    return false;
  }

  if (config.currency && event.currency !== config.currency) {
    return false;
  }

  return true;
}

module.exports = { paymentFiltersPass };
