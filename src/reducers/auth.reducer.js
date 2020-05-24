import update from 'immutability-helper';
import { FETCH_LOGIN_INFO } from '../constant';

const initialState = {
    name: "",
}

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_LOGIN_INFO:
            return update(state, { name: { $set: action.payload } } )
    }

    return state
}