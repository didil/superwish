import _ from 'lodash';

import {
  WISH_LOAD,
  WISH_LOAD_SUCCESS,
  WISH_LOAD_FAIL,
  WISH_CREATE,
  WISH_CREATE_SUCCESS,
  WISH_CREATE_FAIL,
  WISH_DESTROY,
  WISH_DESTROY_SUCCESS,
  WISH_DESTROY_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false
};

export default function wishes(state = initialState, action = {}) {
  switch (action.type) {
    case WISH_LOAD:
      return {
        ...state,
        loading: true
      };
    case WISH_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case WISH_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };

    case WISH_CREATE:
      return {
        ...state,
        creating: true
      };
    case WISH_CREATE_SUCCESS:
      let newData = [action.result].concat(state.data);
      return {
        ...state,
        creating: false,
        data: newData,
        error: null
      };
    case WISH_CREATE_FAIL:
      return {
        ...state,
        creating: false,
        error: action.error
      };

    case WISH_DESTROY:
      return {
        ...state,
        destroying : true
      };
    case WISH_DESTROY_SUCCESS:
      let data =  _.reject(state.data, '_id', action.result._id);
      return {
        ...state,
        destroying: false,
        data: data,
        error: null
      };
    case WISH_DESTROY_FAIL:
      return {
        ...state,
        destroying: false,
        error: action.error
      };

    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.wishes && globalState.wishes.loaded;
}
