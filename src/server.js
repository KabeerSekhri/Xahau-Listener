const express = require("express");
const cors = require("cors");
const { getConfig, updateConfig } = require("./config/configLoader");
const { WebSocketServer } = require("ws");

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

const server = app.listen(4000, () => {
  console.log("🟢 Config API running on http://localhost:4000");
});

const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("🟣 UI connected");

  ws.on("close", () => {
    clients.delete(ws);
    console.log("🔴 UI disconnected");
  });
});

function broadcastMatch(match) {
  const message = JSON.stringify(match);

  for (const client of clients) {
    if (client.readyState === 1) {
      client.send(message);
    }
  }
}

module.exports = { broadcastMatch };