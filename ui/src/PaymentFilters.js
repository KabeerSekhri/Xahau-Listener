import { useState } from "react";

export default function PaymentFilters({ payment, onChange }) {
  const [local, setLocal] = useState(payment);

  function update(path, value) {
    const updated = { ...local };
    path.reduce((obj, key, i) => {
      if (i === path.length - 1) obj[key] = value;
      return obj[key];
    }, updated);

    setLocal(updated);
    onChange(updated);
  }

  return (
    <div>
      <h3>Payment Filters</h3>

      <label>Min Amount</label>
      <input
        type="number"
        value={local.amount.min ?? ""}
        onChange={e => update(["amount", "min"], Number(e.target.value))}
      />

      <label>Max Amount</label>
      <input
        type="number"
        value={local.amount.max ?? ""}
        onChange={e => update(["amount", "max"], Number(e.target.value))}
      />

      <label>Token Type</label>
      <select
        value={local.token.type}
        onChange={e => update(["token", "type"], e.target.value)}
      >
        <option value="any">Any</option>
        <option value="native">XAH only</option>
        <option value="issued">Issued tokens</option>
      </select>

      <label>From Account</label>
      <input
        type="text"
        placeholder="r..."
        onChange={e => update(["accounts", "from"], [e.target.value])}
      />
    </div>
  );
}
