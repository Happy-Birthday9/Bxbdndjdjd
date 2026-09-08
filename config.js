/* =========================================================
   AI MARKET ANALYZER — MULTI AI CONFIG
   Gemini + OpenAI/ChatGPT + Grok/xAI
========================================================= */

"use strict";

const CONFIG = {

  /* -------------------------------------------------------
     APP
  ------------------------------------------------------- */

  APP_NAME: "AI Market Analyzer",
  VERSION: "2.0.0",

  /* -------------------------------------------------------
     GENERAL ANALYSIS
  ------------------------------------------------------- */

  analysis: {
    maxAnalysisTime: 35000,
    autoStartAfterUpload: false,

    supportedImageTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg"
    ],

    maxImageSizeMB: 10,

    temperature: 0.2,

    systemPrompt: `
You are an advanced financial market chart analyst.

Analyze the supplied trading chart carefully.

Your job is NOT to guarantee profit.

Identify:

1. Market / asset
2. Timeframe
3. Current market structure
4. Trend direction
5. Support levels
6. Resistance levels
7. Candlestick behavior
8. Momentum
9. Possible breakout / rejection
10. Bullish scenario
11. Bearish scenario
12. Entry zone
13. Stop-loss zone
14. Take-profit zones
15. Confidence percentage
16. Risk level

If the chart is unclear, say so.

Never invent exact prices that cannot be reasonably read from the chart.

Return a clear, structured analysis.

Always include a risk warning.

This is educational market analysis, not guaranteed financial advice.
`
  },


  /* -------------------------------------------------------
     API MODE
     
     "direct" = browser calls provider directly
     "proxy"  = send request to your backend
  ------------------------------------------------------- */

  apiMode: "direct",


  /* =======================================================
     PROVIDERS
  ======================================================= */

  providers: {


    /* =====================================================
       GOOGLE GEMINI
    ===================================================== */

    gemini: {

      enabled: true,

      name: "Google Gemini",

      apiKey: "",

      endpoint:
        "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",

      model:
        "gemini-2.5-flash",

      timeout: 35000,

      temperature: 0.2,

      maxOutputTokens: 3000
    },


    /* =====================================================
       OPENAI / CHATGPT
    ===================================================== */

    openai: {

      enabled: true,

      name: "OpenAI / ChatGPT",

      apiKey: "",

      endpoint:
        "https://api.openai.com/v1/responses",

      model:
        "gpt-5",

      timeout: 35000,

      temperature: 0.2,

      maxOutputTokens: 3000
    },


    /* =====================================================
       GROK / xAI
    ===================================================== */

    grok: {

      enabled: true,

      name: "Grok / xAI",

      apiKey: "",

      endpoint:
        "https://api.x.ai/v1/responses",

      model:
        "grok-4.6",

      timeout: 35000,

      temperature: 0.2,

      maxOutputTokens: 3000
    }

  },


  /* =======================================================
     DEFAULT PROVIDER
  ======================================================= */

  defaultProvider: "gemini",


  /* =======================================================
     MULTI AI MODE
     
     false:
       One selected AI analyzes the chart.

     true:
       All enabled AIs analyze the chart and the system
       combines their results.
  ======================================================= */

  multiAI: true,


  /* =======================================================
     PROVIDER ORDER
  ======================================================= */

  providerOrder: [
    "gemini",
    "openai",
    "grok"
  ],


  /* =======================================================
     FUTURE SIGNALS
  ======================================================= */

  futureSignals: {

    count: 10,

    markets: [
      "EUR/USD",
      "GBP/USD",
      "USD/JPY",
      "USD/CHF",
      "AUD/USD",
      "USD/CAD",
      "NZD/USD",
      "EUR/GBP",
      "EUR/JPY",
      "GBP/JPY",
      "XAU/USD",
      "BTC/USD"
    ],

    timeframes: [
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "4h"
    ]
  },


  /* =======================================================
     OTC
  ======================================================= */

  otc: {

    enabled: true,

    markets: [
      "EUR/USD OTC",
      "GBP/USD OTC",
      "USD/JPY OTC",
      "AUD/USD OTC",
      "USD/CAD OTC",
      "XAU/USD OTC"
    ],

    defaultTimeframe: "1m"
  },


  /* =======================================================
     UI
  ======================================================= */

  ui: {

    toastDuration: 3000,

    pageAnimation: true,

    showProviderName: true,

    showConfidence: true,

    showRiskWarning: true
  }

};


/* =========================================================
   GLOBAL CONFIG
========================================================= */

window.MARKET_ANALYZER_CONFIG = CONFIG;


/* =========================================================
   BACKWARD COMPATIBILITY
========================================================= */

window.CONFIG = CONFIG;
