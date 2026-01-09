function accountsetFiltersPass(event, filter) {
  if (!filter?.enabled) return false;

  const { accounts, conditions } = filter;

  /* -------------------- Account filter -------------------- */
  if (
    accounts?.source?.length &&
    !accounts.source.includes(event.account)
  ) {
    return false;
  }

  /* -------------------- Domain change -------------------- */
  if (conditions.domainOnly && !event.domain) {
    return false;
  }

  /* -------------------- Flag change -------------------- */
  if (
    conditions.requireFlagChange &&
    !event.setFlag &&
    !event.clearFlag
  ) {
    return false;
  }

  return true;
}

module.exports = { accountsetFiltersPass };
