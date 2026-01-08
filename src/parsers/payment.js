function parsePayment(tx) {
  const amount =
    typeof tx.Amount === "string"
      ? Number(tx.Amount) / 1_000_000
      : Number(tx.Amount.value);

  return {
    type: "Payment",
    hash: tx.hash,
    from: tx.Account,
    to: tx.Destination,
    amount,
    currency: tx.Amount.currency || "XAH",
    issuer: tx.Amount.issuer ?? null,
    destinationTag: tx.DestinationTag ?? null,
    memo: tx.Memos?.[0]?.Memo?.MemoData
      ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
      : null,
    raw: tx
  };
}

module.exports = { parsePayment };
