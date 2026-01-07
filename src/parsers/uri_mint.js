function parseURImint(tx) {
    return {
        type: "URITokenMint",
        hash: tx.hash,
        account: tx.Account,
        flags: tx.Flags ,
        uri: tx.URI,
        digest: tx.Digest,
        destination: tx.Destination ?? null,
        amount: tx.Amount,
        memo: tx.Memos?.[0]?.Memo?.MemoData
            ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
            : null,
        raw: tx       
    }
}

module.exports = { parseURImint };