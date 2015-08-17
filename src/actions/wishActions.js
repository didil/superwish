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
} from './actionTypes';

export function load() {
  return {
    types: [WISH_LOAD, WISH_LOAD_SUCCESS, WISH_LOAD_FAIL],
    promise: (client) => client.get('/loadWishes')
  };
}

export function create(name) {
  return {
    types: [WISH_CREATE, WISH_CREATE_SUCCESS, WISH_CREATE_FAIL],
    promise: (client) => client.post('/createWish', {
      data: {
        name: name
      }
    })
  };
}

export function destroy(_id) {
  return {
    types: [WISH_DESTROY, WISH_DESTROY_SUCCESS, WISH_DESTROY_FAIL],
    promise: (client) => client.del('/destroyWish', {
      data: {
        _id: _id
      }
    })
  };
}

