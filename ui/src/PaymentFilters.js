export default function PaymentFilters({ payment, onChange }) {
  const { conditions } = payment;
  const { amount, token } = conditions;

  const updatePayment = (updates) => {
    onChange({
      ...payment,
      ...updates
    });
  };

  const updateConditions = (updates) => {
    updatePayment({
      conditions: {
        ...conditions,
        ...updates
      }
    });
  };

  return (
    <div className="card">
      <h3>Payment Filters</h3>

      {/* Enable */}
      <label>
        <input
          type="checkbox"
          checked={payment.enabled}
          onChange={(e) =>
            updatePayment({ enabled: e.target.checked })
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
