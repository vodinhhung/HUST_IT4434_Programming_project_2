import update from 'immutability-helper';
import {
  FETCH_ALL_PRODUCT
} from '../constant';

const initialState = {
  products: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PRODUCT:
      return update(state, { products: { $set: action.payload}})
  }

  return state;
}