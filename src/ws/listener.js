const WebSocket = require("ws");

function startListener(onTx) {
  const ws = new WebSocket(process.env.XAH_WS);

  ws.on("open", () => {
    console.log("🟢 Connected to Xahau WS");

    ws.send(JSON.stringify({
      command: "subscribe",
      streams: ["transactions"]
    }));
  });

  ws.on("message", msg => {
    try {
      const data = JSON.parse(msg);
      if (data.transaction) {
        onTx(data.transaction);
      }
    } catch (e) {
      console.error("WS parse error:", e.message);
    }
  });

  ws.on("close", () => {
    console.log("🔴 WS closed — reconnecting in 3s");
    setTimeout(() => startListener(onTx), 3000);
  });
}

module.exports = { startListener };
