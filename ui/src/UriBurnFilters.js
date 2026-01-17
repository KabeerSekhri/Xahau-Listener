export default function UriBurnFilters({ uriBurn, onChange }) {
  const { conditions } = uriBurn;
  const { amount, token } = conditions;

  const updateUriBurn = (updates) => {
    onChange({
      ...uriBurn,
      ...updates
    });
  };

  const updateConditions = (updates) => {
    updateUriBurn({
      conditions: {
        ...conditions,
        ...updates
      }
    });
  };

  return (
    <div className="card">
      <h3>URITokenBurn Filters</h3>

      {/* Enable */}
      <label>
        <input
          type="checkbox"
          checked={uriBurn.enabled}
          onChange={(e) =>
            updateUriBurn({ enabled: e.target.checked })
          }
        />
        Enabled
      </label>

      
    </div>
  );
}
