function globalFiltersPass(event, config) {
  const { sourceAccounts, memoContains } = config;

  if (sourceAccounts?.length && !sourceAccounts.includes(event.from)) {
    return false;
  }

  if (memoContains && (!event.memo || !event.memo.includes(memoContains))) {
    return false;
  }

  return true;
}

module.exports = { globalFiltersPass };
