import axios from 'axios';
import { FETCH_LOGIN_INFO } from '../constant';

export const checkLoginStatus = (params) => dispatch => {
    let url = `https://hustshop.azurewebsites.net/rest/connect/login`
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "cache-control": "no-cache",
            "postman-token": "7026073b-7f81-90a4-ad87-80ca9ed3e966",
            'Access-Control-Allow-Origin': '*',
        }
    };

    return axios
        .post(url, params, header)
        .then(res => {
            if (res.status === 'Success' && res.username) {
                dispatch({
                    type: FETCH_LOGIN_INFO,
                    payload: res.username,
                })
            }
        })
};