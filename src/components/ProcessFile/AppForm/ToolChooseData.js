export const predictionTools = [
  {
    label: 'miRAlign',
    value: 'miralign',
    selected: false,
    disabled: true
  },
  {
    label: 'Profile-Based Method',
    value: 'profile-based',
    selected: false,
    disabled: true
  },
  {
    label: 'miRiam',
    value: 'miriam',
    selected: false,
    disabled: true
  },
  {
    label: 'PlantMiRNAPred',
    value: 'plantmirnapred',
    selected: false,
    disabled: true
  },
  {
    label: 'MiRPara',
    value: 'mirpara',
    selected: false,
    disabled: true
  },
  {
    label: 'MaturPred',
    value: 'maturpred',
    selected: false,
    disabled: true
  },
  {
    label: 'FOMmiR',
    value: 'fommir',
    selected: false,
    disabled: true
  },
  {
    label: 'MiRmat',
    value: 'mirmat',
    selected: false,
    disabled: true
  },
  {
    label: 'miRNA_Targets',
    value: 'mirnatargets',
    selected: false,
    disabled: true
  },
  {
    label: 'Mirinho',
    value: 1,
    selected: false,
    disabled: false
  },
  {
    label: 'MIRZA-G',
    value: 'mirzag',
    selected: false,
    disabled: true
  },
  {
    label: 'miRBoost',
    value: 2,
    selected: false,
    disabled: false
  },
  {
    label: 'miREval',
    value: 'mireval',
    selected: false,
    disabled: true
  },
  {
    label: 'miRNAFold',
    value: 'mirnafold',
    selected: false,
    disabled: true
  }
];

export const getSelectedTools = tools => {
  return tools.filter(tool => tool.selected === true);
};

export const resetSelectedTools = () => {
  return predictionTools.forEach(tool => {
    tool.selected = false;
  });
};
