// main.js — homepage

// The hero is always visible on load, so reveal it once immediately
// instead of routing it through the scroll-triggered IntersectionObserver.
// That observer's rootMargin is viewport-relative, and on mobile the
// address bar resizes window.innerHeight by ~50-60px while scrolling —
// which sits right where the hero's bottom edge falls, so its
// intersection ratio was flickering across the threshold and re-firing
// the reveal transition on every resize.
requestAnimationFrame(() => {
  document.querySelectorAll(".intro [data-reveal]").forEach((el) => el.classList.add("is-revealed"));
});

// Build a project card from a data object.
// Shared shape so homepage + projects page look identical.
function buildCard(p) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.setAttribute("data-reveal", "");
  card.setAttribute("data-reveal-manual", "");

  const img = p.image
    ? `<img class="project-card__img" src="${p.image}" alt="${p.title}" />`
    : "";

  const tags = p.tags.map(t => `<span>${t}</span>`).join("");

  const link = p.link
    ? `<a class="project-card__link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || "View"} →</a>`
    : "";

  const { isLong, short } = splitDescription(p.blurb);

  card.innerHTML = `
    ${img}
    <div class="project-card__top">
      <h3 class="project-card__title">${p.title}</h3>
      <span class="project-card__year">${p.year}</span>
    </div>
    <p class="project-card__desc">${isLong ? short : p.blurb}</p>
    ${isLong ? '<button type="button" class="project-card__readmore">Read more</button>' : ""}
    <div class="project-card__tags">${tags}</div>
    ${link}
  `;

  if (isLong) {
    const desc = card.querySelector(".project-card__desc");
    const btn = card.querySelector(".project-card__readmore");
    let expanded = false;
    btn.addEventListener("click", () => {
      Reveal.flip(card.parentElement, () => {
        expanded = !expanded;
        desc.textContent = expanded ? p.blurb : short;
        btn.textContent = expanded ? "Read less" : "Read more";
        card.classList.toggle("project-card--expanded", expanded);
      });
    });
  }

  return card;
}

// Homepage shows only the first 2 projects.
const preview = document.getElementById("projectsPreview");
if (preview) {
  PROJECTS.slice(0, 2).forEach(p => preview.appendChild(buildCard(p)));
  Reveal.staggerChildren(preview);
}

// Stagger the contact list items so they cascade in one after another.
const contactList = document.getElementById("contactList");
if (contactList) Reveal.staggerChildren(contactList);

// Hide the photo placeholder once a real image loads.
const photo = document.getElementById("profilePhoto");
if (photo && photo.getAttribute("src")) {
  photo.addEventListener("load", () => {
    const ph = document.querySelector(".intro__photo-placeholder");
    if (ph) ph.style.display = "none";
  });
}

// Rotate "Hello" through native scripts every few seconds, sliding
// downward as one word scrolls out and the next scrolls in underneath.
const GREETINGS = [
  "Hello!",      // English
  "你好!",        // Chinese
  "こんにちは!",    // Japanese
  "안녕하세요!",    // Korean
  "Xin chào!",   // Vietnamese
  "Ciao!",       // Italian
  "Hola!",       // Spanish
  "Bonjour!",    // French
  "Hallo!",      // German
  "Привет!",     // Russian
  "مرحباً!",      // Arabic
];

const greetingWord = document.getElementById("greetingWord");
if (greetingWord) {
  const ROTATE_MS = 3000;
  const TRANSITION_MS = 500;
  let current = 0; // GREETINGS starts on "Hello"

  function nextGreetingIndex() {
    let i = Math.floor(Math.random() * GREETINGS.length);
    while (i === current && GREETINGS.length > 1) {
      i = Math.floor(Math.random() * GREETINGS.length);
    }
    return i;
  }

  setInterval(() => {
    current = nextGreetingIndex();
    greetingWord.classList.add("intro__greeting-word--out");

    setTimeout(() => {
      greetingWord.textContent = GREETINGS[current];
      // Jump above the viewport with transitions off, then let the
      // normal transition carry it back down into place.
      greetingWord.style.transitionDuration = "0s";
      greetingWord.classList.remove("intro__greeting-word--out");
      greetingWord.classList.add("intro__greeting-word--in");
      void greetingWord.offsetWidth; // force reflow
      greetingWord.style.transitionDuration = "";
      greetingWord.classList.remove("intro__greeting-word--in");
    }, TRANSITION_MS);
  }, ROTATE_MS);
}
