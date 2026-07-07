// project.js — dedicated page for a single project, populated from
// PROJECTS (see projects-data.js) based on the ?slug= query param.

const params = new URLSearchParams(window.location.search);
const project = PROJECTS.find((p) => p.slug === params.get("slug"));

const content = document.getElementById("projectContent");

if (!project) {
  content.innerHTML = `
    <div class="section__head" data-reveal data-reveal-manual>
      <div>
        <h1 class="section__title">Project not found</h1>
        <p class="projects-page__sub">That project doesn't exist, or may have moved.</p>
      </div>
      <a href="projects.html" class="btn">← Back to projects</a>
    </div>
  `;
} else {
  document.title = `${project.title} — William Nguyen`;

  const images = getImages(project);
  const hasMedia = images.length || project.video;

  const tags = (project.tags || []).map((t) => `<span>${t}</span>`).join("");

  const link = project.link
    ? `<a class="project-card__link" href="${project.link}" target="_blank" rel="noopener">${project.linkLabel || "View"} →</a>`
    : "";

  const paragraphs = (project.description || project.blurb)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p class="project-page__desc">${line}</p>`)
    .join("");

  content.innerHTML = `
    <div class="section__head" data-reveal data-reveal-manual>
      <div>
        <h1 class="section__title">${project.title}</h1>
        <p class="project-page__meta">${project.year}</p>
      </div>
      <a href="projects.html" class="btn">← Back to projects</a>
    </div>
    ${hasMedia ? `<div class="project-page__hero" data-reveal data-reveal-manual id="_hero_slot"></div>` : ""}
    <div class="project-page__body" data-reveal data-reveal-manual>
      ${paragraphs}
      <div class="project-card__tags">${tags}</div>
      ${link}
    </div>
  `;

  if (hasMedia) {
    const heroEl = content.querySelector("#_hero_slot");
    heroEl.removeAttribute("id");
    if (images.length) {
      heroEl.appendChild(buildCarousel(images, project.title, { contain: !!project.imageContain }));
    }
    const video = buildVideo(project.video);
    if (video) heroEl.appendChild(video);
  }
}

Reveal.staggerChildren(content);
