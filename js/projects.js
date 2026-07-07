// projects.js — full projects page

function buildFullCard(p) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.setAttribute("data-reveal", "");
  card.setAttribute("data-reveal-manual", "");
  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `View project: ${p.title}`);

  const tags = (p.tags || []).map(t => `<span>${t}</span>`).join("");

  const link = p.link
    ? `<a class="project-card__link" href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || "View"} →</a>`
    : "";

  card.innerHTML = `
    <div class="project-card__top">
      <h3 class="project-card__title">${p.title}</h3>
      <span class="project-card__year">${p.year}</span>
    </div>
    <div class="project-card__tags">${tags}</div>
    ${link}
  `;

  const carousel = buildCarousel(getImages(p), p.title, { contain: !!p.imageContain });
  if (carousel) card.insertBefore(carousel, card.firstChild);

  goToProjectPage(card, p);

  return card;
}

const all = document.getElementById("projectsAll");
if (all) {
  PROJECTS.forEach(p => all.appendChild(buildFullCard(p)));
  Reveal.staggerChildren(all);
}
