import { useState } from "react";

function shortHash(hash) {
  if (!hash) return "—";
  return `${hash.slice(0, 4)}…${hash.slice(-4)}`;
}

function explorerUrl(hash) {
  return `https://explorer.xahau.network/tx/${hash}`;
}

function NotificationBlock({ match }) {
  switch (match.type) {
    case "Payment":
      return (
        <>
          <p><strong>hash:</strong> {match.hash}</p>
          <p><strong>From:</strong> {match.from}</p>
          <p><strong>To:</strong> {match.to}</p>
          <p><strong>Amount:</strong> {match.amount} {match.currency}</p>
        </>
      );

    case "AccountSet":
      return (
        <>
          <p><strong>hash:</strong> {match.hash}</p>
          <p><strong>Account:</strong> {match.account}</p>
          <p><strong>SetFlag:</strong> {match.setFlag ?? "—"}</p>
          <p><strong>ClearFlag:</strong> {match.clearFlag ?? "—"}</p>
          <p><strong>Domain:</strong> {match.domain ?? "—"}</p>
        </>
      );

    case "URITokenMint":
      return (
        <>
          <p><strong>hash:</strong> {match.hash}</p>
          <p><strong>Account:</strong> {match.account}</p>
          <p><strong>Flags:</strong> {match.flags}</p>
          <p><strong>URI:</strong> {match.uri}</p>
          <p><strong>Amount:</strong> {match.amount ?? "—"}</p>
          <p><strong>Destination:</strong> {match.destination ?? "—"}</p>
        </>
      );
    case "URITokenCreateSellOffer":
      return (
        <>
          <p><strong>hash:</strong> {match.hash}</p>
          <p><strong>Account:</strong> {match.account}</p>
          <p><strong>TokenID:</strong> {match.tokenID}</p>
          <p><strong>Amount:</strong> {match.amount} {match.currency}</p>
          <p><strong>Destination:</strong> {match.destination ?? "—"}</p>
        </>
      );
    case "URITokenBurn":
          return (
          <>
            <p><strong>hash:</strong> {match.hash}</p>
            <p><strong>Account:</strong> {match.account}</p>
            <p><strong>TokenID:</strong> {match.tokenID}</p>
          </>
          );

    default:
      return <p>Matched transaction</p>;
  }
}


export default function MatchCard({ match }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`match-card ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
    >
      {/* Header */}
      <div className="match-header">
        <strong>
          {open ? "▼" : "▶"} {match.type} | {shortHash(match.hash)}
        </strong>
        <small>{match.time}</small>
      </div>

      {!open && (
        <div className="match-summary">
          Tx: {shortHash(match.hash)}
        </div>
      )}

      {open && (
        <div className="match-details notification">
          <NotificationBlock match={match} />

          <div className="tx-link">
            <a
              href={explorerUrl(match.hash)}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              🔗 View on Xahau Explorer
            </a>
          </div>

          {match.raw && (
            <>
              <h4>Raw Transaction</h4>
              <pre className="raw-json">
                {JSON.stringify(match.raw, null, 2)}
              </pre>
            </>
          )}
        </div>
      )}
    </div>
  );
}
