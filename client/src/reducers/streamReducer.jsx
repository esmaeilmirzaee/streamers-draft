import _ from 'lodash';
import {
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from '../actions/types';

export default (state = [], action) => {
  if (action.type == CREATE_STREAM) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type == FETCH_STREAM) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type == EDIT_STREAM) {
    return { ...state, [action.payload.id]: action.payload };
  } else if (action.type == DELETE_STREAM) {
    return _.omit(state, action.payload);
  } else if (action.type == FETCH_STREAMS) {
    return { ...state, ..._.mapKeys(action.payload, 'id') };
  }
  return state;
};
