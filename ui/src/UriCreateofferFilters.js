export default function UriCreateofferFilters({ uriCreateoffer, onChange }) {
  const { conditions } = uriCreateoffer;
  const { amount, token } = conditions;

  const updateUriCreateoffer = (updates) => {
    onChange({
      ...uriCreateoffer,
      ...updates
    });
  };

  const updateConditions = (updates) => {
    updateUriCreateoffer({
      conditions: {
        ...conditions,
        ...updates
      }
    });
  };

  return (
    <div className="card">
      <h3>URITokenCreateSellOffer Filters</h3>

      {/* Enable */}
      <label>
        <input
          type="checkbox"
          checked={uriCreateoffer.enabled}
          onChange={(e) =>
            updateUriCreateoffer({ enabled: e.target.checked })
          }
        />
        Enabled
      </label>

      {/* Amount */}
      <h4>Amount</h4>
      <input
        type="number"
        value={amount.min}
        placeholder="Min"
        onChange={(e) =>
          updateConditions({
            amount: { ...amount, min: Number(e.target.value) }
          })
        }
      />

      <input
        type="number"
        value={amount.max}
        placeholder="Max (0 = unlimited)"
        onChange={(e) =>
          updateConditions({
            amount: { ...amount, max: Number(e.target.value) }
          })
        }
      />

      {/* Token */}
      <h4>Token</h4>
      <select
        value={token.type}
        onChange={(e) =>
          updateConditions({
            token: { ...token, type: e.target.value }
          })
        }
      >
        <option value="any">Any</option>
        <option value="native">XAH</option>
        <option value="issued">Issued</option>
      </select>

      <input
        type="text"
        placeholder="Currency (optional)"
        value={token.currency || ""}
        onChange={(e) =>
          updateConditions({
            token: { ...token, currency: e.target.value || null }
          })
        }
      />

      <input
        type="text"
        placeholder="Issuer (optional)"
        value={token.issuer || ""}
        onChange={(e) =>
          updateConditions({
            token: { ...token, issuer: e.target.value || null }
          })
        }
      />
    </div>
  );
}
