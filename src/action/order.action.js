import axios from 'axios';
import {
  FETCH_ORDER_LIST_ADMIN
} from '../constant';
import { notification } from 'antd';

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

      if (res.data.status === "Fail/unauthorized") {
        notification.open({
          message: "Load verifying order fail",
          description: "Please login as admin to view processing order list",
        })
      }

      return res.data
    })
}