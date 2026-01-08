function accountsetFiltersPass(event, config) {
    // --- Account filters ---
    if (config.accounts?.account?.length && !config.accounts.account.includes(event.account)) {
        return false;
    }

    if (config.accounts?.domain?.length && !config.accounts.domain.includes(event.domain)) {
        return false;
    }

    return true;
}

module.exports = { accountsetFiltersPass };