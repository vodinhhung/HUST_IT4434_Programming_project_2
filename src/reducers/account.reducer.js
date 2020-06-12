import update from "immutability-helper";
import {
  FETCH_ACCOUNT_LIST
} from "../constant";

const initialState = {
  accounts: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_LIST:
      return update(state, { accounts: { $set: action.payload }})
  }

  return state;
}