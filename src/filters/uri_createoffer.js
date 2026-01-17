function uricreateofferFiltersPass(event, filter) {
    if (!filter?.enabled) return false;

    const { accounts, conditions } = filter;

    /* -------------------- Account filters -------------------- */
    if (accounts?.source?.length && !accounts.source.includes(event.account)) {
        return false;
    }
    if (accounts?.destination?.length && !accounts.destination.includes(event.destination)) {
        return false;
    }
    
    /* -------------------- URI filters -------------------- */
    const uriConditions = conditions?.uri;

    if (uriConditions?.length && !uriConditions.includes(event.tokenID)) {
        return false;
    }

      /* -------------------- Amount filters -------------------- */
    const amount = conditions?.amount;

    if (amount) {
        if (amount.exact !== null && event.amount !== amount.exact) {
        return false;
        }

        if (amount.min !== null && event.amount < amount.min) {
        return false;
        }

        if (amount.max !== null && amount.max > 0 && event.amount > amount.max) {
        return false;
        }
    }

    /* -------------------- Token filters -------------------- */
    const token = conditions?.token;

    if (token) {
        if (token.type === "native" && event.currency !== "XAH") {
        return false;
        }

        if (token.type === "issued" && event.currency === "XAH") {
        return false;
        }

        if (token.currency && event.currency !== token.currency) {
        return false;
        }

        if (token.issuer && event.issuer !== token.issuer) {
        return false;
        }
    }

    return true;

}

module.exports = { uricreateofferFiltersPass };