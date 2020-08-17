import { combineReducers } from 'redux';
import requestRecordReducer from './requestRecordReducer';

const Reducers = combineReducers({ requestRecord: requestRecordReducer });

export default Reducers;
