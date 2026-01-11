// src/app.js
require("dotenv").config();

const { getConfig } = require("./config/configLoader");
const { startListener } = require("./ws/listener");
const { parseTransaction } = require("./parsers");
const { matches } = require("./rules/ruleEngine");
const { isDuplicate } = require("./storage/dedupe");
const { sendTelegram } = require("./notify/telegram");
const { sendEmail } = require("./notify/email");
const { broadcastMatch } = require("./server.js");



startListener(async tx => {
  const config = getConfig();
  
  // console.log("🔍 Evaluating:", tx.TransactionType); // Debug to check whats being passed through

  const event = parseTransaction(tx);
  if (!event) return;

  if (!matches(event, config)) return;
  if (isDuplicate(event.hash)) return;

  console.log("🔥 Match:", event.type);

  broadcastMatch(event);

  if (config.notifications.telegram.enabled) {
    await sendTelegram(event);
  }
  if (config.notifications.email.enabled) {
    await sendEmail(event);
  }
});
