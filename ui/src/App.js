import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "./api";
import PaymentFilters from "./PaymentFilters";
import AccountSetFilters from "./AccountSetFilters";

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

      setConfig(cfg);
    });
  }, []);

  if (!config) return <div>Loading...</div>;

  return (
    <div>
      <h2>Xahau Ops Detector</h2>

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

      <button onClick={() => saveConfig(config)}>
        Save Filters
      </button>
    </div>
  );
}

export default App;
