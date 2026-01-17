function parseURIcreateoffer(tx) {
    let amount = null;

    if (typeof tx.Amount === "string") {
        const amount = Number(tx.Amount) / 1_000_000;
    }
    else if (typeof tx.Amount === "object")  {
        const amount = Number(tx.Amount.value);
    }

    return {
        type: "URITokenCreateSellOffer",
        hash: tx.hash,
        account: tx.Account,
        tokenID: tx.URITokenID,
        destination: tx.Destination,
        amount: amount,
        memo: tx.Memos?.[0]?.Memo?.MemoData
            ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
            : null,
        raw: tx       
    }
}

module.exports = { parseURIcreateoffer };