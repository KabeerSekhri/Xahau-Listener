function parseURIburn(tx) {
    return {
        type: "URITokenBurn",
        hash: tx.hash,
        account: tx.Account,
        tokenID: tx.URITokenID,
        memo: tx.Memos?.[0]?.Memo?.MemoData
            ? Buffer.from(tx.Memos[0].Memo.MemoData, "hex").toString()
            : null,
        raw: tx       
    }
}

module.exports = { parseURIburn };