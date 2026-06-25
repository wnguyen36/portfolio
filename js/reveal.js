// reveal.js — scroll-triggered fade/slide reveal animations
// Elements with [data-reveal] fade + slide into view whenever they cross
// into the viewport, and reset when they scroll back out — so the
// animation replays on the way down AND on the way back up.
// data-reveal="left"/"right" change the slide direction (default is up).
// Use Reveal.staggerChildren() for elements injected dynamically
// (e.g. project cards) so siblings cascade in.

(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-revealed", entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  function reveal(el) {
    observer.observe(el);
  }

  // Observes every [data-reveal] child of `container`, staggering each
  // one's transition-delay so they cascade in rather than popping at once.
  function staggerChildren(container, selector = "[data-reveal]") {
    container.querySelectorAll(selector).forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 90, 450)}ms`;
      reveal(el);
    });
  }

  window.Reveal = { reveal, staggerChildren };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-reveal]:not([data-reveal-manual])").forEach(reveal);
  });
})();
