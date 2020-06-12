import { combineReducers } from 'redux';
import auth from './auth.reducer';
import user from './user.reducer';
import cart from './cart.reducer';
import product from './product.reducer';
import order from './order.reducer';
import account from './account.reducer';

export default combineReducers({
    auth,
    user,
    cart,
    product,
    order, 
    account,
})