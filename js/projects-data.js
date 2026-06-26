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
      "This project applies a complete single-cell RNA-seq pipeline to 240,651 microglial transcriptomes from 84 post-mortem donors, quantifying how microglia (brain immune cells) shift between homeostatic and disease-associated programs (DAM) across Alzheimer's disease. Using curated DAM and homeostatic gene signatures across 8 annotated cell supertypes, the analysis links DAM activation to dementia status (Spearman ρ = 0.252, p = 0.021), recovering the canonical transition signature with APOE/SPP1 upregulation and P2RY12/CX3CR1 downregulation. A donor-level pseudobulk differential expression analysis on raw UMI counts identified 46 upregulated and 23 downregulated genes.",
    tags: ["Scanpy", "Numpy", "Scipy", "Matplotlib", "Seaborn"],
    link: "https://github.com/wnguyen36/seaad-microglia-analysis",
    linkLabel: "View on GitHub",
    image: "assets/seaad_analysis_pic.png" 
  },
  {
    slug: "iv-failure-mode-detection",
    title: "Multisensor IV Failure-Mode Detection & Monitoring System",
    year: "2026",
    blurb: "Developed a low-cost, multi-sensor attachment for gravity-based IV systems that detects and classifies three failure modes",
    description:
      "A longer paragraph for the full projects page. Explain the problem you " +
      "solved, what you built, and the outcome.",
    tags: ["C++", "Arduino", "React"],
    link: "https://github.com/wnguyen36/IIIV",
    linkLabel: "View on GitHub",
    image: ""
  },
  {
    slug: "project-three",
    title: "Project Three",
    year: "2026",
    blurb: "A short one-line description of what this project is and why it matters.",
    description:
      "A longer paragraph for the full projects page. Explain the problem you " +
      "solved, what you built, and the outcome.",
    tags: ["TypeScript", "Next.js"],
    link: "https://yourproject.com",
    linkLabel: "Live site",
    image: ""
  },
  {
    slug: "project-four",
    title: "Project Four",
    year: "2026",
    blurb: "A short one-line description of what this project is and why it matters.",
    description:
      "A longer paragraph for the full projects page. Explain the problem you " +
      "solved, what you built, and the outcome.",
    tags: ["Swift", "Core Data"],
    link: "https://github.com/yourhandle/project-four",
    linkLabel: "View on GitHub",
    image: ""
  }
];

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
