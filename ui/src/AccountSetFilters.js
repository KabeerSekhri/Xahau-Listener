export default function AccountSetFilters({ accountSet, onChange }) {
  const { conditions } = accountSet;

  const update = (updates) => {
    onChange({
      ...accountSet,
      ...updates
    });
  };

  const updateConditions = (updates) => {
    update({
      conditions: {
        ...conditions,
        ...updates
      }
    });
  };

  return (
    <div className="card">
      <h3>AccountSet Filters</h3>

      <label>
        <input
          type="checkbox"
          checked={accountSet.enabled}
          onChange={(e) =>
            update({ enabled: e.target.checked })
          }
        />
        Enabled
      </label>

      <label>
        <input
          type="checkbox"
          checked={conditions.domainOnly}
          onChange={(e) =>
            updateConditions({ domainOnly: e.target.checked })
          }
        />
        Domain changes only
      </label>

      <label>
        <input
          type="checkbox"
          checked={conditions.requireFlagChange}
          onChange={(e) =>
            updateConditions({ requireFlagChange: e.target.checked })
          }
        />
        Require flag change
      </label>
    </div>
  );
}
