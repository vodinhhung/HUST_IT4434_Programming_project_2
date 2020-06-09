import axios from "axios";
import { FETCH_USER_INFO } from "../constant";

export const fetchUserInfo = () => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/getuserinfo`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return axios
    .get(
      url,
      options
    )
    .then(res => {
      if (res.data.status === "Success" && res.data.username) {
        dispatch({
          type: FETCH_USER_INFO,
          payload: res.data.username
        });
      }

      return res.data;
    });
};

export const updateUserInfo = params => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/getuserinfo`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return axios
    .post(
      url,
      options
    )
    .then(res => {
      if (res.data.status === "Success" && res.data.username) {
        dispatch({
          type: FETCH_USER_INFO,
          payload: res.data.username
        });
      }

      return res.data;
    });
}