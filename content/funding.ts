export type Grant = {
  agency: string;
  institute: string;
  mechanism: string;
  title: string;
  amount: string;
  period?: string;
  role: string;
};

export const grants: Grant[] = [
  {
    agency: "NIH",
    institute: "National Institute on Aging",
    mechanism: "R01",
    title: "Discovery of first-in-class small molecule TREM2 ligands as therapeutics for Alzheimer's disease",
    amount: "$3.85M",
    period: "2024–2029",
    role: "Principal Investigator",
  },
  {
    agency: "NIH",
    institute: "National Institute of Diabetes and Digestive and Kidney Diseases",
    mechanism: "R01",
    title: "Optimization of small molecule immunomodulators as combination therapy for IBD",
    amount: "$3.31M",
    period: "2024–2029",
    role: "Principal Investigator",
  },
  {
    agency: "NIH",
    institute: "National Institute on Aging",
    mechanism: "RF1",
    title: "Small molecule inhibitors of CAPON-induced tau aggregation",
    amount: "$3.16M",
    period: "2024–2027",
    role: "Principal Investigator",
  },
  {
    agency: "NIH",
    institute: "National Institute of Neurological Disorders and Stroke",
    mechanism: "R01",
    title: "CHI3L1-targeted small molecules for glioblastoma",
    amount: "$2.54M",
    period: "2024–2029",
    role: "Principal Investigator",
  },
  {
    agency: "NIH",
    institute: "National Cancer Institute",
    mechanism: "R01",
    title: "Small molecule inhibitors of Slit2/Robo signaling as novel therapeutics for glioblastoma",
    amount: "$1.9M",
    role: "Principal Investigator",
  },
  {
    agency: "American Cancer Society",
    institute: "Discovery Boost Grant",
    mechanism: "Foundation",
    title: "Small molecule TIM-3 inhibition for acute myeloid leukemia",
    amount: "—",
    period: "2023–2024",
    role: "Principal Investigator",
  },
  {
    agency: "Elsa U. Pardee Foundation",
    institute: "Elsa U. Pardee Foundation",
    mechanism: "Foundation",
    title: "LAG-3 inhibitors for non-small cell lung cancer",
    amount: "—",
    period: "2023–2024",
    role: "Principal Investigator",
  },
];

export const trainingTimeline = [
  {
    period: "2026 –",
    title: "Associate Professor of Radiology",
    org: "Columbia University Irving Medical Center",
    detail: "Director of Molecular Imaging and Therapeutics Research.",
  },
  {
    period: "2021 – 2026",
    title: "Assistant → Associate Professor of Chemistry in Radiology",
    org: "Weill Cornell Medicine",
    detail: "Molecular Imaging Innovations Institute (MI3); founded the Gabr Laboratory.",
  },
  {
    period: "2019 – 2021",
    title: "Postdoctoral Fellow, Department of Radiology",
    org: "Stanford University",
    detail: "Molecular imaging with Sanjiv Sam Gambhir.",
  },
  {
    period: "2019",
    title: "Ph.D. in Chemistry",
    org: "University of Iowa",
    detail: "Fluorescent probes, medicinal chemistry and chemical biology.",
  },
  {
    period: "2014 / 2011",
    title: "M.Sc. and B.Sc., Pharmaceutical Sciences",
    org: "Mansoura University, Egypt",
    detail: "Medicinal chemistry.",
  },
];
