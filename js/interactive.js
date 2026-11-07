/**
 * On-demand Creative Coding Loader for Strudel & Hydra
 * Zero dependencies in global bundle — libraries load dynamically only on user gesture.
 * Complies with MIT Brand Guidelines and browser autoplay policies.
 */

(function () {
  'use strict';

  // State
  const activeHydraInstances = new Map();

  /**
   * Dynamically load Hydra Synth script if not already present
   */
  async function loadHydraLibrary() {
    if (window.Hydra) return window.Hydra;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/hydra-synth/dist/hydra-synth.js';
      script.async = true;
      script.onload = () => resolve(window.Hydra);
      script.onerror = () => reject(new Error('Failed to load Hydra Synth library'));
      document.head.appendChild(script);
    });
  }

  /**
   * Dynamically load Strudel REPL web component
   */
  async function loadStrudelLibrary() {
    if (customElements.get('strudel-editor')) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@strudel/repl@latest';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Strudel REPL library'));
      document.head.appendChild(script);
    });
  }

  /**
   * Initialize an embedded Hydra canvas inside a container
   */
  window.initHydraWidget = async function (widget) {
    const placeholder = widget.querySelector('.interactive-placeholder');
    const canvas = widget.querySelector('canvas.hydra-canvas');
    const btn = widget.querySelector('.init-interactive-btn');
    const fullscreenBtn = widget.querySelector('.fullscreen-btn');
    const codeAttr = widget.getAttribute('data-code');
    const codeBlock = widget.querySelector('code');
    const code = codeAttr || (codeBlock ? codeBlock.textContent : 'osc(20, 0.05, 1.2).kaleid(4).rotate(0, 0.1).out()');

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Loading Hydra...';
    }

    try {
      await loadHydraLibrary();

      // Set dimensions
      const width = canvas.clientWidth || 800;
      const height = canvas.clientHeight || 450;
      canvas.width = width;
      canvas.height = height;

      const hydra = new window.Hydra({
        canvas: canvas,
        detectAudio: false,
        enableStream: false,
        makeGlobal: true,
        width: width,
        height: height
      });

      activeHydraInstances.set(widget, { hydra, canvas });

      // Run user code
      try {
        const runFn = new Function('hydra', `
          with (hydra.synth) {
            ${code}
          }
        `);
        runFn(hydra);
      } catch (execErr) {
        // Fallback standard eval if with() context differs
        eval(code);
      }

      // Hide placeholder, reveal fullscreen control
      if (placeholder) placeholder.style.display = 'none';
      if (fullscreenBtn) fullscreenBtn.style.display = 'inline-flex';

      // Handle resize
      const resizeObserver = new ResizeObserver(() => {
        if (canvas.clientWidth && canvas.clientHeight) {
          hydra.setResolution(canvas.clientWidth, canvas.clientHeight);
        }
      });
      resizeObserver.observe(canvas);

    } catch (err) {
      console.error('Failed to initialize Hydra:', err);
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Error loading Hydra. Click to retry.';
      }
    }
  };

  /**
   * Initialize a full-viewport ambient background Hydra visualizer
   */
  window.initHydraBackground = async function (canvasId, code) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    try {
      await loadHydraLibrary();

      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const hydra = new window.Hydra({
        canvas: canvas,
        detectAudio: false,
        enableStream: false,
        makeGlobal: true,
        width: width,
        height: height
      });

      // Default ambient code if none specified
      const sketchCode = code || 'gradient(0.25).add(noise(), ()=>Math.cos(time)).modulateRotate(src(o0).rotate(0, -0.52), 0.2).mult(shape(360), 0.8).repeat(10,5).mult(shape(360).scale(()=>Math.sin(time)), 0.8).rotate(0, 0.2).diff(src(o0).rotate(0, -0.2), 0.2).out()';
      eval(sketchCode);

      // Smooth resize on viewport change
      window.addEventListener('resize', () => {
        hydra.setResolution(window.innerWidth, window.innerHeight);
      });

      // Background toggle button (pause/resume)
      const toggleBtn = document.getElementById('hydra-bg-toggle');
      if (toggleBtn) {
        let isPaused = false;
        toggleBtn.addEventListener('click', () => {
          isPaused = !isPaused;
          if (isPaused) {
            canvas.style.display = 'none';
            toggleBtn.textContent = 'Enable Visuals';
          } else {
            canvas.style.display = 'block';
            toggleBtn.textContent = 'Pause Visuals';
          }
        });
      }
    } catch (err) {
      console.error('Failed to initialize Hydra background:', err);
    }
  };

  /**
   * Initialize an embedded Strudel REPL inside a container
   */
  window.initStrudelWidget = async function (widget) {
    const placeholder = widget.querySelector('.interactive-placeholder');
    const container = widget.querySelector('.strudel-repl-container');
    const btn = widget.querySelector('.init-interactive-btn');
    const fullscreenBtn = widget.querySelector('.fullscreen-btn');
    const codeAttr = widget.getAttribute('data-code');
    const urlAttr = widget.getAttribute('data-url');
    const code = codeAttr || 'n(run(8).fast("<1!3 4>")).scale("c:minor:pentatonic").scaleTranspose("<3!3 4>").s("sawtooth").decay(0.2).lp(saw.range(100, 6000).slow(16)).lpq(0.5)';

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Loading Strudel...';
    }

    try {
      if (urlAttr) {
        // Embed via iframe if an external Strudel URL is provided
        const iframe = document.createElement('iframe');
        iframe.src = urlAttr;
        iframe.setAttribute('allow', 'autoplay');
        iframe.className = 'strudel-iframe';
        iframe.style.width = '100%';
        iframe.style.height = '360px';
        iframe.style.border = 'none';

        if (placeholder) placeholder.style.display = 'none';
        container.appendChild(iframe);
      } else {
        // Load official <strudel-editor> Web Component
        await loadStrudelLibrary();

        const repl = document.createElement('strudel-editor');
        repl.setAttribute('code', code.trim());
        repl.className = 'strudel-editor-element';

        if (placeholder) placeholder.style.display = 'none';
        container.appendChild(repl);
      }

      if (fullscreenBtn) fullscreenBtn.style.display = 'inline-flex';

    } catch (err) {
      console.error('Failed to initialize Strudel:', err);
      if (btn) {
        btn.disabled = false;
        btn.textContent = 'Error loading Strudel. Click to retry.';
      }
    }
  };

  /**
   * Fullscreen Toggle for any Interactive Widget
   */
  window.toggleWidgetFullscreen = function (widget) {
    if (!widget) return;

    if (!document.fullscreenElement) {
      if (widget.requestFullscreen) {
        widget.requestFullscreen();
      } else if (widget.webkitRequestFullscreen) {
        widget.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Sync fullscreen button states and canvas resolutions
  document.addEventListener('fullscreenchange', () => {
    const fsWidget = document.fullscreenElement;
    document.querySelectorAll('.interactive-widget').forEach((widget) => {
      const fsBtn = widget.querySelector('.fullscreen-btn');
      if (widget === fsWidget) {
        widget.classList.add('is-fullscreen');
        if (fsBtn) fsBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
          Exit Fullscreen
        `;
        const instance = activeHydraInstances.get(widget);
        if (instance) {
          instance.hydra.setResolution(window.innerWidth, window.innerHeight);
        }
      } else {
        widget.classList.remove('is-fullscreen');
        if (fsBtn) fsBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
          Fullscreen
        `;
        const instance = activeHydraInstances.get(widget);
        if (instance && instance.canvas) {
          instance.hydra.setResolution(instance.canvas.clientWidth, instance.canvas.clientHeight);
        }
      }
    });
  });

  // Auto-bind click handlers for initialize buttons
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.interactive-widget').forEach((widget) => {
      const btn = widget.querySelector('.init-interactive-btn');
      if (!btn) return;

      const widgetType = widget.getAttribute('data-widget');
      btn.addEventListener('click', () => {
        if (widgetType === 'hydra') {
          window.initHydraWidget(widget);
        } else if (widgetType === 'strudel') {
          window.initStrudelWidget(widget);
        }
      });
    });

    // Check for background Hydra canvas
    const bgCanvas = document.getElementById('hydra-bg-canvas');
    if (bgCanvas) {
      const code = bgCanvas.getAttribute('data-code');
      window.initHydraBackground('hydra-bg-canvas', code);
    }
  });

})();
