import update from "immutability-helper";
import {
  FETCH_CART_DETAIL
} from "../constant";

const initialState = {
  cart: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_DETAIL:
      return update(state, {cart: { $set: action.payload }})
  }

  return state;
};
