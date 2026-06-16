(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.getElementById("year").textContent = new Date().getFullYear();

  var loginTimeEl = document.getElementById("loginTime");
  if (loginTimeEl) {
    var now = new Date();
    loginTimeEl.textContent = now.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  var bootScreen = document.getElementById("bootScreen");
  var bootLinesEl = document.getElementById("bootLines");
  var heroFinal = document.getElementById("heroFinal");

  var bootSequence = [
    "$ ssh arnav@batra.dev",
    "Connecting...",
    "Authenticating... ok",
    "Loading profile: cs / data-science / economics",
    "Mounting ~/experience ~/projects ~/skills",
    "whoami"
  ];

  function showFinal() {
    bootScreen.hidden = true;
    heroFinal.hidden = false;
  }

  if (prefersReducedMotion || !bootScreen || !bootLinesEl || !heroFinal) {
    if (bootScreen) bootScreen.hidden = true;
    if (heroFinal) heroFinal.hidden = false;
    return;
  }

  var lineIndex = 0;
  var charIndex = 0;
  var renderedLines = [];

  function typeNextChar() {
    if (lineIndex >= bootSequence.length) {
      window.setTimeout(showFinal, 350);
      return;
    }

    var currentLine = bootSequence[lineIndex];

    if (charIndex === 0) {
      renderedLines.push("");
    }

    if (charIndex < currentLine.length) {
      renderedLines[lineIndex] = currentLine.slice(0, charIndex + 1);
      charIndex++;
      bootLinesEl.textContent = renderedLines.join("\n");
      window.setTimeout(typeNextChar, 18 + Math.random() * 22);
    } else {
      lineIndex++;
      charIndex = 0;
      window.setTimeout(typeNextChar, 220);
    }
  }

  typeNextChar();
})();
