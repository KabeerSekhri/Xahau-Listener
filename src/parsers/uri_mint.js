function parseURImint(tx) {
    let amount = null;

    if (typeof tx.Amount === "string") {
        const amount = Number(tx.Amount) / 1_000_000;
    }
    else if (typeof tx.Amount === "object")  {
        const amount = Number(tx.Amount.value);
    }
 
    return {
        type: "URITokenMint",
        hash: tx.hash,
        account: tx.Account,
        flags: tx.Flags ,
        uri: tx.URI,
        digest: tx.Digest,
        destination: tx.Destination,
        amount: amount,
        memo: tx.Memos?.[0]?.Memo?.MemoData
            ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
            : null,
        raw: tx       
    }
}

module.exports = { parseURImint };