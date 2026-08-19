export type NewsItem = {
  date: string; // ISO
  title: string;
  body: string;
  tag: "Lab" | "Award" | "Paper" | "Grant" | "Talk";
  href?: string;
};

export const news: NewsItem[] = [
  {
    date: "2026-07-01",
    title: "The lab joins Columbia Radiology",
    body:
      "Dr. Gabr joins the Department of Radiology at Columbia University Irving Medical Center as Associate Professor of Radiology and Director of Molecular Imaging and Therapeutics Research.",
    tag: "Lab",
    href: "https://www.columbiaradiology.org/news/moustafa-gabr-join-columbia-radiology",
  },
  {
    date: "2026-02-01",
    title: "AI-assisted discovery of small-molecule TREM2 agonists",
    body:
      "Cho et al. report TREM2 agonists with functional microglial activity in ACS Medicinal Chemistry Letters, pairing machine-learned triage with cell-based validation.",
    tag: "Paper",
    href: "https://scholar.google.com/citations?user=hw7IDDoAAAAJ&hl=en",
  },
  {
    date: "2025-11-10",
    title: "As48: a dual-function TREM2 modulator",
    body:
      "A first-in-class compound that both activates TREM2 and inhibits its shedding, published in Biomedicine & Pharmacotherapy.",
    tag: "Paper",
  },
  {
    date: "2025-06-15",
    title: "CHI3L1-targeted small molecules advance in glioblastoma models",
    body:
      "Virtual screening, biophysical validation and pharmacokinetic profiling deliver a chemical series active in 3D glioblastoma models (European Journal of Medicinal Chemistry).",
    tag: "Paper",
  },
  {
    date: "2024-09-01",
    title: "Five NIH grants totalling $14.8 million",
    body:
      "Awards from NCI, NIA, NINDS and NIDDK fund the lab's glioblastoma, Alzheimer's disease and IBD programmes.",
    tag: "Grant",
    href: "https://radiology.weill.cornell.edu/news/moustafa-gabr-phd-receives-five-nih-grants-totaling-148-million",
  },
];
