import axios from 'axios';
import {
  FETCH_ORDER_LIST_USER,
} from '../constant';

export const fetchOrderUser = () => dispatch => {
  let url =`https://hustshop.azurewebsites.net/rest/connect/orderlist`;

  return axios.get(url)
    .then(res => {
      if(res.data.status === "Success") {
        dispatch({
          type: FETCH_ORDER_LIST_USER,
          payload: res.data.order,
        })
      }

      return res.data;
    })
}