export let predictionTools = [
  {
    name: "miRAlign",
    id: "miralign",
    selected: false
  },
  {
    name: "Profile-Based Method",
    id: "profile-based",
    selected: false
  },
  {
    name: "miRiam",
    id: "miriam",
    selected: false
  },
  {
    name: "PlantMiRNAPred",
    id: "plantmirnapred",
    selected: false
  },
  {
    name: "MiRPara",
    id: "mirpara",
    selected: false
  },
  {
    name: "MaturPred",
    id: "maturpred",
    selected: false
  },
  {
    name: "FOMmiR",
    id: "fommir",
    selected: false
  },
  {
    name: "MiRmat",
    id: "mirmat",
    selected: false
  },
  {
    name: "miRNA_Targets",
    id: "mirnatargets",
    selected: false
  },
  {
    name: "miRBoost",
    id: "mirboost",
    selected: false
  },
  {
    name: "miREval",
    id: "mireval",
    selected: false
  },
  {
    name: "miRNAFold",
    id: "mirnafold",
    selected: false
  }
];

export const getSelectedTools = (tools) => {
  return tools.filter(tool => tool.selected === true);
}
