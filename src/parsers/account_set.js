function parseAccountSet(tx) {
  return {
    type: "AccountSet",
    hash: tx.hash,
    account: tx.Account,
    fee: tx.Fee ? Number(tx.Fee) / 1_000_000 : null,
    
    setFlag: tx.SetFlag ?? null,
    clearFlag: tx.ClearFlag ?? null,
    domain: tx.Domain
      ? Buffer.from(tx.Domain, "hex").toString()
      : null,
    memo: tx.Memos?.[0]?.Memo?.MemoData
      ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
      : null,
    raw: tx
  };
}

module.exports = { parseAccountSet };
