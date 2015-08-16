import {
  WISH_LOAD,
  WISH_LOAD_SUCCESS,
  WISH_LOAD_FAIL
} from './actionTypes';

export function load() {
  return {
    types: [WISH_LOAD, WISH_LOAD_SUCCESS, WISH_LOAD_FAIL],
    promise: (client) => client.get('/loadWishes')
  };
}
