function paymentFiltersPass(event, config) {
  // --- Amount filters ---
  if (config.amount?.exact !== null && event.amount !== config.amount.exact) {
    return false;
  }

  if (config.amount?.min !== null && event.amount < config.amount.min) {
    return false;
  }

  if (config.amount?.max !== null && event.amount > config.amount.max) {
    return false;
  }

  // --- Token filters ---
  if (config.token?.type === "native" && event.currency !== "XAH") {
    return false;
  }

  if (config.token?.type === "issued" && event.currency === "XAH") {
    return false;
  }

  if (config.token?.currency && event.currency !== config.token.currency) {
    return false;
  }

  if (config.token?.issuer && event.issuer !== config.token.issuer) {
    return false;
  }

  // --- Account filters ---
  if (config.accounts?.from?.length && !config.accounts.from.includes(event.from)) {
    return false;
  }

  if (config.accounts?.to?.length && !config.accounts.to.includes(event.to)) {
    return false;
  }

  // --- Tag filters ---
  if (
    config.tags?.destination !== null &&
    event.destinationTag !== config.tags.destination
  ) {
    return false;
  }

  return true;
}

module.exports = { paymentFiltersPass };
