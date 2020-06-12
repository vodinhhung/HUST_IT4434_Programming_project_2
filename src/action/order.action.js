import axios from 'axios';
import {
  FETCH_ORDER_LIST_ADMIN
} from '../constant';

export const feathOrderVerifyingAdmin = () => dispatch => {
  let url =`https://hustshop.azurewebsites.net/rest/connect/processingorderlist`;

  return axios
    .get(url)
    .then(res => {
      if (res.data.status === "Success") {
        dispatch({
          type: FETCH_ORDER_LIST_ADMIN,
          payload: res.data.orders,
        })
      }

      return res.data
    })
}