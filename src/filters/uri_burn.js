function uriburnFiltersPass(event, filter) {
    if (!filter?.enabled) return false;

    const { accounts, conditions } = filter;

    /* -------------------- Account filters -------------------- */
    if (accounts?.source?.length && !accounts.source.includes(event.account)) {
        return false;
    }
    
    /* -------------------- URI filters -------------------- */
    const uriConditions = conditions?.uri;

    if (uriConditions?.length && !uriConditions.includes(event.tokenID)) {
        return false;
    }

    return true;
}

module.exports = { uriburnFiltersPass };