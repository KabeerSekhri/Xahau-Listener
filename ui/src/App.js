import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "./api";
import PaymentFilters from "./PaymentFilters";

function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    getConfig().then(res => setConfig(res.data));
  }, []);

  if (!config) return <div>Loading...</div>;

  return (
    <div>
      <h2>Xahau Ops Detector</h2>

      <PaymentFilters
        payment={config.filters.payment}
        onChange={payment => {
          setConfig({
            ...config,
            filters: {
              ...config.filters,
              payment
            }
          });
        }}
      />

      <button onClick={() => saveConfig(config)}>
        Save Filters
      </button>
    </div>
  );
}

export default App;
