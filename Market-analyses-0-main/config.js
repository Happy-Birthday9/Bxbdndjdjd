/* =========================================================
   AI MARKET ANALYZER — CONFIG
========================================================= */
"use strict";

const CONFIG = {
  APP_NAME: "AI Market Analyzer",
  VERSION: "1.1.0",
  analysis: {
    maxAnalysisTime: 3500,
    autoStartAfterUpload: false,
    supportedImageTypes: ["image/jpeg","image/png","image/webp","image/jpg"],
    maxImageSizeMB: 10
  },
  api: {
    enabled: false,
    apiKey: "",
    endpoint: "",
    model: "",
    timeout: 9000
  },
  futureSignals: {
    count: 10,
    markets: [
      "EUR/USD","GBP/USD","USD/JPY","USD/CHF","AUD/USD","USD/CAD",
      "NZD/USD","EUR/GBP","EUR/JPY","GBP/JPY","XAU/USD","BTC/USD"
    ]
  },
  ui: { toastDuration: 3000, pageAnimation: true }
};

window.MARKET_ANALYZER_CONFIG = CONFIG;
