function urimintFiltersPass(event, config) {
    // --- Account filters ---
    if (config.accounts.account?.length && !config.accounts.account.includes(event.account)) {
        return false;
    }

    if (config.accounts.destination?.length && !config.accounts.destination.includes(event.destination)) {
        return false;
    }

    if (config.accounts.uri?.length && !config.accounts.uri.includes(event.uri)) {
        return false;
    }

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
    
    return true;
}

module.exports = { urimintFiltersPass };