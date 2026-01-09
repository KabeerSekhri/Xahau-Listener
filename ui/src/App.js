import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "./api";
import PaymentFilters from "./PaymentFilters";

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

      <button onClick={() => saveConfig(config)}>
        Save Filters
      </button>
    </div>
  );
}

export default App;
