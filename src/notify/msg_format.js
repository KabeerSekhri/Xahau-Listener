function formatPayment(event) {
    return `
🚨 ${event.type} detected
Account: ${event.from}
Destination: ${event.to}
Amount: ${event.amount} ${event.currency}
Memo: ${event.memo || "—"}
Tx: https://explorer.xahau.network/tx/${event.hash}
    `
}

function formatAccountSet(event) {
  return `
⚙️ ${event.type} detected
Account: ${event.account}
Memo: ${event.memo || "—"}
Tx: https://explorer.xahau.network/tx/${event.hash}
`;
}

function formtURImint(event) {
    return `
🎨 ${event.type} detected
Account: ${event.account}
Flags: ${event.flags}
URI: ${event.uri}
Amount: ${event.amount ?? "—"}
Destination: ${event.destination ?? "—"}
Memo: ${event.memo || "—"}
Tx: https://explorer.xahau.network/tx/${event.hash}
`
}

function formatURICreateOffer(event) {
    return `
🖼️ ${event.type} detected
Account: ${event.account},
TokenID: ${event.tokenID}
Amount: ${event.amount} ${event.currency}
Destination: ${event.destination ?? "—"}
Memo: ${event.memo || "—"}
Tx: https://explorer.xahau.network/tx/${event.hash}
`
}

function formatURIBurn(event) {
    return `
🔥 ${event.type} detected
Account: ${event.account},
TokenID: ${event.tokenID}
Memo: ${event.memo || "—"}
Tx: https://explorer.xahau.network/tx/${event.hash}
`
}

function formatGeneric(event) {
  return `
🚨 ${event.type} detected
Account: ${event.from || "—"}
Tx: https://explorer.xahau.network/tx/${event.hash}
`;
}

const formatters = {
    Payment: formatPayment,
    AccountSet: formatAccountSet,
    URITokenMint: formtURImint,
    URITokenCreateSellOffer: formatURICreateOffer,
    URITokenBurn: formatURIBurn
}

function formatEvent(event) {
    return (formatters[event.type] || formatGeneric)(event);
}

module.exports = { formatEvent };