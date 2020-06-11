import axios from "axios";
import { 
  FETCH_USER_INFO,
  FETCH_LOGIN_USERNAME,
  FETCH_LOGIN_TYPE,
} from "../constant";
import qs from 'querystring';

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
      if (res.data.type === 0) {
        dispatch({
          type: FETCH_LOGIN_USERNAME,
          payload: res.data.username,
        })
        dispatch({
          type: FETCH_LOGIN_TYPE,
          payload: res.data.type,
        })
      }

      if (res.status === 200) {
        dispatch({
          type: FETCH_USER_INFO,
          payload: res.data
        });
      }

      return res.data;
    });
};

export const updateUserInfo = params => dispatch => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/updateuserinfo`;
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return axios
    .post(
      url,
      qs.stringify({
        name: params.name || "",
        gender: params.gender || "",
        date: params.birthday || "",
        address: params.address || "",
        district: params.district || "",
        province: params.province || "",
        city: params.city || "",
        country: params.country || "",
        telephone: params.telephone || "",
      }),
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