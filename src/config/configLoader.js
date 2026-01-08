const fs = require("fs");
const path = require("path");

const CONFIG_PATH = path.join(__dirname, "../../config/config.json");

let cachedConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

function getConfig() {
  return cachedConfig;
}

function updateConfig(newConfig) {
  cachedConfig = newConfig;
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(newConfig, null, 2));
}

module.exports = { getConfig, updateConfig };
