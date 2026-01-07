function parseAccountSet(tx) {
  return {
    type: "AccountSet",
    hash: tx.hash,
    account: tx.Account,
    fee: tx.Fee ? Number(tx.Fee) / 1_000_000 : null,
    seq: tx.Sequence,
    domain: tx.Domain
      ? Buffer.from(tx.Domain, "hex").toString()
      : null,
    setFlag: tx.SetFlag ?? null,
    clearFlag: tx.ClearFlag ?? null,
    message_key: tx.MessageKey ?? null,
    memo: tx.Memos?.[0]?.Memo?.MemoData
      ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
      : null,
    raw: tx
  };
}

module.exports = { parseAccountSet };
