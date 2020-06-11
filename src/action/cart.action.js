import axios from "axios";
import {
  FETCH_CART_DETAIL
} from '../constant';
import qs from 'querystring';

export const fetchCartInfo = () => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/getcart`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  };

  return axios
    .get(
      url,
      options)
    .then(res => {
      if (res.data.status === "Success") {
        dispatch({
          type: FETCH_CART_DETAIL,
          payload: res.data,
        })
      }
      
      return res.data;
  });
};

export const addProductToCart = params => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/additem`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  };

  return axios
    .post(
      url,
      qs.stringify({
        productID: params.productID,
        quantity: params.quantity,
      }),
      options,
    ). then(res => {
      if (res.data.message === "Removed") {
        
      }
      dispatch({
        type: "",
        payload: res.data,
      })
      
      return res.data;
    })
}