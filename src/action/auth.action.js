import axios from "axios";
import { FETCH_LOGIN_INFO } from "../constant";
import qs from 'querystring';

export const checkLoginStatus = params => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/login`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  };

  return axios.post(
    url,
    qs.stringify({
      username: params.username,
      password: params.password,
    }),
    options
    )
    .then(res => {
      console.log(res, "res when send posi api");
      if (res.status === "Success" && res.username) {
        dispatch({
          type: FETCH_LOGIN_INFO,
          payload: res.username
        });
      }
  });
};
