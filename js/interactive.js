/**
 * On-demand Creative Coding Loader for Strudel & Hydra
 * Keeps global bundles light, only initializes when explicitly triggered by user.
 */

window.initHydraCanvas = async function(canvasId, initCode) {
  const container = document.getElementById(canvasId);
  if (!container) return;

  const btn = container.querySelector(".init-interactive-btn");
  if (btn) btn.disabled = true;

  try {
    // Dynamic import for Hydra Synth
    if (!window.Hydra) {
      await import("https://cdn.jsdelivr.net/npm/hydra-synth/dist/hydra-synth.js");
    }
    const canvas = container.querySelector("canvas");
    if (canvas && window.Hydra) {
      const hydra = new window.Hydra({ canvas, detectAudio: false });
      if (typeof initCode === "function") {
        initCode(hydra);
      }
      if (btn) btn.style.display = "none";
    }
  } catch (err) {
    console.error("Failed to load Hydra Synth:", err);
    if (btn) {
      btn.disabled = false;
      btn.innerText = "Error loading canvas";
    }
  }
};
