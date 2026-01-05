// src/notify/telegram.js

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function sendTelegram(event) {
  const text = `
🚨 ${event.type} detected
From: ${event.from}
To: ${event.to}
Amount: ${event.amount} ${event.currency}
Memo: ${event.memo || "—"}
Tx: https://explorer.xahau.network/tx/${event.hash}
`;

  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: text, // ← FIXED (you had "message" before)
      }),
    }
  );
}

console.log("fetch type:", typeof fetch);

module.exports = { sendTelegram };
