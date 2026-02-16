# Xahau Ops Detector – Developer README

A real-time transaction monitoring and filtering tool for the Xahau network.

## What It Does

This application:

- Connects to a Xahau WebSocket server
- Monitors live transactions
- Applies configurable filters
- Displays matching transactions in real time
- Allows exporting matched transactions

Supported transaction types:

- Payment
- AccountSet
- URITokenMint
- URITokenCreateSellOffer
- URITokenBurn

---

## Architecture

Backend:
- Node.js
- WebSocket server
- Rule engine for transaction filtering

Frontend:
- React
- Live WebSocket listener
- Configurable filter UI
- Match persistence via localStorage

## Running the Project

To run the project locally, you need to run **both the backend and the UI simultaneously**.

### Required

1. From the **source directory**:

   ```bash
   node src/app.js
   ```

2. From the **ui directory**:

   ```bash
   npm start
   ```

Both (1) and (2) **must be running at the same time**, in **separate terminals**.

### Optional (UI-only mode)

If you only want to view the UI **without backend transaction detection**, run:

```bash
node src/server.js
```

This will start the WebSocket server with mock / static data for UI testing.

---

## Adding a New Transaction Type (Backend)

This section describes how to add support for a **new transaction type** end-to-end on the backend.

### 1. Create a Parser

**Location:** `src/parser/`

* Create a new file named after the transaction type:

  ```
  <txType>.js
  ```

* Implement a parser function:

  ```js
  function parser_<txType>(tx) {
    return {
      // return all desired parameters extracted from tx
    };
  }
  ```

* This function should extract and return **all fields you want to use later** (filters, notifications, UI display).

---

### 2. Register the Parser

**Location:** `src/parser/index.js`

* Add the new transaction type to the parser list **using the actual on-ledger transaction name**.

```js
parsers["<TxType>"] = parser_<txType>;
```

---

### 3. Default vs Custom Filtering

If the transaction type is marked as **Default = true**, then:

* The transaction will be parsed
* It will appear in outputs
* No filtering or customization is applied

This is enough for **basic visibility**, but offers **no control**.

If **Default = false**, continue with the steps below.

---

### 4. Add Rule Engine Filter

**Location:** `src/rules/ruleEngine.js`

* Add a rule that matches the new transaction type
* This ensures the transaction flows through the filtering pipeline

---

### 5. Update Config

**Location:** `src/config/config.json`

* Inside the `filters` object, add a new field named after the transaction type:

```json
"<txType>": {
  "enabled": true
}
```

* Optional fields for future filtering:

```json
"accounts": {},
"conditions": {}
```

---

### 6. Create Filter Logic

**Location:** `src/filters/`

* Create a new file:

  ```
  <txType>.js
  ```

* Implement the filter function:

```js
function txFiltersPass(event, filter) {
  if (!filter?.enabled) return false;
  return true;
}
```

* This file is where **all advanced filtering logic** for this transaction type will live.

---

### 7. Add Notification Formatter

**Location:** `src/notify/msg_format.js`

* Create a formatter function:

```js
function format<txType>(event) {
  return `\n<Formatted message output>`;
}
```

* The formatter should return **only fields produced by the parser**.

* Register the formatter in the formatter list using the **actual transaction type name**.

---

## Adding a New Transaction Type (UI)

This section describes how to expose the new transaction type in the **frontend UI**.

---

### 1. Create UI Filter Component

**Location:** `ui/src/`

* Create a new file named after the transaction type:

```js
<txType>Filters.js
```

* Implement a component that:

  * Updates values inside `config.filters.<txType>`
  * Returns the JSX for configuring filters

* You may reuse layouts from existing transaction filter components.

---

### 2. Add Default Config in App.js

**Location:** `ui/src/App.js`

* Add a fallback default config:

```js
cfg.filters.<txType> ||= {
  enabled: true,
  accounts: {},
  conditions: {}
};
```

This ensures UI stability if the backend config is missing or incomplete.

---

### 3. Render the Filter Section

* Import the new filter component into `App.js`
* Add it to the UI layout alongside other transaction filters

---

### 4. Update MatchCard Display

**Location:** `ui/src/MatchCard.js`

* Add a display section defining how the transaction should appear when **expanded**
* Follow the notification-style format used for other transaction types

This controls:

* What users see in Live Matches
* How readable and scannable the transaction details are

---

## Notes & Best Practices

* Parser output defines **everything downstream** (filters, notifications, UI)
* Always keep field names consistent across:

  * Parser
  * Filters
  * Formatter
  * UI
* Start with minimal filtering logic and extend later
* Prefer adding new filter fields incrementally

---

**Made by Kabeer Sekhri**
