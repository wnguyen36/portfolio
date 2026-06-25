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

  // Animates a layout-changing mutation (e.g. a grid item expanding into a
  // full row) by snapshotting every sibling's rect before/after the change,
  // then transitioning away the delta — so cards slide/resize smoothly into
  // their new spots instead of snapping when the grid reflows.
  function flip(container, mutate) {
    const items = Array.from(container.children);
    const before = items.map((el) => el.getBoundingClientRect());

    mutate();

    // Measure every item's post-mutation rect *before* overriding any of
    // them — overriding one item's size earlier would itself perturb the
    // grid layout and corrupt the rects measured for the items after it.
    const deltas = items.map((el, i) => {
      const from = before[i];
      const to = el.getBoundingClientRect();
      return {
        dx: from.left - to.left,
        dy: from.top - to.top,
        w: from.width,
        h: from.height,
        changed: from.left !== to.left || from.top !== to.top || from.width !== to.width || from.height !== to.height,
      };
    });

    items.forEach((el, i) => {
      const d = deltas[i];
      if (!d.changed) return;
      el.style.transition = "none";
      el.style.transform = `translate(${d.dx}px, ${d.dy}px)`;
      el.style.width = `${d.w}px`;
      el.style.height = `${d.h}px`;
      el.style.overflow = "hidden";
    });

    requestAnimationFrame(() => {
      items.forEach((el, i) => {
        if (!deltas[i].changed) return;
        el.style.transition =
          "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.45s cubic-bezier(0.16, 1, 0.3, 1), height 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.transform = "";
        el.style.width = "";
        el.style.height = "";
      });
    });

    setTimeout(() => {
      items.forEach((el, i) => {
        if (!deltas[i].changed) return;
        el.style.transition = "";
        el.style.overflow = "";
      });
    }, 470);
  }

  window.Reveal = { reveal, staggerChildren, flip };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-reveal]:not([data-reveal-manual])").forEach(reveal);
  });
})();
