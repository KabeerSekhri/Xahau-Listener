function parseURImint(tx) {
    return {
        type: "URITokenMint",
        hash: tx.hash,
        account: tx.account,
        flags: tx.flags,
        uri: tx.uri,
        digest: tx.digest,
        destination: tx.destination,
        amount: tx.amount,
        memo: tx.Memos?.[0]?.Memo?.MemoData
            ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
            : null,
        raw: tx       
    }
}

module.exports = { parseURImint };