import { Types } from './actionTypes';

export const selectTool = selectedTools => ({
  type: Types.UPDATE_SELECTED_TOOLS,
  selectedTools
});

export const selectFile = file => ({
  type: Types.UPDATE_FASTA_FILE,
  file
});
