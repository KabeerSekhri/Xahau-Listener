// ui/src/App.js
import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "./api";
import PaymentFilters from "./PaymentFilters";
import AccountSetFilters from "./AccountSetFilters";
import UriMintFilters from "./UriMintFilters";

function App() {
  const [config, setConfig] = useState(null);

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

      setConfig(cfg);
    });
  }, []);

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
      </div>

      <button className="save-btn" onClick={() => saveConfig(config)}>
        Save Filters
      </button>

      <footer className="footer">
        Made by <strong>Kabeer Sekhri</strong>
      </footer>
    </div>
  );
}

export default App;
