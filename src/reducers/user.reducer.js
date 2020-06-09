import update from "immutability-helper";
import {
  FETCH_USER_INFO
} from '../constant';

const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_INFO:
      return update(state, { user: { $set: action.payload } })
  }

  return state
};