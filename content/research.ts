export type ResearchArea = {
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  points: string[];
  targets: string[];
};

export const researchAreas: ResearchArea[] = [
  {
    slug: "immune-checkpoints",
    kicker: "Cancer immunotherapy",
    title: "Small-molecule immune checkpoint modulation",
    summary:
      "Antibodies dominate checkpoint blockade, but they cannot reach intracellular compartments, the CNS, or a solid-tumour core. We build drug-like molecules that disrupt checkpoint protein–protein interfaces directly.",
    points: [
      "TR-FRET and biophysical screening cascades purpose-built for checkpoint interfaces, including the first high-throughput LAG-3/FGL1 assay.",
      "Covalent and cyclic-peptide chemotypes against CD28, ICOS/ICOS-L and TIM-3.",
      "Structure-guided optimisation coupled to functional readouts in primary immune cells.",
    ],
    targets: ["LAG-3 / FGL1", "CD28", "ICOS / ICOS-L", "TIM-3"],
  },
  {
    slug: "glioblastoma",
    kicker: "Neuro-oncology",
    title: "Reversing immune evasion in glioblastoma",
    summary:
      "Glioblastoma builds an immunosuppressive microenvironment that antibody therapeutics cannot cross. We target the axes that recruit and re-educate tumour-associated macrophages.",
    points: [
      "First-in-class inhibitors of SLIT2/ROBO signalling as a macrophage-directed immunotherapy.",
      "CHI3L1-targeted chemical series advanced from virtual screening through biophysical validation, pharmacokinetics and 3D glioblastoma models.",
      "Paired PET probes so that target engagement can be measured in vivo, not inferred.",
    ],
    targets: ["SLIT2 / ROBO1", "CHI3L1", "Tumour-associated macrophages"],
  },
  {
    slug: "neurodegeneration",
    kicker: "Alzheimer's disease",
    title: "Chemical control of microglia and tau",
    summary:
      "Neuroinflammation is a driver, not a bystander. We develop brain-penetrant modulators of microglial receptors and of the protein interactions that seed tau pathology.",
    points: [
      "AI-assisted discovery of small-molecule TREM2 agonists with functional microglial activity.",
      "As48, a first-in-class dual-function TREM2 modulator combining receptor activation with shedding inhibition.",
      "Inhibitors of CAPON-induced tau aggregation targeting a protein–protein interface rather than the aggregate.",
    ],
    targets: ["TREM2", "CAPON / nNOS", "Tau"],
  },
  {
    slug: "microbiota-immunity",
    kicker: "Host–microbiome axis",
    title: "Drugging the microbial metabolism that shapes immunity",
    summary:
      "Gut microbial enzymes metabolise host and dietary substrates into metabolites that tune systemic immunity. Selectively silencing those enzymes is a therapeutic lever that spares the host proteome.",
    points: [
      "Non-lethal inhibitors of anaerobic choline metabolism by human gut microbiota.",
      "Small-molecule immunomodulators optimised as combination therapy for inflammatory bowel disease.",
      "Chemical probes that separate microbial from host enzymology in vivo.",
    ],
    targets: ["Choline TMA-lyase", "Microbial metabolites", "Mucosal immunity"],
  },
  {
    slug: "molecular-imaging",
    kicker: "Translational imaging",
    title: "PET probes that report on immune state",
    summary:
      "A therapeutic programme is only as good as its readout. Every therapeutic campaign in the lab is paired with a radiochemistry effort that turns the same pharmacophore into an imaging agent.",
    points: [
      "Radiolabelled ligands for immune checkpoints and microglial receptors.",
      "Imaging-guided dose and schedule selection ahead of IND-enabling studies.",
      "Chemistry designed from the outset for both a therapeutic and a tracer endpoint.",
    ],
    targets: ["PET radiochemistry", "Immuno-PET", "Neuroinflammation imaging"],
  },
  {
    slug: "ai-driven-discovery",
    kicker: "Computation",
    title: "AI-driven and structure-based discovery",
    summary:
      "Virtual screening, generative design and machine-learned scoring compress the search space — then biophysics decides. The lab treats computation as a hypothesis generator held to an experimental standard.",
    points: [
      "Machine-learning triage over multi-million-compound libraries with orthogonal biophysical confirmation.",
      "Molecular dynamics and structural modelling of shallow protein–protein interfaces.",
      "Closed loops between predicted and measured affinity, selectivity and functional activity.",
    ],
    targets: ["Virtual screening", "Generative design", "Free-energy methods"],
  },
];
