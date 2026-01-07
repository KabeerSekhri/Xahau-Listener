require("dotenv").config();

const config = require("../config/config.json");
const { startListener } = require("./ws/listener");
const { parseTransaction } = require("./parsers");
const { matches } = require("./rules/ruleEngine");
const { isDuplicate } = require("./storage/dedupe");
const { sendTelegram } = require("./notify/telegram");
const { sendEmail } = require("./notify/email");


startListener(async tx => {
  if (!config.transactionTypes.includes(tx.TransactionType)) return;

  const event = parseTransaction(tx);
  if (!event) return;

  if (!matches(event, config)) return;
  if (isDuplicate(event.hash)) return;

  console.log("🔥 Match:", event.type);

  if (config.notifications.telegram.enabled) {
    await sendTelegram(event);
  }
  if (config.notifications.email.enabled) {
    await sendEmail(event);
  }
});
