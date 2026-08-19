export type Member = {
  name: string;
  degree?: string;
  role: string;
  group: "pi" | "postdoc" | "student" | "alumni";
  focus?: string;
  photo?: string;
  links?: { label: string; href: string }[];
};

export const team: Member[] = [
  {
    name: "Moustafa T. Gabr",
    degree: "Ph.D.",
    role: "Principal Investigator",
    group: "pi",
    focus:
      "Associate Professor of Radiology and Director of Molecular Imaging and Therapeutics Research. Ph.D. in chemistry, University of Iowa; postdoctoral training in radiology at Stanford University with Sanjiv Sam Gambhir.",
    photo: "/team/gabr.png",
    links: [
      { label: "Google Scholar", href: "https://scholar.google.com/citations?user=hw7IDDoAAAAJ&hl=en" },
      { label: "X", href: "https://x.com/MT_Gabr" },
    ],
  },
  {
    name: "Laura Calvo Barreiro",
    degree: "Ph.D.",
    role: "Postdoctoral Associate",
    group: "postdoc",
    focus: "Immune tolerance and autoimmunity; peptide and small-molecule modulators of co-stimulatory receptors.",
  },
  {
    name: "Natalie Sabrina Fuchs",
    degree: "Ph.D.",
    role: "Postdoctoral Associate",
    group: "postdoc",
    focus: "Covalent chemistry against immune checkpoint interfaces.",
  },
  {
    name: "Longfei Zhang",
    degree: "Ph.D.",
    role: "Postdoctoral Associate",
    group: "postdoc",
    focus: "Molecular imaging and radiochemistry; PET probe development.",
  },
  {
    name: "Aikaterini Stavrou",
    degree: "M.S., Ph.D.",
    role: "Postdoctoral Research Associate",
    group: "postdoc",
    focus: "Oncology drug discovery and target validation.",
  },
];

export const groupLabels: Record<Member["group"], string> = {
  pi: "Principal Investigator",
  postdoc: "Postdoctoral Researchers",
  student: "Graduate & Undergraduate Students",
  alumni: "Alumni",
};
