import update from "immutability-helper";
import {
  FETCH_ORDER_LIST
} from "../constant";

const initialState = {
  orders: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_LIST:
      return update(state, { orders: { $set: action.payload }})
  }

  return state;
}