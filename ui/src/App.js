// ui/src/App.js
import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "./api";
import PaymentFilters from "./PaymentFilters";
import AccountSetFilters from "./AccountSetFilters";
import UriMintFilters from "./UriMintFilters";
import UriCreateofferFilters from "./UriCreateofferFilters";
import UriBurnFilters from "./UriBurnFilters";
import MatchCard from "./MatchCard";

function App() {
  const [config, setConfig] = useState(null);
  const [matches, setMatches] = useState([]);
  const [running, setRunning] = useState(true);


  useEffect(() => {
    getConfig().then(res => {
      const cfg = res.data;

      cfg.filters.payment ||= {
        enabled: true,
        accounts: { from: [], to: [] },
        conditions: {
          amount: { min: 0, max: 0, exact: null },
          token: { type: "any", currency: null, issuer: null },
          destinationTag: null
        }
      };

      cfg.filters.accountSet ||= {
          enabled: true,
          accounts: { source: [] },
          conditions: {
            domainOnly: false,
            requireFlagChange: false
          }
        };

      cfg.filters.uriMint ||= {
          enabled: true,
          accounts: { source: [], destination: [] },
          conditions: {
            uri: [],
            amount: { min: 0, max: 0, exact: null },
            token: { type: "any", currency: null, issuer: null }
          }
        };

      cfg.filters.uriCreateOffer ||= {
        enabled: true,
        accounts: { source: [], destination: [] },
        conditions: {
          amount: { min: 0, max: 0, exact: null },
          token: { type: "any", currency: null, issuer: null }
        }
      }

      cfg.filters.uriBurn ||= {
        enabled: true,
        accounts: { source: [] },
        conditions: {
          uri: []
        }
      }

      setConfig(cfg);
    });
  }, []);

  useEffect(() => {
  if (!running) return;

  const ws = new WebSocket("ws://localhost:4000");

  ws.onmessage = (event) => {
    const match = JSON.parse(event.data);
    setMatches((prev) => [match, ...prev].slice(0, 50));
  };

  return () => ws.close();
}, [running]);


  if (!config) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Xahau Live-Ops Detector</h1>
        <p>Transaction monitoring & filter configuration</p>
      </header>

      <div className="filters-grid">
        <PaymentFilters
          payment={config.filters.payment}
          onChange={(payment) =>
            setConfig({
              ...config,
              filters: {
                ...config.filters,
                payment
              }
            })
          }
        />
        <AccountSetFilters
          accountSet={config.filters.accountSet}
          onChange={(accountSet) =>
            setConfig({
              ...config,
              filters: {
                ...config.filters,
                accountSet
              }
            })
          }
        />
        <UriMintFilters
          uriMint={config.filters.uriMint}
          onChange={(uriMint) =>
            setConfig({
              ...config,
              filters: {
                ...config.filters,
                uriMint
              }
            })
          }
        />
        <UriCreateofferFilters
          uriCreateoffer={config.filters.uriCreateOffer}
          onChange={(uriCreateoffer) =>
            setConfig({
              ...config,
              filters: {
                ...config.filters,
                uriCreateoffer
              }
            })
          }
        />
        <UriBurnFilters
          uriBurn={config.filters.uriBurn}
          onChange={(uriBurn) =>
            setConfig({
              ...config,
              filters: {
                ...config.filters,
                uriBurn
              }
            })
          }
        />
      </div>

      <button className="save-btn" onClick={() => saveConfig(config)}>
        Save Filters
      </button>
      
      <div className="controls">
      <button onClick={() => setRunning(true)} disabled={running}>
        ▶ Start
      </button>

      <button onClick={() => setRunning(false)} disabled={!running}>
        ⏸ Stop
      </button>

      <button onClick={() => setMatches([])}>
        🧹 Clear
      </button>
    </div>


    <h2>Live Matches</h2>

    <div style={{ maxHeight: 400, overflowY: "auto" }}>
      {matches.length === 0 && (
        <div style={{ color: "#777" }}>No matches yet</div>
      )}

      {matches.map((m, i) => (
        <MatchCard key={i} match={m} />
      ))}
    </div>



      <footer className="footer">
        Made by <strong>Kabeer Sekhri</strong>
      </footer>
    </div>
  );
}

export default App;
