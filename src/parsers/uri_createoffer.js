function parseURIcreateoffer(tx) {
  const amount =
    typeof tx.Amount === "string"
      ? Number(tx.Amount) / 1_000_000
      : Number(tx.Amount.value);
    return {
        type: "URITokenCreateSellOffer",
        hash: tx.hash,
        account: tx.Account,
        tokenID: tx.URITokenID,
        destination: tx.Destination,
        amount: amount,
        currency: tx.Amount.currency || "XAH",
        memo: tx.Memos?.[0]?.Memo?.MemoData
            ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
            : null,
        raw: tx       
    }
}

module.exports = { parseURIcreateoffer };