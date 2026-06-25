// projects.js — full projects page

function buildFullCard(p) {
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

  // Full page uses the longer `description` if present, else falls back to blurb.
  const text = p.description || p.blurb;
  const { isLong, short } = splitDescription(text);

  card.innerHTML = `
    ${img}
    <div class="project-card__top">
      <h3 class="project-card__title">${p.title}</h3>
      <span class="project-card__year">${p.year}</span>
    </div>
    <p class="project-card__desc">${isLong ? short : text}</p>
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
        desc.textContent = expanded ? text : short;
        btn.textContent = expanded ? "Read less" : "Read more";
        card.classList.toggle("project-card--expanded", expanded);
      });
    });
  }

  return card;
}

const all = document.getElementById("projectsAll");
if (all) {
  PROJECTS.forEach(p => all.appendChild(buildFullCard(p)));
  Reveal.staggerChildren(all);
}
