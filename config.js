/* =========================================================
   AI MARKET ANALYZER — MULTI AI CONFIG
   Gemini + OpenAI/ChatGPT + DeepSeek
========================================================= */

"use strict";

const CONFIG = {

  /* -------------------------------------------------------
     APP
  ------------------------------------------------------- */

  APP_NAME: "AI Market Analyzer",
  VERSION: "3.0.0",


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

Never invent exact prices that cannot be reasonably
read from the chart.

Consider:

- Market structure
- Higher highs / lower highs
- Higher lows / lower lows
- Support and resistance
- Breakout
- Fake breakout
- Rejection
- Candlestick patterns
- Momentum
- Trend strength
- Possible liquidity areas

Return a clear and structured analysis.

Use this general format:

MARKET:
TIMEFRAME:

TREND:
STRUCTURE:

SUPPORT:
RESISTANCE:

MOMENTUM:

BULLISH SCENARIO:
BEARISH SCENARIO:

SIGNAL:
BUY / SELL / HOLD / UNCLEAR

ENTRY ZONE:

STOP LOSS:

TAKE PROFIT:

CONFIDENCE:
RISK LEVEL:

REASON:

Always include a risk warning.

This is educational market analysis,
not guaranteed financial advice.
`
  },


  /* -------------------------------------------------------
     API MODE

     direct = browser directly calls AI provider

     proxy = request goes through your backend

     IMPORTANT:
     Direct mode exposes API keys in frontend.
     Use proxy mode for production.
  ------------------------------------------------------- */

  apiMode: "direct",


  /* =======================================================
     AI PROVIDERS
  ======================================================= */

  providers: {


    /* =====================================================
       1. GOOGLE GEMINI
    ===================================================== */

    gemini: {

      enabled: true,

      name: "Google Gemini",

      apiKey: "AQ.Ab8RN6JhLtEIjQk7jfyymlkZywxGaIbGVdD8dKEDFDpV9IYuaw",

      endpoint:
        "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent",

      model:
        "gemini-2.5-flash",

      timeout:
        35000,

      temperature:
        0.2,

      maxOutputTokens:
        3000
    },


    /* =====================================================
       2. OPENAI / CHATGPT
    ===================================================== */

    openai: {

      enabled: true,

      name: "OpenAI / ChatGPT",

      apiKey: "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",

      endpoint:
        "https://api.openai.com/v1/responses",

      model:
        "gpt-5",

      timeout:
        35000,

      temperature:
        0.2,

      maxOutputTokens:
        3000
    },


    /* =====================================================
       3. DEEPSEEK
    ===================================================== */

    deepseek: {

      enabled: true,

      name: "DeepSeek",

      apiKey: "sk-f8c41f5b19b54bb7a92a5507a85dd22f",

      endpoint:
        "https://api.deepseek.com",

      model:
        "deepseek-chat",

      timeout:
        35000,

      temperature:
        0.2,

      maxOutputTokens:
        3000
    }

  },


  /* =======================================================
     DEFAULT PROVIDER

     If multiAI = false,
     this provider will analyze the chart.
  ======================================================= */

  defaultProvider:
    "gemini",


  /* =======================================================
     MULTI AI MODE

     true:
       Gemini + OpenAI + DeepSeek
       all analyze the chart.

     false:
       Only defaultProvider is used.
  ======================================================= */

  multiAI:
    true,


  /* =======================================================
     PROVIDER ORDER

     The system will use this order.
  ======================================================= */

  providerOrder: [

    "gemini",

    "openai",

    "deepseek"

  ],


  /* =======================================================
     MULTI AI CONSENSUS
  ======================================================= */

  consensus: {

    enabled: true,

    minimumProviders:
      2,

    showIndividualResults:
      true,

    showFinalConsensus:
      true,

    confidenceCalculation:
      "weighted-consensus"
  },


  /* =======================================================
     FUTURE SIGNALS
  ======================================================= */

  futureSignals: {

    count:
      10,

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

    enabled:
      true,

    markets: [

      "EUR/USD OTC",

      "GBP/USD OTC",

      "USD/JPY OTC",

      "AUD/USD OTC",

      "USD/CAD OTC",

      "XAU/USD OTC"

    ],

    defaultTimeframe:
      "1m"
  },


  /* =======================================================
     API RETRY
  ======================================================= */

  retry: {

    enabled:
      true,

    maxAttempts:
      2,

    delay:
      1000
  },


  /* =======================================================
     ERROR HANDLING
  ======================================================= */

  errors: {

    continueIfOneProviderFails:
      true,

    showProviderErrors:
      true,

    fallbackToDemo:
      true
  },


  /* =======================================================
     UI
  ======================================================= */

  ui: {

    toastDuration:
      3000,

    pageAnimation:
      true,

    showProviderName:
      true,

    showConfidence:
      true,

    showRiskWarning:
      true,

    showIndividualAIResults:
      true,

    showConsensus:
      true
  }

};


/* =========================================================
   GLOBAL CONFIG
========================================================= */

window.MARKET_ANALYZER_CONFIG =
  CONFIG;


/* =========================================================
   BACKWARD COMPATIBILITY
========================================================= */

window.CONFIG =
  CONFIG;
