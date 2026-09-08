/* =========================================================
   AI MARKET ANALYZER — FRONTEND CONTROLLER
========================================================= */
"use strict";

const APP_CONFIG = window.MARKET_ANALYZER_CONFIG || {};
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

let deferredInstallPrompt = null;
let toastTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  setupNavigation();
  setupFutureSignals();
  setupChartAnalysis("real");
  setupChartAnalysis("otc");
  setupInstallPrompt();
  setupReveal();
});

function setupMenu() {
  const menuBtn = $("#menuBtn");
  const menu = $("#sideMenu");
  const close = $("#closeMenuBtn");
  const overlay = $("#menuOverlay");

  const open = () => {
    menu?.classList.add("open");
    overlay?.classList.add("show");
    menuBtn?.classList.add("active");
    menuBtn?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const shut = () => {
    menu?.classList.remove("open");
    overlay?.classList.remove("show");
    menuBtn?.classList.remove("active");
    menuBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  menuBtn?.addEventListener("click", () =>
    menu?.classList.contains("open") ? shut() : open()
  );
  close?.addEventListener("click", shut);
  overlay?.addEventListener("click", shut);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") shut();
  });

  menuBtn?.setAttribute("aria-expanded", "false");
}

function setupNavigation() {
  const sections = {
    dashboard: $("#dashboardSection"),
    future: $("#futureSection"),
    real: $("#realSection"),
    otc: $("#otcSection"),
    settings: $("#settingsSection")
  };

  const activate = (name) => {
    if (!sections[name]) {
      console.warn(`Unknown section: ${name}`);
      return;
    }

    Object.entries(sections).forEach(([key, el]) => {
      if (el) el.classList.toggle("active-section", key === name);
    });

    $$(".menu-item").forEach(item => {
      item.classList.toggle("active", item.dataset.section === name);
    });

    $("#sideMenu")?.classList.remove("open");
    $("#menuOverlay")?.classList.remove("show");
    $("#menuBtn")?.classList.remove("active");
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  $$(".menu-item").forEach(item => {
    item.addEventListener("click", () => activate(item.dataset.section));
  });

  $$("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => activate(btn.dataset.go));
  });

  activate("dashboard");
}

function setupFutureSignals() {
  const button = $("#futureBtn");
  const market = $("#marketSelect");
  const timeframe = $("#futureTimeframe");
  const loading = $("#futureLoading");
  const result = $("#futureResult");
  const direction = $("#futureDirection");
  const confidence = $("#futureConfidence");
  const reason = $("#futureReason");
  const votes = $("#futureVotes");

  if (!button) return;

  button.addEventListener("click", () => {
    if (!market?.value) {
      showToast("Select a market", "Choose a market before generating a signal.");
      market?.focus();
      return;
    }

    button.disabled = true;
    loading.hidden = false;
    result.hidden = true;

    window.setTimeout(() => {
      const r = makeResult();
      direction.textContent = r.direction;
      direction.classList.toggle("down", r.direction === "DOWN");
      confidence.textContent = `${r.confidence}%`;
      reason.textContent =
        `${r.trend} structure with ${r.momentum.toLowerCase()} momentum. ` +
        `Observed setup: ${r.pattern}. This is a demo signal, not financial advice.`;

      votes.innerHTML = ["OpenAI","xAI","Google"].map((name, i) => {
        const d = i === 1 ? (r.direction === "UP" ? "DOWN" : "UP") : r.direction;
        return `<div class="vote"><span>${name}</span><b>${d}</b></div>`;
      }).join("");

      loading.hidden = true;
      result.hidden = false;
      button.disabled = false;
      showToast("Signal ready", `${r.direction} • ${r.confidence}% confidence (demo)`);
    }, 1200);
  });
}

function setupChartAnalysis(type) {
  const prefix = type === "real" ? "real" : "otc";
  const input = $(`#${prefix}ChartInput`);
  const area = $(`#${prefix}UploadArea`);
  const preview = $(`#${prefix}Preview`);
  const image = $(`#${prefix}PreviewImage`);
  const remove = $(`#remove${prefix[0].toUpperCase()+prefix.slice(1)}Image`);
  const button = $(`#${prefix}AnalyzeBtn`);
  const loading = $(`#${prefix}Loading`);
  const result = $(`#${prefix}Result`);
  const direction = $(`#${prefix}Direction`);
  const confidence = $(`#${prefix}Confidence`);
  const reason = $(`#${prefix}Reason`);
  const votes = $(`#${prefix}Votes`);

  if (!input) return;

  const validate = file => {
    const allowed = APP_CONFIG.analysis?.supportedImageTypes ||
      ["image/jpeg","image/png","image/webp","image/jpg"];
    const max = (Number(APP_CONFIG.analysis?.maxImageSizeMB) || 10) * 1024 * 1024;

    if (!file) return "Please choose an image.";
    if (!allowed.includes(file.type)) return "Please use JPG, PNG or WEBP.";
    if (file.size > max) return "Image must be 10 MB or smaller.";
    return "";
  };

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    const error = validate(file);
    if (error) {
      input.value = "";
      showToast("Invalid image", error);
      return;
    }

    image.src = URL.createObjectURL(file);
    preview.hidden = false;
    area.style.display = "none";
    result.hidden = true;
    showToast("Chart selected", "Ready to analyze.");
  });

  remove?.addEventListener("click", () => {
    input.value = "";
    image.src = "";
    preview.hidden = true;
    area.style.display = "";
    result.hidden = true;
    loading.hidden = true;
    if (button) button.disabled = false;
  });

  button?.addEventListener("click", () => {
    if (!input.files?.[0]) {
      showToast("Upload a chart", "Choose a chart screenshot first.");
      area?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    button.disabled = true;
    loading.hidden = false;
    result.hidden = true;

    window.setTimeout(() => {
      const r = makeResult();
      direction.textContent = r.direction;
      direction.classList.toggle("down", r.direction === "DOWN");
      confidence.textContent = `${r.confidence}%`;
      reason.textContent =
        `${r.trend} trend, ${r.pattern} pattern and ${r.momentum.toLowerCase()} momentum. ` +
        `Demo result only — connect a secure backend/API for real model analysis.`;

      votes.innerHTML = ["OpenAI","xAI","Google"].map((name, i) => {
        const d = i === 2 ? (r.direction === "UP" ? "DOWN" : "UP") : r.direction;
        return `<div class="vote"><span>${name}</span><b>${d}</b></div>`;
      }).join("");

      loading.hidden = true;
      result.hidden = false;
      button.disabled = false;
      showToast("Analysis complete", `${r.direction} • ${r.confidence}% confidence (demo)`);
    }, Number(APP_CONFIG.analysis?.maxAnalysisTime) > 1000 ? 1600 : 1200);
  });
}

function makeResult() {
  const direction = Math.random() > 0.5 ? "UP" : "DOWN";
  const confidence = Math.floor(72 + Math.random() * 23);
  const trends = ["Bullish","Bearish","Sideways"];
  const patterns = ["Breakout","Engulfing","Support Bounce","Resistance Reject","Trend Continuation","Consolidation"];
  const momentum = ["Strong","Moderate","Weak"];

  return {
    direction,
    confidence,
    trend: trends[Math.floor(Math.random() * trends.length)],
    pattern: patterns[Math.floor(Math.random() * patterns.length)],
    momentum: momentum[Math.floor(Math.random() * momentum.length)]
  };
}

function showToast(title, message) {
  const toast = $("#toast");
  if (!toast) {
    console.info(title, message);
    return;
  }
  const t = $("#toastTitle"), m = $("#toastMessage");
  if (t) t.textContent = title;
  if (m) m.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"),
    Number(APP_CONFIG.ui?.toastDuration) || 3000);
}

function setupInstallPrompt() {
  const btn = $("#installBtn");
  if (!btn) return;

  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredInstallPrompt = e;
    btn.hidden = false;
  });

  btn.addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    btn.hidden = true;
  });
}

function setupReveal() {
  // Prevent broken/legacy CSS from affecting the current HTML.
  document.documentElement.classList.add("app-ready");
}
