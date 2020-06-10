import axios from 'axios';
import {
  FETCH_ALL_PRODUCT
} from "../constant";

export const fetchAllProduct = () => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/getproductinfo`;

  return axios
  .get(url)
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: FETCH_ALL_PRODUCT,
        payload: res.data,
      })
    }
  })
}