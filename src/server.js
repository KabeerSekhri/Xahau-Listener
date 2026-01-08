const express = require("express");
const cors = require("cors");
const { getConfig, updateConfig } = require("./config/configLoader");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/config", (req, res) => {
  res.json(getConfig());
});

app.post("/config", (req, res) => {
  updateConfig(req.body);
  res.json({ status: "ok" });
});

app.listen(4000, () => {
  console.log("🟢 Config API running on http://localhost:4000");
});
