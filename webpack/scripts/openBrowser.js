const open = require("open");

async function openBrowser(url) {
  await open(url, { app: ["google chrome", "--incognito"] });
}

module.exports = openBrowser;
