import { Types } from '~/store/actions/actionTypes';

const initialState = {
  selectedTools: [],
  file: null
};

const requestRecordReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_SELECTED_TOOLS:
      return {
        ...state,
        selectedTools: action.selectedTools
      };
    case Types.UPDATE_FASTA_FILE:
      return {
        ...state,
        file: action.file
      };
    default:
      return state;
  }
};

export default requestRecordReducer;
