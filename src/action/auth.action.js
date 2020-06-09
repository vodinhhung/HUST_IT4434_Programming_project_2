import axios from "axios";
import { 
  FETCH_LOGIN_USERNAME,
  FETCH_LOGIN_TYPE
} from "../constant";
import qs from 'querystring';
import { notification } from 'antd';
import Router from 'next/router';

export const checkLoginStatus = params => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/login`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  };

  return axios
    .post(
      url,
      qs.stringify({
        username: params.username,
        password: params.password,
      }),
      options)
    .then(res => {
      if (res.data.status === "Success" && res.data.username) {
        dispatch({
          type: FETCH_LOGIN_USERNAME,
          payload: res.data.username,
        });
        dispatch({
          type: FETCH_LOGIN_TYPE,
          payload: res.data.type,
        })
        Router.push("/")

        // notification['success']
      }
      
      return res.data
  });
};

export const createNewCustomer = params => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/createaccount`;

  return axios
    .post(
      url,
      qs.stringify({
        username: params.username,
        password: params.password,
      }))
    .then(res => {
      if (res.data.status === "Success" && res.data.username) {
        dispatch({
          type: FETCH_LOGIN_USERNAME,
          payload: res.data.username,
        });
      }
    })
}