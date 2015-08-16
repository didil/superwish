import {
  WISH_LOAD,
  WISH_LOAD_SUCCESS,
  WISH_LOAD_FAIL
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.wishes && globalState.wishes.loaded;
}
