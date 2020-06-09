import update from "immutability-helper";
import { 
  FETCH_LOGIN_TYPE, 
  FETCH_LOGIN_USERNAME 
} from "../constant";

const initialState = {
  name: "",
  type: -1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_USERNAME:
      return update(state, { name: { $set: action.payload } })
    
    case FETCH_LOGIN_TYPE:
      return update(state, { type: { $set: action.payload } })
  }

  return state;
};
