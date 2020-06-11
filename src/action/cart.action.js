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
      if (res.data.status === "Success" && res.data.username) {
        dispatch({
          type: FETCH_CART_DETAIL,
          payload: res.data,
        })
      }
      
      return res.data;
  });
};

export const addProductToCart = () => dispatch => {
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
        productId: 0,
        quantity: 1,
      }),
      options,
    ). then(res => {
      dispatch({
        type: "",
        payload: res.data,
      })
    })
}