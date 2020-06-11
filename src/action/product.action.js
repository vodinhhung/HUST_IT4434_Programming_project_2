import axios from 'axios';
import {
  FETCH_ALL_PRODUCT
} from "../constant";
import qs from 'querystring';

export const fetchAllProduct = value => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/getproductinfo`;

  let params = {};
  if (value.name != ""){
    params.name = value.name;
  }
  if (value.category != ""){
    params.category = value.category;
  }

  return axios
  .get(
    url,
    { params }
  )
  .then(res => {
    if (res.status === 200) {
      dispatch({
        type: FETCH_ALL_PRODUCT,
        payload: res.data,
      })
    }
  })
}