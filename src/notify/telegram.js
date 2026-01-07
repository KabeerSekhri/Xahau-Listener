// src/notify/telegram.js

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { formatEvent } = require("./msg_format") 

async function sendTelegram(event) {
  const text = formatEvent(event);

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
