import axios from 'axios';
import {
  FETCH_ACCOUNT_LIST
} from '../constant';

export const fetchAccountList = value => dispath => {
  let url = `https://hustshop.azurewebsites.net/rest/connect/getuserlist`;
  let params = {};

  if (value && value.s) {
    params.s = value.s
  } else {
    params.s = -1
  }

  if(value && value.u) {
    params.u = value.u
  }

  return axios
    .get(
      url, 
      { params }
    ).then(res => {
      if (res.data.status === "Success"){
        dispath({
          type: FETCH_ACCOUNT_LIST,
          payload: res.data.accounts,
        })
      }

      return res.data
    })
}