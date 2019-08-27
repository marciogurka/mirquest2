export let predictionTools = [
  {
    name: "miRAlign",
    id: "miralign",
    selected: false,
    disabled: true
  },
  {
    name: "Profile-Based Method",
    id: "profile-based",
    selected: false,
    disabled: true
  },
  {
    name: "miRiam",
    id: "miriam",
    selected: false,
    disabled: true
  },
  {
    name: "PlantMiRNAPred",
    id: "plantmirnapred",
    selected: false,
    disabled: true
  },
  {
    name: "MiRPara",
    id: "mirpara",
    selected: false,
    disabled: true
  },
  {
    name: "MaturPred",
    id: "maturpred",
    selected: false,
    disabled: true
  },
  {
    name: "FOMmiR",
    id: "fommir",
    selected: false,
    disabled: true
  },
  {
    name: "MiRmat",
    id: "mirmat",
    selected: false,
    disabled: true
  },
  {
    name: "miRNA_Targets",
    id: "mirnatargets",
    selected: false,
    disabled: true
  },
  {
    name: "Mirinho",
    id: 1,
    selected: false,
    disabled: false
  },
  {
    name: "MIRZA-G",
    id: "mirzag",
    selected: false,
    disabled: true
  },
  {
    name: "miRBoost",
    id: 2,
    selected: false,
    disabled: false
  },
  {
    name: "miREval",
    id: "mireval",
    selected: false,
    disabled: true
  },
  {
    name: "miRNAFold",
    id: "mirnafold",
    selected: false,
    disabled: true
  }
];

export const getSelectedTools = (tools) => {
  return tools.filter(tool => tool.selected === true);
}
