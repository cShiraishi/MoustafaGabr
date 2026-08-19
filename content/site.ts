/**
 * Single source of truth for identity, contact and navigation.
 * Edit this file (not the components) to update the site.
 */

export const site = {
  name: "Gabr Lab",
  longName: "Gabr Laboratory for Molecular Imaging & Therapeutics",
  pi: {
    name: "Moustafa T. Gabr",
    shortName: "Moustafa Gabr",
    credentials: "Ph.D.",
    title: "Associate Professor of Radiology",
    secondaryTitle: "Director of Molecular Imaging and Therapeutics Research",
    institution: "Columbia University Irving Medical Center",
    department: "Department of Radiology",
    since: "July 2026",
    email: "mog4005@med.cornell.edu",
    scholarId: process.env.NEXT_PUBLIC_SCHOLAR_ID ?? "hw7IDDoAAAAJ",
    orcid: "",
    twitter: "MT_Gabr",
    portrait: "/team/gabr.png",
  },
  tagline:
    "Small molecules that image and reprogram the immune response in cancer and neurodegeneration.",
  description:
    "The Gabr Lab designs first-in-class small molecules and PET imaging probes that read out and modulate immune signalling — from immune checkpoints in glioblastoma to microglial receptors in Alzheimer's disease.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://moustafagabr.vercel.app",
  address: {
    lines: ["Department of Radiology", "Columbia University Irving Medical Center", "New York, NY 10032"],
  },
  links: {
    scholar: "https://scholar.google.com/citations?user=hw7IDDoAAAAJ&hl=en",
    twitter: "https://x.com/MT_Gabr",
    columbia: "https://www.columbiaradiology.org/",
    pubmed:
      "https://pubmed.ncbi.nlm.nih.gov/?term=Gabr+MT%5BAuthor%5D&sort=date",
    linkedin: "",
  },
} as const;

export const nav = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/join", label: "Join Us" },
  { href: "/contact", label: "Contact" },
] as const;

/** Headline numbers shown on the home page. Citation metrics come from Scholar at runtime. */
export const highlights = [
  { value: "5", label: "Active NIH awards", detail: "NCI · NIA · NINDS · NIDDK" },
  { value: "$14.8M", label: "Federal funding", detail: "As principal investigator" },
  { value: "120+", label: "Peer-reviewed papers", detail: "Medicinal chemistry & imaging" },
] as const;
