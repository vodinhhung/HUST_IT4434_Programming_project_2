import axios from 'axios';
import {
  FETCH_ORDER_LIST_USER,
} from '../constant';
import { notification } from 'antd';

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

      if (res.data.status === "Fail/unauthorized") {
        notification.open({
          message: "Load order list fail",
          description: "Please login to view order list",
        })
      }

      return res.data;
    })
}