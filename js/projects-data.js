// ============================================================
//  PROJECTS DATA — your single source of truth
//  Add, edit, or remove projects here. Both the homepage
//  preview and the full projects page read from this list.
//
//  • The FIRST 2 projects show on the homepage preview.
//  • ALL projects show on projects.html.
//  • To feature different projects on the homepage, just
//    reorder the array (top 2 = featured).
// ============================================================

const PROJECTS = [
  {
    slug: "seaad-transcriptomics",
    title: "SEA-AD Single-Cell Transcriptomics Analysis",
    year: "2026",
    blurb: "A scRNA-seq analysis of 240k microglia that quantifies how they shift into disease-associated activation states across Alzheimer's severity and genetic risk",
    
    
    description:
      "Created a complete single-cell RNA-seq pipeline to 240,651 microglial transcriptomes from 84 post-mortem donors, quantifying how microglia (brain immune cells) shift between homeostatic and disease-associated programs (DAM) across Alzheimer's disease. Using curated DAM and homeostatic gene signatures across 8 annotated cell supertypes, linking DAM activation to dementia status (Spearman ρ = 0.252, p = 0.021), recovering the canonical transition signature with APOE/SPP1 upregulation and P2RY12/CX3CR1 downregulation. Performed a donor-level pseudobulk differential expression analysis on raw UMI counts, identifying 46 upregulated and 23 downregulated genes.",
    

      tags: ["Scanpy", "AnnData", "Numpy", "Scipy", "pandas", "Matplotlib", "Seaborn", "Python"],
    link: "https://github.com/wnguyen36/seaad-microglia-analysis",
    linkLabel: "View on GitHub",
    //images: ["assets/seaad1.png", "assets/seaad2.png", "assets/seaad3.png", "assets/seaad4.png", "assets/seaad5.png", "assets/seaad6.png", "assets/seaad7.png", "assets/seaad8.png"]//
  },
  {
    slug: "iv-failure-mode-detection",
    title: "Multisensor IV Failure-Mode Detection & Monitoring System",
    year: "2026",
    blurb: "Developed a low-cost, multi-sensor attachment for gravity-based IV systems that detects and classifies three failure modes",


    description:
      "Built a low-cost, multisensor attachment (SL067, photoresistor) for gravity-based IV systems that detects and classifies three modes: occlusion, leakage, and normal flow. 


    tags: ["C++", "Arduino", "React"],
    link: "https://github.com/wnguyen36/IIIV",
    linkLabel: "View on GitHub",
    //images: ["assets/iiiv_demo_pic.png"],//
    imageContain: true
  },
  {
    slug: "injurfree-basketball",
    title: "InjurFree: Biomechanical Injury Prevention for Basketball Athletes",
    year: "2026",
    blurb: "Developed a functional prototype of a web application that analyzes basketball clips to detect injury-prone movements and provide feedback to athletes and coaches",


    description:
      "A longer paragraph for the full projects page. Explain the problem you " +
      "solved, what you built, and the outcome.",


    //tags: ["", ""],//
    link: "https://github.com/jaydendayal/injurfree",
    linkLabel: "View on GitHub",
    link: "https://devpost.com/software/injure-free", 
    linkLabel: "View our Devpost",
    //image: " "//
  },
  {
    slug: "tegaderm-redesign",
    title: "Skin-Sensitive Tegaderm Redesign",
    year: "2025",
    blurb: "Semester-long design and prototyping project to improve the Tegaderm (clear wound dressing) to be more accessible for patients with sensitive skin/eczema",
   
   
    description:
      "A longer paragraph for the full projects page. Explain the problem you " +
      "solved, what you built, and the outcome.",
    //tags: ["Figma", "Prototyping"],//
    //link: "",//


    linkLabel: "View the design report",
    //image: ""//
  }
];

// Normalises a project's image data to a flat array of URLs.
// Supports both `image: "single.png"` and `images: ["a.png", "b.png"]`.
function getImages(p) {
  if (Array.isArray(p.images) && p.images.length) return p.images.filter(Boolean);
  if (p.image && p.image.trim()) return [p.image.trim()];
  return [];
}

// Lazily creates a singleton lightbox overlay on the document body.
function getLightbox() {
  let lb = document.getElementById("_carousel_lightbox");
  if (lb) return lb;

  lb = document.createElement("div");
  lb.id = "_carousel_lightbox";
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.hidden = true;
  lb.innerHTML = `
    <button class="lightbox__close" aria-label="Close image">&#215;</button>
    <img class="lightbox__img" src="" alt="" />
  `;

  function close() {
    lb.hidden = true;
    document.body.style.overflow = "";
  }

  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) close(); });

  document.body.appendChild(lb);
  return lb;
}

// Builds a carousel DOM element for the given image list.
// Pass contain=true to use object-fit:contain (shows full image, no cropping).
// Returns null when images is empty.
function buildCarousel(images, altText, { contain = false } = {}) {
  if (!images || images.length === 0) return null;

  const el = document.createElement("div");
  el.className = contain ? "carousel carousel--contain" : "carousel";

  el.innerHTML = `
    <img class="carousel__img" src="${images[0]}" alt="${altText}" />
    ${images.length > 1 ? `
      <button class="carousel__btn carousel__btn--prev" aria-label="Previous image">&#8249;</button>
      <button class="carousel__btn carousel__btn--next" aria-label="Next image">&#8250;</button>
      <span class="carousel__counter">1 / ${images.length}</span>
    ` : ""}
  `;

  const img = el.querySelector(".carousel__img");

  img.addEventListener("click", (e) => {
    e.stopPropagation();
    const lb = getLightbox();
    lb.querySelector(".lightbox__img").src = img.src;
    lb.querySelector(".lightbox__img").alt = img.alt;
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lb.querySelector(".lightbox__close").focus();
  });

  if (images.length > 1) {
    let current = 0;
    const counter = el.querySelector(".carousel__counter");

    function go(delta) {
      current = (current + delta + images.length) % images.length;
      img.src = images[current];
      img.alt = `${altText} — image ${current + 1} of ${images.length}`;
      counter.textContent = `${current + 1} / ${images.length}`;

      const cls = delta > 0 ? "carousel__img--in-right" : "carousel__img--in-left";
      img.classList.remove("carousel__img--in-right", "carousel__img--in-left");
      void img.offsetWidth; // force reflow to restart animation
      img.classList.add(cls);
    }

    el.querySelector(".carousel__btn--prev").addEventListener("click", (e) => { e.stopPropagation(); go(-1); });
    el.querySelector(".carousel__btn--next").addEventListener("click", (e) => { e.stopPropagation(); go(1); });
  }

  return el;
}

// Wires up a project card so clicking (or pressing Enter/Space) navigates
// to that project's dedicated page. Clicks on the card's own external
// link are left alone so they open in their own tab as normal.
function goToProjectPage(card, p) {
  const url = `project.html?slug=${encodeURIComponent(p.slug)}`;

  card.addEventListener("click", (e) => {
    if (e.target.closest(".project-card__link")) return;
    window.location.href = url;
  });

  card.addEventListener("keydown", (e) => {
    if (e.target.closest(".project-card__link")) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = url;
    }
  });
}
