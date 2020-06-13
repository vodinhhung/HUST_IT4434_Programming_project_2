import update from "immutability-helper";
import {
  FETCH_ORDER_LIST_USER
} from "../constant";


const initialState = {
  ordersuser: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_LIST_USER:
      return update(state, {ordersuser: { $set: action.payload }})
  }

  return state
}