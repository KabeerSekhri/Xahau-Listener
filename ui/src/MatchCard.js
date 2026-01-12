import { useState } from "react";

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
          {open ? "▼" : "▶"} {match.type}
        </strong>
        <small>{match.time}</small>
      </div>

      <div className="match-summary">
        {match.summary || "Matched transaction"}
      </div>

      {open && (
        <div className="match-details">
          <Detail label="Hash" value={match.hash} />
          <Detail label="Ledger" value={match.ledgerIndex} />
          <Detail label="Time" value={match.time} />

          {match.accounts && (
            <>
              <h4>Accounts</h4>
              {Object.entries(match.accounts).map(([k, v]) => (
                <Detail key={k} label={k} value={v} />
              ))}
            </>
          )}

          {match.amount && (
            <>
              <h4>Amount</h4>
              <Detail label="Value" value={match.amount.value} />
              <Detail label="Token" value={match.amount.currency || "XAH"} />
            </>
          )}

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

function Detail({ label, value }) {
  if (!value) return null;

  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{String(value)}</span>
    </div>
  );
}
